

export class FlowNetwork {
    constructor() {
        this.nodes = {};

        this.nodes.source = new Node("source", 0);
        this.nodes.sink = new Node("sink");
    }

    /**
     * Create a new Node in the network and returns it
     * @param name String
     * @param level optionally where to render it
     * @returns {Node}
     */
    createNode(name, level = undefined) {
        const node = new Node(name, level);
        this.nodes[name] = node;

        if (level) {
            this.hasLevels = true;
        }
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
        fromNode.residuals[toNode.name] = capacity;
        toNode.residuals[fromNode.name] = 0;
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
     */
    constructor(name, level = undefined) {
        this.name = name;
        this.level = level;

        /**
         * Map where key is name of other node,
         * value is residual left
         */
        this.residuals = {};

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