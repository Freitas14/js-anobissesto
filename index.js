function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function generateCalendar(year) {
    const calendarContainer = document.getElementById("calendar-container");
    const leapYearIndicator = document.getElementById("leap-year");

    calendarContainer.innerHTML = "";

    if (isLeapYear(year)) {
        leapYearIndicator.textContent = `${year} é um ano bissexto.`;
    } else {
        leapYearIndicator.textContent = `${year} não é um ano bissexto.`;
    }

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    months.forEach((month, index) => {
        const date = new Date(year, index, 1);
        const daysInMonth = new Date(year, index + 1, 0).getDate();

        let table = `<div class='bg-white rounded shadow p-4'>
                        <h2 class='text-lg font-bold mb-2'>${month} ${year}</h2>
                        <table class='table-auto w-full border-collapse border border-gray-200'>
                            <thead>
                                <tr>
                                    <th class='border border-gray-300 p-1'>Dom</th>
                                    <th class='border border-gray-300 p-1'>Seg</th>
                                    <th class='border border-gray-300 p-1'>Ter</th>
                                    <th class='border border-gray-300 p-1'>Qua</th>
                                    <th class='border border-gray-300 p-1'>Qui</th>
                                    <th class='border border-gray-300 p-1'>Sex</th>
                                    <th class='border border-gray-300 p-1'>Sáb</th>
                                </tr>
                            </thead>
                            <tbody>`;

        let dayOfWeek = date.getDay();
        table += "<tr>";

        for (let blank = 0; blank < dayOfWeek; blank++) {
            table += "<td class='border border-gray-300 p-1'></td>";
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (dayOfWeek === 0 && day !== 1) {
                table += "<tr>";
            }

            table += `<td class='border border-gray-300 p-1'>${day}</td>`;

            if (dayOfWeek === 6) {
                table += "</tr>";
            }

            dayOfWeek = (dayOfWeek + 1) % 7;
        }

        if (dayOfWeek !== 0) {
            for (let blank = dayOfWeek; blank < 7; blank++) {
                table += "<td class='border border-gray-300 p-1'></td>";
            }
            table += "</tr>";
        }

        table += "</tbody></table></div>";
        calendarContainer.innerHTML += table;
    });
}

function populateYearOptions() {
    const yearSelect = document.getElementById("year-select");
    const currentYear = new Date().getFullYear();

    for (let year = currentYear - 50; year <= currentYear; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

window.onload = () => {
    populateYearOptions();
    const yearSelect = document.getElementById("year-select");
    generateCalendar(yearSelect.value);

    yearSelect.addEventListener("change", () => {
        generateCalendar(yearSelect.value);
    });
};
