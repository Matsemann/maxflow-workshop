import {FlowNetwork} from "../network";

export const randomBipartite = {
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
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}