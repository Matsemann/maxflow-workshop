import {Renderer} from "./renderer";
import {calculateMaxFlow, finishAlgorithm} from "./maxflow";

export class UiState {

    constructor(networks) {
        this.debugContainer = document.getElementById("controls");
        this.container = document.getElementById("network");

        createDropdown(this, networks);
        createStepButtons(this);

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
const messageEl = document.getElementById("status");

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

function createStepButtons(uiState) {
    resetButton.addEventListener("click", () => {
        uiState.newNetwork(uiState.networkDef);
    });
    nextButton.addEventListener("click", () => {
        uiState.nextStep();
    });
    finishButton.addEventListener("click", () => {
        uiState.finishAlgorithm();
    });
}

function finish(flow) {
    messageEl.innerText = "Done, max flow: " + flow ;
    setButtonState(false)
}

function setButtonState(enabled) {
    nextButton.disabled = !enabled;
    finishButton.disabled = !enabled;
}