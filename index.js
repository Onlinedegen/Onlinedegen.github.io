
const BASE = "https://time.now/developer/api";

async function getTime(zone) {
    const res = await fetch(`${BASE}/timezone/${zone}`);
    const data = await res.json();

    const utc = new Date(data.utc_datetime);
    const time = utc.toLocaleTimeString("en-us", {
        timeZone: data.timezone
    });

    return time;
}

async function updateLocal() {
    try {
        const res = await fetch(`${BASE}/ip`);
        const data = await res.json();
        const time = new Date(data.datetime).toLocaleTimeString();
        document.getElementById("localTime").textContent =
            `Local Time (${data.timezone}): ${time}`;
    } catch {
        document.getElementById("localTime").textContent = "Error loading local time";
    }
}

async function addCityCard(zone) {
    const container = document.getElementById("cityList");

    const card = document.createElement("div");
    card.className = "clock-card";
    card.dataset.zone = zone;

    card.innerHTML = `
        <h3>${zone}</h3>
        <p class="time">Loading...</p>
        <button class="removeBtn">Remove</button>
    `;

    container.appendChild(card);

    card.querySelector(".removeBtn").onclick = () => card.remove();
}

async function updateCityClocks() {
    const cards = document.querySelectorAll(".clock-card");
    for (const card of cards) {
        const zone = card.dataset.zone;
        try {
            const time = await getTime(zone);
            card.querySelector(".time").textContent = time;
        } catch {
            card.querySelector(".time").textContent = "Error";
        }
    }
}

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// Add city button
document.getElementById("addCity").onclick = () => {
    const zone = document.getElementById("citySelect").value;
    addCityCard(zone);
};

// Start updating
setInterval(updateLocal, 1000);
setInterval(updateCityClocks, 1000);
updateLocal();
updateCityClocks();
