import {FlowNetwork} from "../network";

export const evenLonger = {
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
};