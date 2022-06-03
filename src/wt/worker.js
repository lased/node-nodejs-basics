import { parentPort, workerData } from "worker_threads";

// n should be received from main thread
export const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (number) => {
  const result = nthFibonacci(number);

  if (workerData === 11) throw new Error('Oops, i am an error in 2 thread)))');

  return result;
};

parentPort.postMessage(sendResult(workerData));
