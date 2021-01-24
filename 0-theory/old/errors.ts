//import '../../assets/css/style.css';
import { EMPTY, interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(500);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7')

const sequence$ = zip(sequence1$, sequence2$);

// sequence$
//     .pipe(
//         map(([, y]) => {
//             return (y as any).toUpperCase();
//             // try {
//             //     return (y as any).toUpperCase();
//             // } catch (err) {
//             //     console.log(err);
//             //     return 'N'
//             // }
//         }),
//         // tap((v)=>{
//         //     console.log('TAP 1 Value',v)
//         // }),
//         //retry(3),
//         // retryWhen((errObs)=> errObs.pipe(delay(3000))),
//         catchError((err, obs) => {
//             console.log(err);
//             return EMPTY;
//         }),
//         // tap((v)=>{
//         //     console.log('TAP 2 Value',v)
//         // })
//     )
//     .subscribe((v) => {
//             console.log('Subscription value', v);
//         }, (err) => {
//             console.log('Error CB =>', err);
//         }, () => {
//             console.log('completed !!!')
//         }
//     )


sequence$
    .pipe(
        switchMap(([, y]) => {
            return of(y)
                .pipe(
                    map((y) => {
                        return (y as any).toUpperCase();
                    }),
                    catchError((err, obs) => {
                        console.log(err);
                        return EMPTY;
                    }),
                )
        })
    )
    .subscribe((v) => {
            console.log('Subscription value', v);
        }, (err) => {
            console.log('Error CB =>', err);
        }, () => {
            console.log('completed !!!')
        }
    )
