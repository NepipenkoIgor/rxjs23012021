import { TestScheduler } from "rxjs/testing";
import { delay, map } from "rxjs/operators";

describe('Example test ', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('Pipe with delay and map', () => {
        testScheduler.run(({cold, expectObservable}) => {
            const sequence1$ = cold('---a--b--c---|', {
                a: 2, b: 2, c: 10
            })

            const resultSequenceMarble = ' 9s ---e--r--d---|'

            expectObservable(
                sequence1$
                    .pipe(
                        delay(9000),
                        map((x) => x ** 2)
                    )
            ).toBe(resultSequenceMarble, {e: 4, r: 4, d: 100})

        })
    })
})
