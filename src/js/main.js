import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {Renderer} from "./renderer";
import {FlowNetwork} from "./network";
import {calculateMaxFlow} from "./maxflow";
import {testSuite} from "./unittests";

testSuite();

const container = document.getElementById("network");
const debug = document.getElementById("controls");


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

    net.createNode("1");
    net.createNode("2");
    net.createNode("3");
    net.createNode("4");

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
    net.createNode("5");

    net.createEdge("source", "1", 10);
    net.createEdge("source", "2", 10);
    net.createEdge("1", "2", 2);
    net.createEdge("1", "3", 4);
    net.createEdge("1", "4", 8);
    net.createEdge("2", "4", 9);
    net.createEdge("2", "5", 1);
    net.createEdge("5", "3", 1);
    net.createEdge("3", "sink", 10);
    net.createEdge("4", "3", 6);
    net.createEdge("4", "sink", 10);

    return net;
}

const network = net3();
const network2 = net2();

let renderer = new Renderer(container, debug, network, true);
calculateMaxFlow(network);
renderer.renderNetwork();
/*
setTimeout(() => {
    const maxflow = calculateMaxFlow(network);
    renderer.renderNetwork();
}, 1000);

setTimeout(() => {
    renderer.destroy();
    renderer = new Renderer(container, debug, network2);
    renderer.renderNetwork();
}, 2000);

setTimeout(() => {
    calculateMaxFlow(network2);
    renderer.renderNetwork();
}, 3000);*/