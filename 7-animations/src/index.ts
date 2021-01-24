import '../../assets/css/style.css';
import './styles.css';
import { animationDown } from "./animate";
import { terminalLog } from "../../utils/log-in-terminal";


const shape = document.querySelector('div.animated-shape') as HTMLElement;
animationDown(shape)
    .subscribe((height) => {
        terminalLog(`Position is ${height} px`)
    }, () => {
    }, () => {
        terminalLog('Animation completed !!!')
    })
