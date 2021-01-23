import { fromEvent, merge, Observable, zip } from "rxjs";
import { filter, map } from "rxjs/operators";

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
            map((e: SwipeEvent) => {
                if (e instanceof TouchEvent) {
                    return e.changedTouches[0].clientX;
                }
                return e.clientX
            })
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
