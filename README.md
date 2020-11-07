[onMouseMove([element])](#on-mouse-move)
#### onMouseMove([element])
Requires :
- `element` _(Object)_ (default `window`)

Provides :
- `x` _(Number)_
- `y` _(Number)_
- `removeEvent` _(Function)_
  - **Returns** _(Boolean)_
- `addEvent` _(Function)_
  - **Returns** _(Boolean)_

Provides a set of **functions** and **properties** in order to use the `mousemove` event.
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
  return { ...useOnMouseMove(div) };
}
```