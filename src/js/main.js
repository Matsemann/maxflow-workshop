import css from '../css/styles.css';
import 'vis/dist/vis-network.min.css';
import {DataSet, Network} from 'vis/index-network';

const nodes = new DataSet([
    {id: 1, label: 'Source', level: 0, title: "Source"},//, x: 10, y:0, fixed:true, physics:false},
    {id: 2, label: '2', level: 2},
    {id: 3, label: '3', level: 2},
    {id: 4, label: '4', level: 3},
    {id: 5, label: '5', level: 3},
    {id: 7, label: '7', level: 1},
    {id: 8, label: '8', level: 1},
    {id: 6, label: 'Sink', level: 4}//, x:700, y:0, fixed:{x:true, y:true}, physics:false},
]);

const edges = new DataSet([
    {from: 1, to: 2, value: 5, label: "5/12", title: "5/12"},
    {from: 1, to: 7, value: 0, label: "0 / 12", title: "0 / 12"},
    {from: 7, to: 3, value: 1, label: "1 / 12", title: "1 / 12"},
    {from: 1, to: 3, value: 2, label: "2 / 5", title: "2 / 5"},
    {from: 2, to: 4, value: 3, label: "3 / 3", title: "3 / 3"},
    {from: 3, to: 5, value: 4, label: "4 / 8", title: "4 / 8"},
    {from: 4, to: 6, value: 5, label: "5 / 9", title: "5 / 9"},
    {from: 5, to: 6, value: 6, label: "6 / 12", title: "6 / 12"},
    {from: 7, to: 4, value: 7, label: "7 / 12", title: "7 / 12"},
    {from: 2, to: 5, value: 8, label: "8 / 12", title: "8 / 12"},
    {from: 1, to: 8, value: 9, label: "9 / 12", title: "9 / 12"},
    {from: 8, to: 2, value: 10, label: "10 / 12", title: "10 / 12"},
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

const net = new Network(container, data, options);
