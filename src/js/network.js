

export class Network {
    constructor() {
        this.nodes = {};

        this.nodes.source = new Node(this, "source");
        this.nodes.sink = new Node(this, "sink");
    }

    /**
     * Create a new Node in the network and returns it
     * @param name String
     * @returns {Node}
     */
    createNode(name) {
        const node = new Node(this, name);
        this.nodes[name] = node;
        return node;
    }

    getNode(name) {
        return this.nodes[name];
    }

    getSource() {
        return this.getNode("source");
    }
    getSink() {
        return this.getNode("sink");
    }

}

/**
 * LALALA
 */
export class Node {
    /**
     * Don't call this, create it through the network
     * @param network
     * @param name
     */
    constructor(network, name) {
        this.network = network;
        this.name = name;
        this.residual = {};
        this.residualParent = "";

        // For rendering only
        this.outEdges = {};
    }

    /**
     *
     * @param toNode {Node}
     * @param capacity
     */
    addEdge(toNode, capacity) {
        this.outEdges[toNode.name] = capacity;
        this.residual[toNode.name] = capacity;
        toNode.residual[this.name] = 0;
    }
}