import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {Renderer} from "./renderer";
import {Network} from "./network";

const container = document.getElementById("network");
const debug = document.getElementById("controls");

const net = new Network();

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

const renderer = new Renderer(container, debug);
renderer.renderNetwork(net);
