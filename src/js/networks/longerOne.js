import {FlowNetwork} from "../network";

export const longOne = {
    name: "Long one",
    generateNetwork: () => {
        const net = new FlowNetwork();

        net.createNode("yo");
        net.createNode("b");
        net.createNode("node3");
        net.createNode("x");
        net.createNode("five");
        net.createNode("ggg");

        net.createEdge("source", "yo", 3);
        net.createEdge("source", "b", 4);
        net.createEdge("source", "node3", 2);
        net.createEdge("source", "ggg", 1);
        net.createEdge("yo", "x", 6);
        net.createEdge("yo", "five", 2);
        net.createEdge("b", "node3", 9);
        net.createEdge("node3", "five", 4);
        net.createEdge("node3", "ggg", 9);
        net.createEdge("x", "ggg", 6);
        net.createEdge("five", "sink", 9);
        net.createEdge("ggg", "sink", 9);

        return net;
    }
};