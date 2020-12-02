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


document.onload = setInterval(() => {
    let dd = new Date();
    rotateMin(dd);
}, 100);