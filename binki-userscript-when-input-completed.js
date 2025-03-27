function whenInputCompletedAsync(input, signal, maybeAutoCompleteDelta) {
  const inputEventName = 'input';
  const abortEventName = 'abort';
  const autoCompleteDelta = maybeAutoCompleteDelta || 4;
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
