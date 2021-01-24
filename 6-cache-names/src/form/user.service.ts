import { ajax } from "rxjs/ajax";
import { concatAll, delay, pluck, shareReplay, switchMap, toArray } from "rxjs/operators";
import { Observable, timer } from "rxjs";


class UserService {
    public uniquerNameSequence$: Observable<string[]> = ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=zniqe9`)
        .pipe(
            delay(6000),
            pluck('response'),
            concatAll(),
            pluck<any, string>('profileName'),
            toArray(),
            shareReplay()
        )
    // public uniquerNameSequence$: Observable<string[]> = timer(0, 16000)
    //     .pipe(
    //         switchMap(() => {
    //             return ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=zniqe9`)
    //                 .pipe(
    //                     pluck('response'),
    //                     concatAll(),
    //                     pluck<any, string>('profileName'),
    //                     toArray(),
    //                 )
    //         }),
    //         shareReplay()
    //     )


}

export const userService = new UserService();
