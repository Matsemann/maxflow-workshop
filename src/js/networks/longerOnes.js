import {FlowNetwork} from "../network";

export const longerOnes = [{
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
}, {
    name: "Even longer one",
    generateNetwork: () => {
        const net = new FlowNetwork();

        net.createNode("1");
        net.createNode("2");
        net.createNode("3");
        net.createNode("4");
        net.createNode("5");
        net.createNode("6");
        net.createNode("7");
        net.createNode("8");
        net.createNode("9");
        net.createNode("10");
        net.createNode("11");

        net.createEdge("source", "1", 2);
        net.createEdge("source", "2", 3);
        net.createEdge("source", "4", 3);
        net.createEdge("1", "3", 6);
        net.createEdge("2", "4", 2);
        net.createEdge("3", "7", 5);
        net.createEdge("4", "5", 4);
        net.createEdge("4", "6", 1);
        net.createEdge("5", "3", 8);
        net.createEdge("5", "6", 2);
        net.createEdge("6", "8", 6);
        net.createEdge("7", "9", 3);
        net.createEdge("7", "10", 3);
        net.createEdge("8", "11", 4);
        net.createEdge("9", "sink", 2);
        net.createEdge("10", "sink", 3);
        net.createEdge("11", "sink", 9);

        return net;
    }
}];