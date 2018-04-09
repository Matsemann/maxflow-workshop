import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {bipartites} from "./networks/bipartite";
import {UiState} from "./ui";
import {longerOnes} from "./networks/longerOnes";
import {twists} from "./networks/twists";
import {baseball} from "./networks/baseball";
import {movieplanning} from "./networks/movieplanning";


new UiState([
    ...bipartites,
    ...longerOnes,
    ...twists,
    ...baseball,
    ...movieplanning
]);
