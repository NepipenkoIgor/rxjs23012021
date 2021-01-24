import 'bootstrap';
import '../../assets/css/style.css';
import { FormComponent } from "./form";


const form1 = document.querySelector('.first-form') as HTMLFormElement;
const form2 = document.querySelector('.second-form') as HTMLFormElement;
const form3 = document.querySelector('.third-form') as HTMLFormElement;

form2.hidden = true;
form3.hidden = true;
new FormComponent(form1);

setTimeout(() => {
    form2.hidden = false;
    new FormComponent(form2);
}, 5000)
setTimeout(() => {
    form3.hidden = false;
    new FormComponent(form3);
}, 20000)
