import {DataSet, Network as VisNetwork} from 'vis/index-network';

export class Renderer {

    constructor(container, debugContainer, flowNetwork, forceRandom = false) {
        this.flowNetwork = flowNetwork;
        if (!forceRandom) {
            this.levels = findLevels(flowNetwork);
        }

        const options = getRenderingOptions(debugContainer, this.levels != null);
        const emptyData = {};

        this.network = new VisNetwork(container, emptyData, options);
    }

    renderNetwork() {
        const network = this.flowNetwork;
        const nodes = Object.values(network.nodes).map(node => ({
            id: node.name,
            label: node.name,
            title: node.name,
            level: this.levels && this.levels[node.name] || 0,
            color: ["source", "sink"].includes(node.name) ? "#7b6b60" : undefined,
        }));

        // whops..
        const edges = Object.values(network.nodes).map(node => (
            Object.keys(node.edgeCapacities).map(key => {
                const capacity = node.edgeCapacities[key];
                const residual = node.residuals[key];
                const value = capacity - residual;
                return {
                    from: node.name,
                    to: key,
                    value: value,
                    label: value + " / " + capacity,
                    title: value + " / " + capacity,
                    color: value === 0 ? {color: "#d9c8cb"} : undefined
                };
            })
        )).reduce((acc, val) => acc.concat(val), []);

        const data = {
            nodes: new DataSet(nodes),
            edges: new DataSet(edges),
        };

        this.network.setData(data);
    }

    destroy() {
        this.network.destroy();
    }
}

function findLevels(network) {
    const networkSize = Object.keys(network.nodes).length;
    const levels = {};
    const queue = [];

    const source = network.getNode("source");
    levels[source.name] = 0;
    queue.push(source.name);

    while (queue.length !== 0) {
        if (queue.length > networkSize * 2) {
            console.log(
                "Seems like the network contains a cycle, using alternative renderer instead of displaying hierarchically");
            return null;
        }

        const current = network.getNode(queue.shift());

        Object.keys(current.edgeCapacities).forEach(edge => {
            levels[edge] = levels[current.name] + 1; // > ?
            queue.push(edge);
        });
    }


    // trying to merge levels
    let count = [];
    let max = 0;
    for (let node in levels) {
        const level = levels[node];
        if (count[level]) {
            count[level]++;
        } else {
            count[level] = 1;
        }
        if (level > max) {
            max = level;
        }
    }

    for (let i = 1; i < max - 1; i++) {
        if (i > networkSize) {
            break;
        }
        if (count[i] === 1 && count[i + 1] === 1) {

            count[i] = 2;
            max--;
            for (let j = i + 1; j < max; j++) {
                count[j] = count[j + 1];
            }

            for (let node in levels) {
                const level = levels[node];
                if (level > i) {
                    levels[node]--;
                }
            }
        }
    }


    return levels;
}

function getRenderingOptions(debugContainer, hierarchical) {
    const options = {
        configure: {
            enabled: debugContainer != null,
            // container: debugContainer || undefined
        },
        layout: {
            improvedLayout: true,
            hierarchical: {
                enabled: hierarchical,
                direction: 'LR',
                parentCentralization: false,
                sortMethod: "directed"
            }
        },
        nodes: {
            font: {
                color: "#e2e2e2"
            },
            color: "#a49597"
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
                min: 1,
                max: 7,
                label: false
            },
            color: {
                color: "#8a786d"
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
    if (options.configure.enabled) {
        options.configure.container = debugContainer;
    }
    return options;
}