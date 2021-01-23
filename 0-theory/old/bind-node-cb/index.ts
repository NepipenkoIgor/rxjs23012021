// import '../../assets/css/style.css';
import fs from 'fs';
import { bindNodeCallback } from "rxjs";
import { map } from "rxjs/operators";

const readFile = bindNodeCallback(fs.readFile);
const fileDataSequence$ = readFile(`${__dirname}/text`);

fileDataSequence$
    .pipe(
        map((buffer) => {
            const str = buffer.toString();
            const regExp = />([^<]+)</;
            const matches = regExp.exec(str);
            return matches && matches[1];
        })
    )
    .subscribe((v) => {
        console.log(v);
    })
