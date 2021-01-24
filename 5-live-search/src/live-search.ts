import { Observable } from "rxjs";
import {
    bufferCount,
    concatAll,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck, reduce,
    switchMap, tap
} from "rxjs/operators";
import { AjaxResponse } from "rxjs/ajax";

export interface IResult {
    name: string;
    description: string;
    owner: {
        avatar_url: string
    }
}

export function liveSearch(source1$: Observable<InputEvent>, reqCb: (text: string) => Observable<any>) {
    return source1$
        .pipe(
            debounceTime(300),
            pluck<InputEvent, string>('target', 'value'),
            map((text) => text.trim()),
            filter((text) => text.length > 3),
            distinctUntilChanged(),
            tap(() => {
                // show loader
            }),
            switchMap(reqCb)
        )
}


export function request(source$: Observable<AjaxResponse>): Observable<any> {
    return source$
        .pipe(
            pluck<AjaxResponse, IResult[]>('response', 'items'),
            concatAll(),
            map(createCard),
            bufferCount(3),
            reduce((resultStr: string, htmlStr: string[]) => {
                return `${resultStr}${createRow(htmlStr)}`
            }, ''),
            map((htmlStr: string) => htmlStr.trim().replace(/\s+(<)/g, '<')),
            tap(() => {
                // hide loader
            }),
        )
}


export function createCard({name, description, owner: {avatar_url}}: IResult): string {
    return `
    <div class="col-sm-6 col-md-4">
       <div class="card">
         <img class="card-img-top" src=${avatar_url} alt=${name}/>
         <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
         </div>
       </div>
    </div>
    `.trim();
}


export function createRow(htmlString: string[]) {
    return `<div class="row">${htmlString.join((' '))}</div>`
}
