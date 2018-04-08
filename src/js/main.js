import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {Renderer} from "./renderer";
import {FlowNetwork} from "./network";
import {calculateMaxFlow, finishAlgorithm} from "./maxflow";
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

function bipartite() {
    const net = new FlowNetwork();

    net.createNode("l1");
    net.createNode("l2");
    net.createNode("l3");
    net.createNode("l4");
    net.createNode("l5");
    net.createNode("r1");
    net.createNode("r2");
    net.createNode("r3");
    net.createNode("r4");

    for (let i = 1; i <= 5; i++) {
        net.createEdge("source", "l" + i, 1);
    }
    for (let i = 1; i <= 4; i++) {
        net.createEdge("r" + i, "sink", 1);
    }
    net.createEdge("l1", "r1", 1);
    net.createEdge("l2", "r1", 1);
    net.createEdge("l3", "r1", 1);
    net.createEdge("l3", "r2", 1);
    net.createEdge("l3", "r3", 1);
    net.createEdge("l3", "r4", 1);
    net.createEdge("l4", "r4", 1);
    net.createEdge("l5", "r4", 1);

    return net;
}

function bipartite2() {
    const net = new FlowNetwork();

    net.createNode("l1");
    net.createNode("l2");
    net.createNode("r1");
    net.createNode("r2");
    net.createEdge("source", "l1", 1);
    net.createEdge("source", "l2", 1);
    net.createEdge("l1", "r1", 1);
    net.createEdge("l1", "r2", 1);
    net.createEdge("l2", "r1", 1);
    net.createEdge("r1", "sink", 1);
    net.createEdge("r2", "sink", 1);

    return net;
}


const network = bipartite2();
let renderer = new Renderer(container, debug, network);
renderer.renderNetwork();
const algorithm = calculateMaxFlow(network);

document.getElementById("next").addEventListener("click", iteratorFunc());

document.getElementById("finish").addEventListener("click", () => {
    const maxFlow = finishAlgorithm(algorithm);
    renderer.renderNetwork();
    renderDone(maxFlow);
});

function iteratorFunc() {
    let state = 0;
    return () => {
        const result = algorithm.next();
        renderer.renderNetwork(state % 2 === 0);
        state = (state + 1) % 2;
        if (result.done) {
            renderer.renderNetwork();
            renderDone(result.value)
        }
    }
}

function renderDone(maxFlow) {
    const message = "Done, max flow: " + maxFlow;
    document.getElementById("status").innerText = message ;

}
