import { isRef, ref, onMounted, onBeforeUnmount } from 'vue';

const MOUSE_MOVE_EVENT = 'mousemove';
const TOUCH_MOVE_EVENT = 'touchmove';

const DEFAULT_OPTIONS = {
    element: ref(window),
    touch: false,
    relative: false,
};

const DEFAULT_RELATIVE = {
    left: 0,
    top: 0,
};

const relativeHelper = (element, relative) =>
    !relative || !element.getBoundingClientRect
        ? DEFAULT_RELATIVE
        : element.getBoundingClientRect();

const EVENTS_HANDLERS = {
    [MOUSE_MOVE_EVENT]: (event, x, y, relative) => {
        const { left, top } = relativeHelper(event.currentTarget, relative);

        x.value = event?.clientX - left || 0;
        y.value = event?.clientY - top || 0;
    },
    [TOUCH_MOVE_EVENT]: (event, x, y, relative) => {
        const { left, top } = relativeHelper(event.currentTarget, relative);
        const finger = event.changedTouches[0];

        x.value = finger?.clientX - left || 0;
        y.value = finger?.clientY - top || 0;
    },
};

export const useOnMouseMove = options => {
    options = { ...DEFAULT_OPTIONS, ...(options || {}) };

    const _element = isRef(options.element)
        ? options.element
        : ref(options.element);

    const _events = [
        MOUSE_MOVE_EVENT,
        ...(options.touch ? [TOUCH_MOVE_EVENT] : []),
    ];

    const _eventsHandlers = {};

    for (const event of _events)
        _eventsHandlers[event] = e =>
            EVENTS_HANDLERS[event](e, x, y, options.relative);

    let _hasEvent = false;

    const x = ref(0);
    const y = ref(0);

    const removeEvent = () => {
        if (!_hasEvent) return false;

        for (const event in _eventsHandlers)
            _element.value.removeEventListener(event, _eventsHandlers[event]);

        return !(_hasEvent = false);
    };

    const addEvent = () => {
        if (_hasEvent) return false;

        for (const event in _eventsHandlers)
            _element.value.addEventListener(event, _eventsHandlers[event], {
                passive: true,
            });

        return (_hasEvent = true);
    };

    onMounted(() => {
        addEvent();
    });

    onBeforeUnmount(() => {
        removeEvent();
    });

    return {
        x,
        y,
        removeEvent,
        addEvent,
    };
};
