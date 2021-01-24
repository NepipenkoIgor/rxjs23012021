
// Observable + Observer = Subject

import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// const sequence$$ = new BehaviorSubject(0);
//
// sequence$$.next(1);
// sequence$$.next(2);
// sequence$$.next(3);
//
// setTimeout(() => {
//     sequence$$.subscribe((v) => {
//         console.log('SUB1', v);
//     })
//     sequence$$.next(4);
//     sequence$$.next(5);
// }, 3000)
//
// setTimeout(() => {
//     sequence$$.subscribe((v) => {
//         console.log('SUB2', v);
//         console.log('SUB2', sequence$$.value);
//     })
// }, 6000)


// const sequence$$ = new ReplaySubject<number>();
//
// sequence$$.next(1);
// sequence$$.next(2);
// sequence$$.next(3);
//
// setTimeout(() => {
//     sequence$$
//         .pipe(filter((v: number) => v % 2 === 0))
//         .subscribe((v) => {
//             console.log('SUB1', v);
//         })
//     sequence$$.next(4);
//     sequence$$.next(5);
// }, 3000)
//
// setTimeout(() => {
//     sequence$$.subscribe((v) => {
//         console.log('SUB2', v);
//     })
// }, 6000)

// const sequence$$ = new AsyncSubject();
//
// sequence$$.next(1);
// sequence$$.next(2);
// sequence$$.next(3);
//
// setTimeout(() => {
//     sequence$$
//         .subscribe((v) => {
//             console.log('SUB1', v);
//         })
//     sequence$$.next(4);
//     sequence$$.next(5);
//     sequence$$.complete();
// }, 3000)
//
// setTimeout(() => {
//     sequence$$.subscribe((v) => {
//         console.log('SUB2', v);
//     })
// }, 6000)


function getUsers(url: string) {
    let subject: AsyncSubject<any>;
    return new Observable((subscriber) => {
        if (!subject) {
            subject = new AsyncSubject<any>();
            ajax(url).subscribe(subject)
        }
        return subject.subscribe(subscriber)
    })
}

const users = getUsers('http://learn.javascript.ru/courses/groups/api/participants?key=zniqe9')
users.subscribe((users) => {
    console.log(users);
})

setTimeout(() => {
    users.subscribe((users) => {
        console.log(users);
    })
}, 5000)
