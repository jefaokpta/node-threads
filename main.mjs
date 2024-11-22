/**
 * @author Jefferson Alves Reis (jefaokpta) < jefaokpta@hotmail.com >
 * Date: 11/22/24
 */
import {execSync} from 'node:child_process';
import {Worker} from 'node:worker_threads';

function getCurrentThreadCount() { // nao ta contando certo
    return execSync(`ps -o nlwp ${process.pid}`).toString()
}

console.log(`Current thread count ${process.pid}:`, getCurrentThreadCount());

function createThread(data) {
    const worker = new Worker('./thread.mjs');

    const promise = new Promise((resolve, reject) => {
        worker.once('message', (message) => {
            return resolve(message);
        });
    });

    worker.postMessage(data);
    return promise;

}

const interval = setInterval(() => {
    console.log('roda a cada 2s', new Date().toLocaleTimeString());
    console.log(`Current thread count ${process.pid}:`, getCurrentThreadCount());
}, 2000);

await Promise.all([
    createThread({from: 0, to: 1e10}),
    createThread({from: 0, to: 1e10}),
    createThread({from: 0, to: 1e10}),
    createThread({from: 0, to: 1e10}),
    // createThread({from: 0, to: 1e20}),
]);

clearInterval(interval);

