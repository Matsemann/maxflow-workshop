import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {FlowNetwork} from "./network";
import {simpleBipartite} from "./networks/simpleBipartite";
import {UiState} from "./ui";
import {randomBipartite} from "./networks/randomBipartite";
import {longOne} from "./networks/longerOne";
import {evenLonger} from "./networks/evenLonger";


new UiState([
    simpleBipartite,
    randomBipartite,
    longOne,
    evenLonger
]);
