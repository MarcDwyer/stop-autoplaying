export const debounce = (
  func: Function,
  dur: number,
): EventListenerOrEventListenerObject => {
  let timer: number | undefined;
  return function () {
    const ctx = this,
      args = arguments;

    clearTimeout(timer);

    //@ts-ignore
    timer = setTimeout(() => {
      func.apply(ctx, args);
    }, dur);
  };
};
