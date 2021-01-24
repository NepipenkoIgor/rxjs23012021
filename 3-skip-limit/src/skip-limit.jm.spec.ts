import { cold } from "jasmine-marbles";
import { skipLimit } from "./skip-limit";

describe('Example test ', () => {
    it('Skip limit should work (JM)', () => {
        const sequence1$ = cold('-a--b----c----d---e-|', {
            a: 1, b: 2, c: 3, d: 10, e: 5
        })
        const sequence2$ = cold('---------c----d-----|', {c: 3, d: 10})
        expect(sequence1$.pipe(skipLimit(2, 2))).toBeObservable(sequence2$)
    })
})
