import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {DataSet, Network} from 'vis/index-network';

const nodes = new DataSet([
    {id: 1, label: 'Source', level: 0, title: "Source"},//, x: 10, y:0, fixed:true, physics:false},
    {id: 2, label: '2', level:2},
    {id: 3, label: '3', level: 2},
    {id: 4, label: '4', level:3},
    {id: 5, label: '5', level:3},
    {id: 7, label: '7', level:1},
    {id: 6, label: 'Sink', level:4}//, x:700, y:0, fixed:{x:true, y:true}, physics:false},
]);

const edges = new DataSet([
    {from: 1, to: 2},
    {from: 1, to: 7},
    {from: 7, to: 3},
    {from: 1, to: 3},
    {from: 2, to: 4},
    {from: 3, to: 5},
    {from: 4, to: 6},
    {from: 5, to: 6},
    {from: 7, to: 4},
    {from: 2, to: 5},
]);

const container = document.getElementById("network");

const data = {
    nodes,
    edges
};

const options = {
    configure: {
        enabled: true,
        container: document.getElementById("controls")
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
            to: true
        },
        smooth: {
            "type": "cubicBezier"
        }
    },
    physics: {
        enabled: false,
    },
    interaction: {
        tooltipDelay: 0
    }
};

new Network(container, data, options);