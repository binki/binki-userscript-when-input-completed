function whenInputCompletedAsync(input, signal, maybeAutoCompleteDelta) {
  if (!input) throw new Error('input argument required.');
  const inputEventName = 'input';
  const abortEventName = 'abort';
  if (maybeAutoCompleteDelta !== undefined && (typeof maybeAutoCompleteDelta !== 'number' || (maybeAutoCompleteDelta|0) !== maybeAutoCompleteDelta || maybeAutoCompleteDelta <= 0)) throw new Error('maybeAutoCompleteDelta must be undefined or a positive integer.');
  const autoCompleteDelta = maybeAutoCompleteDelta === undefined ? 4 : maybeAutoCompleteDelta;
  return new Promise((resolve, reject) => {
    let lastLength = 0;
    const unsubscribe = () => {
      input.removeEventListener(inputEventName, inputHandler);
      if (signal) signal.removeEventListener(abortEventName, abortHandler);
    };
    const inputHandler = () => {
      if (input.value.length >= autoCompleteDelta && Math.abs(input.value.length - lastLength) >= autoCompleteDelta) {
        unsubscribe();
        resolve();
      } else {
        lastLength = input.value.length;
      }
    };
    const abortHandler = () => {
      unsubscribe();
      reject(signal.reason);
    };
    input.addEventListener(inputEventName, inputHandler);
    if (signal) signal.addEventListener(abortEventName, abortHandler);
    inputHandler();
  });
}
