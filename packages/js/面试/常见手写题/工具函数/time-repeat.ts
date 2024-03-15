/*
* @param
*/
function repeat1(times: number, interval: number, callback: (a: any[]) => void) {
  return function inner(...args: any[]) {
    for (let i = 1; i <= times; i++) {
      setTimeout(() => {
        callback(args);
      }, i * interval)
    }
  }
}

// const loog = repeat1(2, 1000, console.log);

function repeat2(times: number, interval: number, callback: (a: any[]) => void) {
  return function inner(...args: any[]) {
    let cnt = times;
    const timer = setInterval(() => {
      if (cnt <= 0) {
        clearInterval(timer);
        return;
      }
      callback(args);
      cnt--;
    }, interval);
  }
}

// const loog2 = repeat2(2, 1000, console.log);
// loog2('hello')

function repeat3(times: number, interval: number, callback: (a: any[]) => void) {
  return function inner(...args: any[]) {
    return new Promise((resolve, reject) => {
      let cnt = times;
      const execute = () => {
        if (cnt <= 0) {
          resolve(1);
        } else {
          try {
            cnt--;
            callback(args);
            setTimeout(execute, interval);
          } catch (err) {
            reject(err)
          }
        }
      }
    })
  }
}

function repeat4(times: number, interval: number, callback: (...args: any[]) => void) {
  return async function inner(...args: any[]) {
    for (let i = 0; i < times; i++) {
      await new Promise((resolve, reject) => {
        try {
          callback(args);
          resolve(1);
        } catch (err) {
          reject(err);
        }
      })
    }
  }
}

function repeat5(times: number, interval: number, callback: (...args: any[]) => void) {
  return function inner(...args: any[]) {
    function execute(cnt: number) {
      if (cnt > 0) {
        setTimeout(() => {
          callback(...args);
          execute(cnt - 1)
        }, interval)
      }
    }
    execute(times);
  }
}

const loog5 = repeat5(2, 1000, console.log);
loog5('lalala')