/**
 * The main loop of the flow algorithm,
 * you don't need to change this function, but
 * should implement the functions it calls below
 *
 * Ignore the "yields", they are for making it possible
 * to step through it in the UI
 * @param network {FlowNetwork}
 * @returns {number}
 */
export function* calculateMaxFlow(network) {
    let maxFlow = 0;

    let iterations = 0;
    while (breadthFirst(network)) {
        yield;
        if (iterations++ > 10000) {
            console.log("Aborting, probably infinite loop");
            return -1;
        }
        const minResidual = findMinResidual(network);
        maxFlow += minResidual;
        updateResiduals(network, minResidual);
        yield;
    }

    console.log("iterations used:", iterations);
    return maxFlow;
}

/**
 * Util for running the loop in the main algorithm until completion
 */
export function finishAlgorithm(algorithm) {
    let result = algorithm.next();
    while (!result.done) {
        result = algorithm.next();
    }
    return result.value;
}

/**
 * IMPLEMENT THIS
 *
 * Start at the source node, do a breadth first search
 * Remember to set the residualParent of a node when visiting it
 *
 * Return true/false if a path was found to the sink
 *
 * @param network {FlowNetwork}
 * @returns {boolean} If a path was found
 */
export function breadthFirst(network) {
    return false;
}

/**
 * IMPLEMENT THIS
 *
 * Go backwards from the sink to the source using the residual parents.
 * Return the most flow that can be added through that path
 * @param network {FlowNetwork}
 * @returns {number}
 */
export function findMinResidual(network) {

}

/**
 * IMPLEMENT THIS
 *
 * Go backwards from the sink and update the
 * residuals for the selected path with the
 * flow previously found
 *
 * @param network {FlowNetwork}
 * @param flow
 */
export function updateResiduals(network, flow) {

}
