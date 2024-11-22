/**
 * @author Jefferson Alves Reis (jefaokpta) < jefaokpta@hotmail.com >
 * Date: 11/22/24
 */

import {Worker} from 'node:worker_threads';

const interval = setInterval(() => {
    console.log('THREAD main roda a QUEUE cada 1s', new Date().toLocaleTimeString());
    processQueue();
}, 1000);

const taskQueue = [];
let isProcessing = false;
const worker = new Worker('./slow-worker.mjs');

function runSlow(number) {
    return new Promise((resolve, reject) => {
        taskQueue.push({number, resolve, reject})
    });
}

function processQueue() {
    if (isProcessing || taskQueue.length === 0) {
        return;
    }

    isProcessing = true;
    const {number, resolve, reject} = taskQueue.shift();

    worker.postMessage(number);

    worker.once('message', (message) => {
        console.log(`THREAD main recebeu: ${message}`);
        resolve(message);
        isProcessing = false;
    });

    worker.once('error', (error) => {
        console.error(error);
        reject(error);
        isProcessing = false;
    });
}


await Promise.all([
    runSlow(1),
    runSlow(2),
    runSlow(3),
    runSlow(4),
    runSlow(5),
    runSlow(6),
    runSlow(7),
    runSlow(8),
]);

clearInterval(interval);
worker.terminate();