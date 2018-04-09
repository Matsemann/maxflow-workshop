import {FlowNetwork} from "../network";

export const bipartites = [{
    name: "Simple bipartite",
    generateNetwork: () => {
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
}, {
    name: "Random bipartite",
    generateNetwork: () => {
        const net = new FlowNetwork();

        const lefties = getRandomInt(2, 6);
        const righties = getRandomInt(2, 6);
        const edges = getRandomInt(lefties, lefties * 2);

        for (let i = 1; i <= lefties; i++) {
            net.createNode("left" + i, 1);
            net.createEdge("source", "left" + i, 1);
        }

        for (let i = 1; i <= righties; i++) {
            net.createNode("right" + i, 2);
            net.createEdge("right" + i, "sink", 1);
        }

        for (let i = 1; i <= edges; i++) {
            const from = "left" + getRandomInt(1, lefties);
            const to = "right" + getRandomInt(1, righties);
            net.createEdge(from, to, 1);
        }

        net.getNode("sink").level = 3;

        return net;
    }
}];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}