import { defer, fromEvent, iif, merge, Observable, of, zip } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

type SwipeEvent = MouseEvent | TouchEvent;

const touchStart$ = getX(
    merge(
        fromEvent<MouseEvent>(document, 'mousedown'),
        fromEvent<MouseEvent>(document, 'touchstart')
    ));
const touchEnd$ = getX(
    merge(
        fromEvent<MouseEvent>(document, 'mouseup'),
        fromEvent<MouseEvent>(document, 'touchend')
    ));


export function getX(source$: Observable<SwipeEvent>) {
    return source$
        .pipe(
            switchMap((event: SwipeEvent) => {
                return defer(
                    () => {
                        if (event instanceof TouchEvent) {
                            return of((event as TouchEvent).changedTouches[0].clientX);

                        }
                        return of((event as MouseEvent).clientX);
                    }
                )
            })
            // map((e: SwipeEvent) => {
            //     if (e instanceof TouchEvent) {
            //         return e.changedTouches[0].clientX;
            //     }
            //     return e.clientX
            // })
        )
}

export function swipe(source1$: Observable<number>, source2$: Observable<number>) {
    return zip(source1$, source2$)
        .pipe(
            map(([startX, endX]: [number, number]) => {
                return startX - endX;
            }),
            filter((value) => {
                return value !== 0
            })
        )
}

export const swipe$ = swipe(touchStart$, touchEnd$);
