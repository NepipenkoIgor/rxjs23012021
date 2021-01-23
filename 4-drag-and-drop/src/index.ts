import '../../assets/css/style.css';
import './styles.css';
import { drag$ } from "./drag-and-drop";


drag$.subscribe((pos) => {
    console.log(pos);
})
