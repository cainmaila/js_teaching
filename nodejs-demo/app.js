var fs = require('fs')

var file = 'package.json'

/* 非同步寫法 */

// fs.readFile(file, 'utf8', fileRead)

// function fileRead(err, data) {
//     if (err) {
//         console.error(err)
//     } else {
//         console.log(data)
//         writeFile(data)
//     }
// }

// function writeFile(data) {
//     fs.writeFile('output.txt', data, 'utf8', fileOutput)
// }

// function fileOutput(err) {
//     if (err) {
//         console.error(err)
//     } else {
//         console.log('fileOutput end!!')
//     }
// }


/* 同步寫法 Sync */

// try {
//     var data = fs.readFileSync(file, 'utf8')
//     console.log(data)
//     fs.writeFileSync('outputSync.txt', data, 'utf8')
//     console.log('fileOutput end!!')
// } catch (err) {
//     console.error(err)
// }


/* 非同步概念 */
// console.log(123)
// for (var i = 0; i <= 10; i++) {
//     setTimeout(run, 1000)
//     console.log('end', i)
// }

// function run() {
//     console.log('run it !!')
// }

/* Promise */
// var delaySync = new Promise(delayRun)

// function delayRun(resolve, reject) {
//     setTimeout(function() {
//         resolve('resolve!! ooooooooo')
//             // reject('reject!! xxxxxxxxx')
//     }, 1000)
// }


// delaySync.then(callResolve, callReject)

// delaySync.then(callResolve).catch(callReject)

// function callResolve(data) {
//     console.log(data)
// }

// function callReject(err) {
//     console.error(err)
// }

/* Promise 寫法1 */

// new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         resolve('1')
//     }, 1000)
// }).then(function(data) {
//     console.log(data)
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             // resolve('2')
//             reject('some thing error!!')
//         }, 1000)
//     })
// }).then(function(data) {
//     console.log(data)
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve('3')
//         }, 1000)
//     })
// }).then(function(data) {
//     console.log(data)
// }).catch(function(err) {
//     console.error(err)
// })

/* es6 */

// let a = 1
// const NUM = 2

// let talk = message => {
//     console.log(message)
// }

// talk('some thing!!')



/* Promise 寫法2 */

// new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('1')
//         }, 1000)
//     }).then(data => {
//         console.log(data)
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve('2')
//             }, 1000)
//         })
//     }).then(data => {
//         console.log(data)
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve('3')
//             }, 1000)
//         })
//     }).then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.error(data)
//     })


/* Promise 寫法3 */

// function delayLog(message, time) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve(message)
//         }, time)
//     })
// }

// let delayLog = (message, time = 1000) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(message)
//         }, time)
//     })
// }

// delayLog(1)
//     .then(data => {
//         console.log(data)
//         return delayLog(2, 2000)
//     })
//     .then(data => {
//         console.log(data)
//         return delayLog(3, 500)
//     })
//     .then(console.log)
//     .catch(console.error)

/* Promise 封裝 */

function delayLogCommand(a, b, c) {
    let delayLog = (message, time = 1000) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(message)
            }, time)
        })
    }
    return new Promise((resolve, reject) => {
        delayLog(a)
            .then(data => {
                console.log(data)
                return delayLog(b, 2000)
            })
            .then(data => {
                console.log(data)
                return delayLog(c, 500)
            })
            .then(resolve)
            .catch(reject)
    })
}


// delayLogCommand(4, 5, 6).then(console.log, console.error)

module.exports = delayLogCommand
