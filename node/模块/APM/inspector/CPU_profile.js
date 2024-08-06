const inspector = require('node:inspector');
const fs = require('node:fs');
const session = new inspector.Session();
session.connect();

function b() {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
        sum += i;
    }
}

function a() {
    for (let i = 0; i < 10000; i++) {
        b();
    }
}

session.post('Profiler.enable', () => {
    session.post('Profiler.start', () => {
        a();
        session.post('Profiler.stop', (err, {profile}) => {
            if (!err) {
                fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
            }
        });
    });
});
