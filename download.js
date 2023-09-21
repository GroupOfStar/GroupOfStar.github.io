
import https from 'node:https';

console.log('start')

https.get('https://raw.githubusercontent.com/GroupOfStar/mini-compiler/master/README.md', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
    console.error(e);
});
