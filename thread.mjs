/**
 * @author Jefferson Alves Reis (jefaokpta) < jefaokpta@hotmail.com >
 * Date: 11/22/24
 */

import {
    parentPort,
    threadId
} from 'node:worker_threads';

parentPort.once('message', (message) => {
    console.time(`bench ${threadId}`);
    let count = 0;
    for (let i = message.from; i < message.to; i++){
        count ++;
    }
    console.timeEnd(`bench ${threadId}`);
    parentPort.postMessage(`Thread ${threadId} finalizou com: ${count}`);
})