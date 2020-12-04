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


const getUserLocation = async () => {
    let connection = await fetch('https://extreme-ip-lookup.com/json/');
    if (connection.ok){
        let response = await connection.json(),
            location = `${response.city}, ${response.country}`
        return location;
    }else {
        return false;
    }
}

const getWeatherInfo = () => {
    return getUserLocation().then(async location => {
        if (!location){
            return false;
        }
        let connection = await fetch(`https://api.weatherapi.com/v1/current.json?key=38a5051e7ce6493f86c50549200212&q=${location}`, {cache: "no-cache"});

        if(connection.ok){
            let response = await connection.json(),
                info = response.current;
            return info;
        }else {
            return false;
        }
    });
}

const printWeatherInfo = () => {
    getWeatherInfo().then(info =>{
        if (!info){
            return false;
        }
        const icon = document.getElementById("weather-icon"),
              temp = document.getElementById("weather-temp"),
              parent = document.getElementById("weather");

        icon.src = info.condition.icon;
        icon.alt = info.condition.text;
        icon.title = info.condition.text;
        temp.innerHTML = `${info.temp_c}°`;

        icon.addEventListener('load', () => parent.style.display = "flex");
    })
}

window.addEventListener("load", () => {
    setInterval(() => {
        let dd = new Date();
        rotateMin(dd);
    }, 100);
    let dd = new Date();
    displayDate(dd);
    printWeatherInfo();
})