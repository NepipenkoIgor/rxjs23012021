import { Observable, Subscriber, TeardownLogic } from "rxjs";


class SkipLimitSubscriber<T> extends Subscriber<T> {

    private interval = 1;
    private count = 1;

    public constructor(subscriber: Subscriber<T>,
                       private skip: number, private limit: number) {
        super(subscriber);
    }

    public next(value: T) {
        const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
        const borderRight = borderLeft + this.limit;
        if (borderLeft < this.count && this.count <= borderRight) {
            super.next(value);
            this.count++;
            if (borderRight < this.count) {
                this.interval++;
            }
            return;
        }
        this.count++;
    }
}

export function skipLimit(skip: number, limit: number) {
    return <T>(source: Observable<T>) => {
        return source.lift({
            call(subscriber: Subscriber<T>): TeardownLogic {
                return source.subscribe(new SkipLimitSubscriber<T>(subscriber, skip, limit))
            }
        })
    }
}
