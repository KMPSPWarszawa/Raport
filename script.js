const reportForm = document.getElementById("reportForm");
const addUnit = document.getElementById("addUnit");
const units = document.getElementById("units");

let unitCount = 1;

addUnit.addEventListener("click", () => {

    unitCount++;

    const div = document.createElement("div");
    div.className = "unit";

    div.innerHTML = `
        <h3>Zastęp ${unitCount}</h3>

        <label>Pojazd</label>
        <input type="text" class="pojazd">

        <label>Kierowca</label>
        <input type="text" class="kierowca">

        <label>Dowódca</label>
        <input type="text" class="dowodca">

        <label>R1</label>
        <input type="text" class="r1">

        <label>Pomocnik R1</label>
        <input type="text" class="pr1">

        <label>R2</label>
        <input type="text" class="r2">

        <label>Pomocnik R2</label>
        <input type="text" class="pr2">
    `;

    units.appendChild(div);

});

reportForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    let report = "";

    const allUnits = document.querySelectorAll(".unit");

    allUnits.forEach((unit, index) => {

        report += `🚒 **Zastęp ${index + 1}**\n`;
        report += `Pojazd: ${unit.querySelector(".pojazd").value}\n`;
        report += `Kierowca: ${unit.querySelector(".kierowca").value}\n`;
        report += `Dowódca: ${unit.querySelector(".dowodca").value}\n`;
        report += `R1: ${unit.querySelector(".r1").value}\n`;
        report += `Pomocnik R1: ${unit.querySelector(".pr1").value}\n`;
        report += `R2: ${unit.querySelector(".r2").value}\n`;
        report += `Pomocnik R2: ${unit.querySelector(".pr2").value}\n\n`;

    });

    const embed = {
        title: "📋 Karta Zdarzenia",
        color: 3447003,
        fields: [
            {
                name: "👨‍🚒 Kierujący działaniami",
                value: document.getElementById("kdr").value || "-",
                inline: false
            },
            {
                name: "📂 Kategoria",
                value: document.getElementById("kategoria").value,
                inline: true
            },
            {
                name: "📏 Wielkość",
                value: document.getElementById("wielkosc").value,
                inline: true
            },
            {
                name: "🚒 Obsada",
                value: report || "-",
                inline: false
            },
            {
                name: "📍 Lokalizacja",
                value: document.getElementById("location").value || "-",
                inline: false
            },
            {
                name: "🕒 Przybycie",
                value: document.getElementById("arrival").value || "-",
                inline: true
            },
            {
                name: "🕒 Zakończenie",
                value: document.getElementById("finish").value || "-",
                inline: true
            },
            {
                name: "📝 Opis zdarzenia",
                value: document.getElementById("description").value || "-",
                inline: false
            },
            {
                name: "✍️ Sporządzający",
                value: document.getElementById("author").value || "-",
                inline: false
            }
        ],
        timestamp: new Date().toISOString()
    };

    if (!WEBHOOK_URL) {
        alert("Nie ustawiono webhooka w pliku config.js");
        return;
    }

    try {

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });

        if (response.ok) {

            alert("Raport został wysłany!");

            reportForm.reset();

            units.innerHTML = `
                <div class="unit">

                    <h3>Zastęp 1</h3>

                    <label>Pojazd</label>
                    <input type="text" class="pojazd">

                    <label>Kierowca</label>
                    <input type="text" class="kierowca">

                    <label>Dowódca</label>
                    <input type="text" class="dowodca">

                    <label>R1</label>
                    <input type="text" class="r1">

                    <label>Pomocnik R1</label>
                    <input type="text" class="pr1">

                    <label>R2</label>
                    <input type="text" class="r2">

                    <label>Pomocnik R2</label>
                    <input type="text" class="pr2">

                </div>
            `;

            unitCount = 1;

        } else {

            alert("Błąd podczas wysyłania raportu.");

        }

    } catch (err) {

        console.error(err);
        alert("Nie udało się połączyć z webhookiem.");

    }

});