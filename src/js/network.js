

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

    /**
     * Create edge of capacity between two nodes
     * @param from {String}
     * @param to {String}
     * @param capacity {Number}
     */
    createEdge(from, to, capacity) {
        const fromNode = this.getNode(from);
        const toNode = this.getNode(to);

        fromNode.edgeCapacities[toNode.name] = capacity;
        fromNode.residual[toNode.name] = capacity;
        toNode.residual[fromNode.name] = 0;
    }

    /**
     * @param name {String}
     * @returns {Node}
     */
    getNode(name) {
        return this.nodes[name];
    }

    /**
     * @returns {Node}
     */
    getSource() {
        return this.getNode("source");
    }

    /**
     * @returns {Node}
     */
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

        this.edgeCapacities = {};
    }

    /**
     *
     * @param toNode {Node}
     * @param capacity
     */
    addEdge(toNode, capacity) {
        this.edgeCapacities[toNode.name] = capacity;
        this.residual[toNode.name] = capacity;
        toNode.residual[this.name] = 0;
    }
}