import {FlowNetwork} from "../network";

export const simpleBipartite = {
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
};