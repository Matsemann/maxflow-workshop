

export class Network {
    constructor() {
        this.nodes = {};

        this.nodes.source = new Node("source");
        this.nodes.sink = new Node("sink");
    }

    /**
     * Create a new Node in the network and returns it
     * @param name String
     * @returns {Node}
     */
    createNode(name) {
        const node = new Node(name);
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
}

export class Node {
    /**
     * Don't call this directly, create it through the network
     * @param network
     * @param name
     */
    constructor(name) {
        this.name = name;

        /**
         * Map where key is name of other node,
         * value is residual left
         */
        this.residual = {};
        /**
         * Name of the parent during residual search
         */
        this.residualParent = "";

        /**
         * Map where key is name of other node,
         * value is original capacity of the edge between them
         */
        this.edgeCapacities = {};
    }

}