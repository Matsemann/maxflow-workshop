import {Renderer} from "./renderer";
import {calculateMaxFlow, finishAlgorithm} from "./maxflow";
import {testSuite} from "./unittests";

export class UiState {

    constructor(networks) {
        this.debugContainer = document.getElementById("controls");
        this.container = document.getElementById("network");

        createDropdown(this, networks);
        addButtonBehavior(this);

        this.newNetwork(networks[0]);
    }

    newNetwork(networkDef) {
        console.log("Selected network:", networkDef.name);
        this.networkDef = networkDef;
        setButtonState(true);
        messageEl.innerText = "";

        if (this.renderer) {
            this.renderer.destroy();
        }

        this.network = networkDef.generateNetwork();
        this.renderer = new Renderer(this.container, this.debugContainer, this.network);
        this.renderer.renderNetwork();
        this.algorithm = calculateMaxFlow(this.network);
        this.state = 0;
    }

    nextStep() {
        const result = this.algorithm.next();
        this.renderer.renderNetwork(this.state % 2 === 0);
        this.state = (this.state + 1) % 2;
        if (result.done) {
            this.renderer.renderNetwork();
            finish(result.value);
        }
    }

    finishAlgorithm() {
        const flow = finishAlgorithm(this.algorithm);
        this.renderer.renderNetwork();
        finish(flow);
    }


}

const resetButton = document.getElementById("reset");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const testButton = document.getElementById("tests");
const messageEl = document.getElementById("status");
const testMessage = document.getElementById("testStatus");

function createDropdown(uiState, networks) {
    const dropdown = document.getElementById("networks");

    networks.forEach((network) => {
        const option = document.createElement("option");
        option.innerText = network.name;
        option.value = network.name;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", () => {
        uiState.newNetwork(findNetwork(dropdown.value));
    });

    function findNetwork(name) {
        return networks.filter((net) => net.name === name)[0];
    }
}

function addButtonBehavior(uiState) {
    resetButton.addEventListener("click", () => {
        uiState.newNetwork(uiState.networkDef);
    });
    nextButton.addEventListener("click", () => {
        uiState.nextStep();
    });
    finishButton.addEventListener("click", () => {
        uiState.finishAlgorithm();
    });
    testButton.addEventListener("click", () => {
       runTests();
    });
}

function runTests() {
    console.log("Running unit tests");
    const result = testSuite();
    console.log("Test results", result);

    const success = result.breadth && result.update && result.min && result.flow;
    if (success) {
        testMessage.innerHTML = '<span class="success">OK! All tests correct</span>';
    } else {
        testMessage.innerHTML = '<span class="error">ERROR! Some tests failed, see console for details</span>';
    }
}

function finish(flow) {
    messageEl.innerText = "Done, max flow: " + flow ;
    setButtonState(false)
}

function setButtonState(enabled) {
    nextButton.disabled = !enabled;
    finishButton.disabled = !enabled;
}