[onMouseMove([element])](#on-mouse-move)
#### onMouseMove([options])
Requires :
- `options` _(Object)_
  - `element` _(Object)_ (default `window`)
    Event target
  - `touch` _(Boolean)_ (default `false`)
    Enables touch event
  - `relative` _(Boolean)_ (default `false`)
    Computes provided coordinates relative to the event target

Provides :
- `x` _(Number)_
- `y` _(Number)_
- `removeEvent` _(Function)_
  - **Returns** _(Boolean)_
- `addEvent` _(Function)_
  - **Returns** _(Boolean)_

Provides a set of **functions** and **properties** in order to use the `mousemove` event.
> If touch event is activated, the first touch point (finger) will be choosed
##### Example 1
```js
setup() {
  const { x: mouseX, y: mouseY } = useOnMouseMove();
  return { mouseX, mouseY };
```
##### Example 2
```js
setup() {
  const div = ref(null);
  return { ...useOnMouseMove({ element: div, touch: true }) };
}
```