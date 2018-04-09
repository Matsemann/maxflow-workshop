import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {bipartites} from "./networks/simpleBipartite";
import {UiState} from "./ui";
import {longerOnes} from "./networks/longerOnes";
import {twists} from "./networks/twists";
import {baseball} from "./networks/baseball";


new UiState([
    ...bipartites,
    ...longerOnes,
    ...twists,
    ...baseball
]);
