import { isRef, ref, onMounted, onBeforeUnmount, onBeforeMount } from 'vue';

const useOnMouseMove = (element = ref(window)) => {
    const _element = isRef(element) ? element : ref(element);
    const x = ref(0);
    const y = ref(0);

    let _hasEvent = false;

    const _onMouseMove = event => {
        x.value = event?.clientX || _element.value?.event?.clientX || 0;
        y.value = event?.clientY || _element.value?.event?.clientY || 0;
    };

    const removeEvent = () => {
        if (!_hasEvent) return false;

        _element.value.removeEventListener('mousemove', _onMouseMove);
        return !(_hasEvent = false);
    };

    const addEvent = () => {
        if (_hasEvent) return false;

        _element.value.addEventListener('mousemove', _onMouseMove);
        return (_hasEvent = true);
    };

    onBeforeMount(() => {
        _onMouseMove();
    });

    onMounted(() => {
        addEvent();
    });

    onBeforeUnmount(() => {
        removeEvent();
    });
    return { x, y, removeEvent, addEvent };
};

export { useOnMouseMove };
