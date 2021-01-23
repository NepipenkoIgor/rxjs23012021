import '../../assets/css/style.css';
import { interval, Observable, Subscriber } from "rxjs";

// const sequence = new Promise((res, rej) => {
//     let count = 1;
//     setInterval(() => {
//         res(count++);
//     }, 1000)
// })
//
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));

// const sequence = function* iterationFn() {
//     let item = 1;
//     while (true) {
//         yield item++;
//     }
// }();
//
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// let count = 1;
// // interval(1000)
// const sequence = new Observable((subscriber: Subscriber<number>) => {
//     const id = setInterval(() => {
//         if (count % 7 === 0) {
//             clearInterval(id);
//             subscriber.complete();
//             return;
//         }
//         subscriber.next(count++);
//     }, 1000)
// })
//
//
// setTimeout(() => {
//     sequence.subscribe((v) => {
//         console.log('Sub2 => ', v);
//     }, () => {
//     }, () => {
//         console.log('complete !!!')
//     })
// }, 3000)
//
// sequence.subscribe((v) => {
//     console.log('Sub1 => ', v);
// }, () => {
// }, () => {
//     console.log('complete !!!')
// })

const socket = new WebSocket('wss://echo.websocket.org');

const sequence = new Observable((subscriber) => {
    socket.addEventListener('message', (e) => {
        subscriber.next(e);
    })
})


socket.addEventListener('open', () => {
    let count = 0;
    setInterval(() => {
        socket.send((count++).toString())
    }, 2000);
})

sequence.subscribe(({data}: any) => {
    console.log('sub1 =>', data);
})

setTimeout(() => {
    sequence.subscribe(({data}: any) => {
        console.log('sub2 =>', data);
    })
}, 4000)


