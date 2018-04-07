import {DataSet, Network as VisNetwork} from 'vis/index-network';

export class Renderer {

    constructor(container, debugContainer) {
        const options = getRenderingOptions(debugContainer);
        const emptyData = {};

        this.network = new VisNetwork(container, emptyData, options);
    }

    renderNetwork(network) {
        const levels = findLevels(network);

        const nodes = Object.values(network.nodes).map(node => ({
            id: node.name,
            label: node.name,
            title: node.name,
            level: levels[node.name] || 0
        }));

        const edges = Object.values(network.nodes).map(node => (
            Object.keys(node.edgeCapacities).map(key => {
                const capacity = node.edgeCapacities[key];
                const residual = node.residual[key];
                const value = capacity - residual;
                return {
                    from: node.name,
                    to: key,
                    value: value,
                    label: value + " / " + capacity,
                    title: value + " / " + capacity
                };
            })
        )).reduce((acc, val) => acc.concat(val), []);

        const data = {
            nodes: new DataSet(nodes),
            edges: new DataSet(edges),
        };

        this.network.setData(data);
    }
}

function findLevels(network) {
    const levels = {};
    // const visited = [];
    const queue = [];

    const source = network.getNode("source");
    levels[source.name] = 0;
    queue.push(source.name);

    while (queue.length !== 0) {
        // console.log(queue[0]);
        const current = network.getNode(queue.shift());
        // visited.push(current.name);

        Object.keys(current.edgeCapacities).forEach(edge => {
            levels[edge] = levels[current.name] + 1; // > ?
            // if (!visited.includes(edge)) { // multiple visits?
                queue.push(edge);
            // }
        });
    }

    return levels;
}

function getRenderingOptions(debugContainer) {
    return {
        configure: {
            enabled: debugContainer != null,
            container: debugContainer
        },
        layout: {
            improvedLayout: true,
            hierarchical: {
                enabled: true,
                direction: 'LR',
                parentCentralization: false
            }
        },
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: .5
                },
            },
            arrowStrikethrough: false,
            smooth: {
                "type": "cubicBezier"
            },
            scaling: {
                min: .1,
                max: 5,
                label: false
            }
        },
        physics: {
            enabled: true,
        },
        interaction: {
            tooltipDelay: 0,
            hover: true
        }
    };
}