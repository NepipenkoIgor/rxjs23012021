// import '../../assets/css/style.css';


// import { interval } from "rxjs";
// import { filter, map, skip, take, tap } from "rxjs/operators";
//
// const sequence1$ = interval(1000);
//
// /*
// sequence1$  ---0---1---2---3---4---
//
//       filter((x)=> x % 2 === 0)
//             ---0-------2-------4---
//       tap((x)=>{
//         console.log(x);
//         this.loader = true;
//         return 1;
//       }),
//             ---0-------2-------4---
//
//       map((x)=>x**2)
//             ---0-------4-------16---
//
//       skip(2)
//
//             -------------------16---
//
//       take(1)
//
// sequence1$  -------------------16|
//
//  */
//
// const sequence2$ = sequence1$.pipe(
//     filter((x)=> x % 2 === 0),
//     tap((x) => {
//         console.log('From console', x);
//         return 1;
//     }),
//     map((x) => x ** 2),
//     skip(2),
//     take(1)
// )

// sequence2$.subscribe((v) => {
//     console.log(v);
// })


import { interval, of, zip } from "rxjs";

const sequence1$ = of('h', 'e', 'l', 'l', 'o');
const sequence2$ = interval(2000);
/*
   sequence1$  (hello)|
   sequence2$  ---0---1---2---3---4---
      zip()
               ---([h,0])---([e,1])---.....([o,4])|
 */

zip(sequence1$, sequence2$)
    .subscribe(([l]) => {
        console.log(l);
    })
