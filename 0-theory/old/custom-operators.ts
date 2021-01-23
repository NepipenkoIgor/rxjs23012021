// import '../../assets/css/style.css';


import { interval, Observable, pipe, Subscriber, TeardownLogic } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

/*
function doNothing(source: Observable<any>) {
    return source;
}

function toText(source: Observable<any>) {
    return new Observable((subscriber) => {
        subscriber.next('Rx JS');
        subscriber.complete();
    })
}

function double(source: Observable<any>) {
    return new Observable(subscriber => {
        source.subscribe((value) => {
            subscriber.next(value * 2)
        }, (error) => {
            subscriber.error(error)
        }, () => {
            subscriber.complete();
        })
    })
}
*/


// const o$ = new Observable();
// o$.source = interval(2000);
// o$.operator = {
//     call(subscriber: Subscriber<unknown>, source: any): TeardownLogic {
//         source.subscribe(subscriber)
//     }
// }
//
// o$.subscribe((v) => {
//     console.log(v);
// })

class DoubleSubscriber extends Subscriber<number> {
    next(value: number) {
        super.next(value * 2);
    }
}

// function double(source: Observable<any>) {
//     const o$ = new Observable();
//     o$.source = source;
//     o$.operator = {
//         call(subscriber: Subscriber<unknown>, source: any): TeardownLogic {
//             source.subscribe(new DoubleSubscriber(subscriber))
//         }
//     }
//     return o$
// }

const double = (source$: Observable<number>) =>
    source$.lift({
        call(subscriber: Subscriber<number>, source: any): TeardownLogic {
            source.subscribe(new DoubleSubscriber(subscriber))
        }
    })


// interval(1000)
//     .pipe(take(5), double)
//     .subscribe((v) => {
//         console.log(v);
//     }, () => {
//     }, () => {
//         console.log('complete !!!')
//     })

// const pipe = (...fns: Function[]) => {
//     return (source: Observable<any>) => {
//         return fns.reduce((acc, fn) => {
//             return fn(acc)
//         }, source)
//     }
// }

const doubleWithFilter = pipe(
    double,
    filter((v: number) => v % 3 === 0)
)


interval(1000)
    .pipe(doubleWithFilter)
    .subscribe((v) => {
        console.log(v);
    }, () => {
    }, () => {
        console.log('complete !!!')
    })
