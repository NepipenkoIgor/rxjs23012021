import 'bootstrap';
import '../../assets/css/style.css';
import './styles.css';
import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { liveSearch, request } from "./live-search";

const inputEl = document.querySelector('#search') as HTMLInputElement;
const containerEl = document.querySelector('.container') as HTMLDivElement;


liveSearch(
    fromEvent<InputEvent>(inputEl, 'input'),
    (text) => request(ajax(`https://api.github.com/search/repositories?q=${text}`))
).subscribe((htmlStr) => {
    containerEl.innerHTML = htmlStr;
})

