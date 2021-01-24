import { TestScheduler } from "rxjs/testing";
import { delay, map } from "rxjs/operators";
import { skipLimit } from "./skip-limit";

describe('Example test ', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('Skip limit should work', () => {
        testScheduler.run(({cold, expectObservable}) => {
            const sequence1$ = cold('-a--b----c----d---e-|', {
                a: 1, b: 2, c: 3, d: 10, e: 5
            })

            const resultSequenceMarble = '   ---------c----d-----|'

            expectObservable(
                sequence1$
                    .pipe(
                        skipLimit(2, 2)
                    )
            ).toBe(resultSequenceMarble, {c: 3, d: 10})

        })
    })
})
