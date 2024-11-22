import {parentPort, threadId} from "node:worker_threads";
import {execSync} from "node:child_process";


parentPort.on('message', (message) => {
    console.log(`SLOW ${threadId} recebeu ${message}`);
    console.time(`slow ${threadId}`);
    execSync('sh slow.sh', {stdio: 'inherit'});
    console.timeEnd(`slow ${threadId}`);
    parentPort.postMessage(`SLOW ${message} finalizou`);
})