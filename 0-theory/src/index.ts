import '../../assets/css/style.css';
import { fromEvent } from "rxjs";
import { concatMap, exhaustMap, mergeMap, pluck, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";


// import { interval, of } from "rxjs";
// import { map, mergeAll, mergeMap } from "rxjs/operators";
//
// const sequence$ = interval(1000)
//     .pipe(
//         mergeMap((v) => {
//             return of(v * 2)
//         }),
//         // map + mergeAll = mergeMap
//     )
//
// sequence$.subscribe((v) => {
//     console.log(v);
// })

const inputEl = document.querySelector('input') as HTMLInputElement;

const sequence$ = fromEvent(inputEl, 'input')
    .pipe(
        pluck('target', 'value'),
        exhaustMap((value) => {
            return ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=zniqe9&value=${value}`)
        }),
        // map + mergeAll = mergeMap
        // map + concatAll = concatMap
        // map + switchAll = switchMap,
        // map + exhaust = exhaustMap
        pluck('response')
    )


sequence$.subscribe((v) => {
    console.log(v);
})
