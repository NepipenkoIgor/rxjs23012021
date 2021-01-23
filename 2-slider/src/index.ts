import 'bootstrap';
import 'bootstrap-slider';
import '../../assets/css/style.css';
import './styles.css';
import { sliderResultSequence$ } from "./slider";
import { terminalLog } from "../../utils/log-in-terminal";

sliderResultSequence$
    .subscribe((result) => {
       terminalLog(`Result is ${result}`)
    })
