import { hot } from "jasmine-marbles";
import { getX } from "./swipe";

function createTouch(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Swipe test ', () => {
    it('GetX should return right x', () => {
        const touch$ = hot('-a--b----c--|', {
            a: createTouch(10),
            b: createTouch(20),
            c: createTouch(1),
        })
        const sequence2$ = hot('-a--b----c--|', {a: 10, b: 20, c: 1})
        expect(getX(touch$)).toBeObservable(sequence2$)
    })
})
