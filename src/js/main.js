import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {FlowNetwork} from "./network";
import {bipartites} from "./networks/simpleBipartite";
import {UiState} from "./ui";
import {longerOnes} from "./networks/longerOnes";
import {twists} from "./networks/twists";


new UiState([
    ...bipartites,
    ...longerOnes,
    ...twists
]);
