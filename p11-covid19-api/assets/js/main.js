const stateInput = document.getElementById("stateInput");
const searchBtn = document.querySelector(".search-btn");
const loadingMessage = document.getElementById("loadingMessage");
const noDataMessage = document.getElementById("noDataMessage");

const statsContainer = document.getElementById("statsContainer");
const stateTitle = document.getElementById("stateTitle");

const totalCasesEl = document.getElementById("totalCases");
const indianCasesEl = document.getElementById("indianCases");
const foreignCasesEl = document.getElementById("foreignCases");
const dischargedEl = document.getElementById("discharged");
const deathsEl = document.getElementById("deaths");

const recoveryRateEl = document.getElementById("recoveryRate");
const mortalityRateEl = document.getElementById("mortalityRate");

const COVID_API = "https://api.rootnet.in/covid19-in/stats/latest";

function show(element) {
    element.style.display = "block";
}

function hide(element) {
    element.style.display = "none";
}

async function searchState() {
    const stateName = stateInput.value.trim().toLowerCase();
    if (!stateName) {
        alert("Please enter a state name");
        return;
    }

    show(loadingMessage);
    hide(noDataMessage);
    hide(statsContainer);

    try {
        const resp = await fetch(COVID_API);
        if (!resp.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await resp.json();

        const statesArray = data.data.regional;

        const state = statesArray.find((s) =>
            s.loc.toLowerCase() === stateName
        );

        if (!state) {
            hide(loadingMessage);
            show(noDataMessage);
            return;
        }

        hide(loadingMessage);
        show(statsContainer);

        stateTitle.textContent = state.loc;

        const total = state.totalConfirmed;
        const discharged = state.discharged;
        const deaths = state.deaths;

        totalCasesEl.textContent = total.toLocaleString('en-IN');
        dischargedEl.textContent = discharged.toLocaleString('en-IN');
        deathsEl.textContent = deaths.toLocaleString('en-IN');

        indianCasesEl.textContent = state.confirmedCasesIndian.toLocaleString('en-IN');
        foreignCasesEl.textContent = state.confirmedCasesForeign.toLocaleString('en-IN');

        const recRate = discharged / total * 100;
        const mortRate = deaths / total * 100;
        recoveryRateEl.textContent = recRate.toFixed(2) + "%";
        mortalityRateEl.textContent = mortRate.toFixed(2) + "%";

    } catch (err) {
        console.error("Error fetching data:", err);
        hide(loadingMessage);
        show(noDataMessage);
    }
}

searchBtn.addEventListener("click", searchState);

stateInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchState();
    }
});