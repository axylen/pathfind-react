function findPath(step, params) {
  const { onStep = () => {}, onPath = () => {}, stepDelay = 50, pathDelay = 20 } = params;

  let lastTimeout;
  let canceled = false;
  let stepSize = 1;
  const makeStep = () => {
    if (canceled) return;

    const { value, done } = step.next(Math.min(stepSize, 24));

    if (done) {
      const path = value.reverse();

      const sendPath = () => {
        if (canceled || path.length === 0) return;

        onPath([path.pop()]);

        lastTimeout = setTimeout(sendPath, pathDelay);
      };

      return sendPath();
    }

    if (!value) return;

    onStep(value);

    stepSize = value.length;

    lastTimeout = setTimeout(makeStep, stepDelay);
  };

  makeStep();

  return () => {
    clearTimeout(lastTimeout);
    canceled = true;
  };
}

export default findPath;
