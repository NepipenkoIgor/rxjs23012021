import '../../assets/css/style.css';
import { defer, from, fromEvent, iif, of } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { map, pluck } from "rxjs/operators";


// const sequence = of(1, 2, 3, 4, 5);
// sequence.subscribe((v) => {
//     console.log(v);
// })

// const sequence = from([1, 2, 3, 4, 5]);
// const sequence = from(
//     fetch('http://learn.javascript.ru/courses/groups/api/participants?key=zniqe9').then((res) => res.json())
// );
// sequence.subscribe((v) => {
//     console.log(v);
// })

// const random = Math.round(Math.random() * 10)
// const sequence = iif(() => {
//     return random >= 5;
// }, of(`First sequence, number is ${random}`), of(`Second sequence, number is ${random}`))
//
// sequence.subscribe((v) => {
//     console.log(v);
// })


// const random = Math.round(Math.random() * 10)
// const sequence = defer(() => {
//     return random >= 5
//         ? random > 8
//             ? of(`First sequence, number is ${random}`)
//             : of(`Second sequence, number is ${random}`)
//         : of(`Third sequence, number is ${random}`)
// })
//
// sequence.subscribe((v) => {
//     console.log(v);
// })


// const sequence = ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=zniqe9`);
// sequence
//     .pipe(
//         pluck('response'),
//         //  map((v: AjaxResponse) => v.response)
//     )
//     .subscribe((v: any) => {
//         console.log(v);
//     })
// const input = document.querySelector('input') as HTMLInputElement;
// const sequence = fromEvent(input, 'input');
// sequence
//     .subscribe((v: any) => {
//         console.log(v);
//     })
