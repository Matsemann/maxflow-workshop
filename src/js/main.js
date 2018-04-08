import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {Renderer} from "./renderer";
import {FlowNetwork} from "./network";
import {calculateMaxFlow, finishAlgorithm} from "./maxflow";
import {testSuite} from "./unittests";
import {simpleBipartite} from "./networks/simpleBipartite";
import {UiState} from "./ui";
import {randomBipartite} from "./networks/randomBipartite";

testSuite();


new UiState([
    simpleBipartite,
    randomBipartite
]);

function net1() {
    const net = new FlowNetwork();

    net.createNode("1");
    net.createNode("b");
    net.createNode("3");
    net.createNode("4");
    net.createNode("5");
    net.createNode("6");

    net.createEdge("source", "1", 3);
    net.createEdge("source", "b", 4);
    net.createEdge("source", "3", 1);
    net.createEdge("source", "6", 1);
    net.createEdge("1", "4", 6);
    net.createEdge("1", "5", 6);
    net.createEdge("b", "3", 9);
    net.createEdge("3", "5", 9);
    net.createEdge("3", "6", 9);
    net.createEdge("4", "6", 9);
    net.createEdge("5", "sink", 9);
    net.createEdge("6", "sink", 9);

    return net;
}

function net2() {
    const net = new FlowNetwork();

    net.createNode("1", 1);
    net.createNode("2", 1);
    net.createNode("3", 2);
    net.createNode("4", 2);
    net.getNode("sink").level = 3;

    net.createEdge("source", "1", 16);
    net.createEdge("source", "2", 13);
    net.createEdge("1", "3", 12);
    net.createEdge("2", "1", 4);
    net.createEdge("2", "4", 14);
    net.createEdge("3", "2", 9);
    net.createEdge("3", "sink", 20);
    net.createEdge("4", "3", 7);
    net.createEdge("4", "sink", 4);


    return net;
}

function net3() {
    const net = new FlowNetwork();

    net.createNode("1");
    net.createNode("2");
    net.createNode("3");
    net.createNode("4");

    net.createEdge("source", "1", 10);
    net.createEdge("source", "2", 10);
    net.createEdge("1", "2", 2);
    net.createEdge("1", "3", 4);
    net.createEdge("1", "4", 8);
    net.createEdge("2", "4", 9);
    net.createEdge("3", "sink", 10);
    net.createEdge("4", "3", 6);
    net.createEdge("4", "sink", 10);

    return net;
}
