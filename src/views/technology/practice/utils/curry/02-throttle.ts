declare type FNThrottle = (...args: Array<any>) => void;
export function throttle(fn: FNThrottle, interval = 100) {
  let open = true;
  return (...args: Array<any>) => {
    if (!open) {
      return;
    }
    open = false;

    fn(...args);
    const ts = new Date().getTime();
    const mode = ts % interval;
    setTimeout(() => {
      open = true;
    }, interval - mode);
  };
}

let counter = 0;
const onMouseMove = throttle(() => {
  console.log("move", counter);
});
const I = setInterval(() => {
  if (counter++ === 1000) {
    clearTimeout(I);
  }
  onMouseMove();
}, 1);
