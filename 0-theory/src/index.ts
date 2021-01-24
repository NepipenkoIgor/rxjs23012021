//import '../../assets/css/style.css';
import { BehaviorSubject, ConnectableObservable, interval, Subject, Subscription } from "rxjs";
import { multicast, publish, refCount, share } from "rxjs/operators";

// const controlSequence$$ = new BehaviorSubject(-1);

const sequence$ = interval(1000)
    .pipe(
        share()
        // multicast + subject = publish
        // multicast + subject + refCount = publish + refCount = share
    );

let sub: Subscription;
sub = sequence$.subscribe((v) => {
    console.log('SUB 1', v)
})
// setTimeout(() => {
//     sub = sequence$.subscribe((v) => {
//         console.log('SUB 1', v)
//     })
// }, 5000)
//
// setTimeout(() => {
//     sub.unsubscribe();
// }, 7000)

setTimeout(() => {
    sequence$.subscribe((v) => {
        console.log('SUB 2', v)
    })
}, 10000)
