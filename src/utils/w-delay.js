export const wDelay = async (delay, funk, ...funkArgs) => {
  await timeout(delay);

  funk(...funkArgs);
}

export const wTimeoutStop = (timeoutId, funk, ...funkArgs) => {
  clearTimeout(timeoutId);
  funk(...funkArgs);
}

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const timeoutWToken = (ms, cancellationToken) => {
  return new Promise((resolve, reject) => {
    cancellationToken.cancel = () => {
      reject();
    };
    setTimeout(resolve, ms);
  })
}

