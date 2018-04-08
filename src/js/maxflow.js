
export function calculateMaxFlow(network) {
    let maxFlow = 0;

    let iterations = 0;
    while (breadthFirst(network)) {
        iterations++;
        const minResidual = findMinResidual(network);
        maxFlow += minResidual;
        updateResiduals(network, minResidual);
    }

    console.log("iterations used:", iterations);
    return maxFlow;
}

/**
 * Go backwards from the sink to the source using the residual parents.
 * Return the most flow that can be added through that path
 * @param network {FlowNetwork}
 * @returns {number}
 */
export function findMinResidual(network) {
    let min = Number.MAX_SAFE_INTEGER;
    let v = network.getNode("sink");
    while (v.name !== "source") {
        let u = network.getNode(v.residualParent);
        let residual = u.residuals[v.name];
        if (residual < min) {
            min = residual;
        }
        v = u;
    }

    return min;
}

/**
 * Go backwards from the sink and update the
 * residuals for the selected path with the
 * flow previously found
 *
 * @param network {FlowNetwork}
 * @param flow
 */
function updateResiduals(network, flow) {
    let v = network.getNode("sink");
    while (v.name !== "source") {
        let u = network.getNode(v.residualParent);

        u.residuals[v.name] -= flow;
        v.residuals[u.name] += flow;
        v = u;
    }
}

/**
 *
 * Start at the sink node, do a breadth first search
 * Remember to set the residualParent of a node when visiting it
 *
 * Return true/false if a path was found to the sink
 *
 * @param network {FlowNetwork}
 * @returns {boolean} If a path was found
 */
function breadthFirst(network) {
    const visited = [];
    const queue = ["source"];

    while (queue.length !== 0) {
        const nodeName = queue.shift();
        const node = network.getNode(nodeName);

        for (let other in node.residuals) {
            if (!visited.includes(other) && node.residuals[other] > 0) {
                queue.push(other);
                visited.push(other);

                const otherNode = network.getNode(other);
                otherNode.residualParent = nodeName;

                if (other === "sink") { // found it
                    return true;
                }
            }
        }
    }

    return false;
}