const minuteHand = document.getElementById('minute'),
      hourHand = document.getElementById('hour');


const rotateMin = date => {
    let secVal = date.getSeconds(),
        degFromSeconds = .1 * secVal,
        minuteVal = date.getMinutes();

    minuteHand.style.transform = `rotate(${(minuteVal*6)+degFromSeconds}deg)`;

    rotateHour(date, minuteVal);
}

const rotateHour = (date, minuteVal) => {
    let degFromMin = .5 * minuteVal,
        hourVal = date.getHours();

    hourHand.style.transform = `rotate(${(hourVal*30)+degFromMin}deg)`;
}

const weekDay = date => {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          dateIndex = date.getDay();
    return weekDays[dateIndex];
}

const monthName = date => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          monthIndex = date.getMonth();
    return monthNames[monthIndex];
}

const displayDate = date => {
    const dateOutput = document.getElementById("date-text"),
          dayNumber = date.getDate();

    dateOutput.innerHTML = `${weekDay(date)},<br/>${monthName(date)} ${dayNumber}`;
}

window.addEventListener("load", () => {
    setInterval(() => {
        let dd = new Date();
        rotateMin(dd);
    }, 100);
    let dd = new Date();
    displayDate(dd);
})