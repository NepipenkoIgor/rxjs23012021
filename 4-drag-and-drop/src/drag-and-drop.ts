import { fromEvent, Observable } from "rxjs";
import { concatMap, map, takeUntil, tap } from "rxjs/operators";

export const box = document.querySelector('.draggable') as HTMLDivElement;
const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');


export const drag$ = dragAndDrop(mousedown$, mousemove$, mouseup$, (pos) => {
    box.style.left = `${pos.left}px`;
    box.style.top = `${pos.top}px`;
})

export function dragAndDrop(
    down$: Observable<MouseEvent>,
    move$: Observable<MouseEvent>,
    up$: Observable<MouseEvent>,
    sideCb: (pos: any) => void
) {
    return down$
        .pipe(
            concatMap((downEvent) => {
                return move$
                    .pipe(
                        map((moveEvent) => {
                            moveEvent.preventDefault();
                            return {
                                left: moveEvent.clientX - downEvent.offsetX,
                                top: moveEvent.clientY - downEvent.offsetY,
                            }
                        }),
                        tap(sideCb),
                        takeUntil(up$)
                    )
            })
        )
}
