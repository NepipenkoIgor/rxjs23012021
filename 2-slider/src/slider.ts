import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, pluck, startWith, tap, withLatestFrom } from "rxjs/operators";

interface InitialSliderValue {
    value: number;
    element: HTMLElement
}

const qualitySlider = $('#quality').slider();
const ratingSlider = $('#rating').slider();
const actualSlider = $('#actual').slider();


export const quality$ = getValue(fromEvent(qualitySlider, 'change'), {
    element: qualitySlider.parent().children(':first-child')[0],
    value: 5
}, redrawSlider);
export const rating$ = getValue(fromEvent(ratingSlider, 'change'), {
    element: ratingSlider.parent().children(':first-child')[0],
    value: 5
}, redrawSlider);
export const actual$ = getValue(fromEvent(actualSlider, 'change'), {
    element: actualSlider.parent().children(':first-child')[0],
    value: 5
}, redrawSlider)

export function getValue(
    source$: Observable<any>,
    initialValue: InitialSliderValue,
    sideCb: (arg: InitialSliderValue) => void) {
    return source$
        .pipe(
            map(({delegateTarget: {previousElementSibling}, value: {newValue}}: any) => {
                return {
                    value: newValue,
                    element: previousElementSibling
                }
            }),
            startWith(initialValue),
            tap(sideCb),
            pluck('value')
        )
}

const resultButton = document.querySelector('#send-result') as HTMLButtonElement
export const sliderResultSequence$ = fromEvent<MouseEvent>(resultButton, 'click')
    .pipe(
        withLatestFrom(sliderSequence(quality$, rating$, actual$)),
        pluck(1)
    )

export function sliderSequence(...sources: Observable<any>[]) {
    return combineLatest(sources)
        .pipe(
            map((slidersValues) => {
                let total = 0;
                for (let item of slidersValues) {
                    total += item;
                }

                return Math.round(total / slidersValues.length * 10)
            })
        )
}


function redrawSlider({element, value}: InitialSliderValue): void {
    const sliderTrack = element.querySelector('.slider-track');
    const v = value * 10;
    sliderTrack?.classList.remove('bad', 'good', 'warn');
    if (v < 40) {
        sliderTrack?.classList.add('bad');
        return;
    }
    if (v >= 40 && v <= 70) {
        sliderTrack?.classList.add('warn');
        return;
    }
    sliderTrack?.classList.add('good');
}
