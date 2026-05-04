
async function fetchTime(zone, elementId) {
    try{
        const res = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
        const data = await res.json();
        const time = new Date(data.datetime).toLocaleTimeString();
        document.getElementById(elementId).textContent = time;
    }
    catch{
        document.getElementById(elementId).textContent = "Error loading time";
    }
}

function updateClocks(){
    fetchTime("America/New_York", "clock-ny");
    fetchTime("Europe/London", "clock-london");
    fetchTime("Asia/Tokyo", "clock-tokyo");
}

updateClocks();
setInterval(updateClocks, 1000);

document.getElementById("searchButton").addEventListener("click", async () => {
    const query = document.getElementById("searchBar").value.trim();
    const result = document.getElementById("searchResult");

    if(!query){
        result.textContent = "Please enter a timezone";
        return;
    }

    try{
        const res = await fetch(`https://worldtimeapi.org/api/timezone/${query}`);
        const data = await res.json();
        const time = new Date(data.datetime).toLocaleTimeString();
        result.textContent = `${query}: ${time}`;
    }
    catch{
        result.textContent = "Invalid timezone";
    }
});