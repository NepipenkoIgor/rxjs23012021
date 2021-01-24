

import { asapScheduler, async, asyncScheduler, combineLatest, from, interval, of, queueScheduler, Subject } from "rxjs";
import { map, observeOn, subscribeOn, take, tap } from "rxjs/operators";

//
// console.log('start');
// setTimeout(() => console.log('time1'));
// setTimeout(() => console.log('time2'));
// Promise.resolve().then(() => console.log('promise1'));
// Promise.resolve().then(() => console.log('promise12'));
// console.log('end');

/*
   Macro --------- Macro -------- Macro------
   start           time1          time2
   end

   promise1
   promise12
 */

// asap - microtask
// async - macrotask
// animation - animationFrame
// queue - iteration (sync)

// console.log('start');
// of(1, 2, 3, 4, 5, async )
//     .subscribe((v) => {
//         console.log(v);
//     })
// console.log('end');


// const a$ = from([1, 2], async );
// const b$ = of(10);
//
// const c$ = combineLatest([a$, b$])
//     .pipe(
//         map(([a, b]) => a + b)
//     )
//
//
// c$.subscribe((v) => {
//     console.log(v);
// })


// console.log('start');
// of(1, 2, 3)
//     .pipe(
//         tap((v) => {
//             console.log('Tap 1', v);
//         }),
//         // observeOn(asyncScheduler),
//         tap((v) => {
//             console.log('Tap 2', v);
//         }),
//         subscribeOn(asyncScheduler),
//     )
//     .subscribe((v) => {
//         console.log('sub', v)
//     })
//
// console.log('end');


const signal = new Subject<number>();
let count = 0;
const someCalc = (count: number) => console.log('do some calc', count);

console.log('start');
signal.pipe(
    observeOn(queueScheduler),
    take(5000))
    .subscribe((v: number) => {
        someCalc(v)
        signal.next(v)
    });
signal.next(count++)
console.log('end');
