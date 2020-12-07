// ITP Weather Band: GET Example
// this sketch gets weather data (JSON) from the weather band database and display the data.
// this example is written by Yeseul. the database is developed by Name and Cy. 
// see the json data here http://157.230.182.5:3000/data/all?macAddress=A4:CF:12:8A:C8:24
// November 2020
// feel free to modify and play with it for your project!

// making arrays for each weather data so you can access easily
let recorded_at = []; // the timezone is GMT
let wind_dir = [];
let winddir_avg2m = [];
let windspeedmph = [];
let rainin = [];
let dailyrainin = [];
let temperature = [];
let humidity = [];
let pressure = [];
let illuminance = [];
let uva = [];
let uvb = [];
let uvindex = [];

let jsonlink=document.getElementById("jsonlink");

//let allData = [];
// set which data you want to start from with its session id
let starting_id = 30;
let myCanvas;

let canvasWid = 5000;
let canvasHeight = 0.5 * window.innerHeight;


let data = document.getElementById("data");
let allData = document.getElementById("allData");
let catData = document.getElementById("catData");
let idData = document.getElementById("idData");
let dateData = document.getElementById("dateData");
let transactionID = document.getElementById("transactionID");
let catSelections = document.getElementById("catSelections");
let idUser = document.getElementById("idUser");
let windDir = document.getElementById("windDir");
let windSpeed = document.getElementById("windSpeed");
let rain = document.getElementById("rain");
let temp = document.getElementById("temp");
let dateUser = document.getElementById("dateUser");
let beginDate = document.getElementById("beginDate");
let endDate = document.getElementById("endDate");
let reset = document.getElementById("reset");
let sketch = document.getElementById("sketch"); //div for p5

reset.addEventListener("click", function () {
    // reset everything 
    dateUser.style.display = "none";
    transactionID.style.display = "none";
    catSelections.style.display = "none";
    recorded_atSingle = 0; // the timezone is GMT
    wind_dirSingle = 0;
    windspeedmphSingle = 0;
    raininSingle = 0;
    temperatureSingle = 0;
    humiditySingle = 0;
    illuminanceSingle = 0;
    uvindexSingle = 0;
    recorded_at = []; // the timezone is GMT
    wind_dir = [];
    winddir_avg2m = [];
    windspeedmph = [];
    rainin = [];
    dailyrainin = [];
    temperature = [];
    humidity = [];
    pressure = [];
    illuminance = [];
    uva = [];
    uvb = [];
    uvindex = [];
    drawGraphs();
    jsonlink.href="";
    jsonlink.innerHTML="Find your JSON here.";

})

data.addEventListener("change", selectData);
catSelections.addEventListener("change", catFun);
beginDate.addEventListener("change", getBeginDate);
endDate.addEventListener("change", getEndDate);
allData.addEventListener("change", getAllData);

idUser.addEventListener("input", getId);


function selectData() {
    console.log("dataclicked")
    if (catData.selected) {
        console.log("catdata selected")
        if (catSelections.style.display = "none") {
            catSelections.style.display = "block";
            dateUser.style.display = "none";
            transactionID.style.display = "none";

        } else {
            catSelections.style.display = "none";
        }
        //  return catData.selected;
    }
    if (idData.selected) {
        console.log("idData selected")
        getId();
        if (transactionID.style.display = "none") {
            transactionID.style.display = "block";
            dateUser.style.display = "none";
            catSelections.style.display = "none";

        } else {
            transactionID.style.display = "none";
        }
    }


    if (dateData.selected) {
        console.log("dateData selected");
        getDateVal();
        if (dateUser.style.display = "none") {
            dateUser.style.display = "block";
            transactionID.style.display = "none";
            catSelections.style.display = "none";

        } else {
            dateUser.style.display = "none";
        }
    }
    if (allData.selected) {
        //also reset 
        dateUser.style.display = "none";
        transactionID.style.display = "none";
        catSelections.style.display = "none";
        getAllData();    }
}
let catVal;
// if category is chosen
function catFun() {
    console.log("cat selections chosen");

    catVal = "";
    if (windDir.selected) {

        console.log("windDir selected");
        catVal = 'wind_dir';

    } else if (windSpeed.selected) {
        console.log("windSpeed selected");
        catVal = 'windspeedmph';
    } else if (rain.selected) {
        console.log("rain selected");
        catVal = 'rainin';
    } else {
        console.log("temp selected");
        catVal = 'temperature';
    }

    let catUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/by-cat?macAddress=A4:CF:12:8A:C8:24&cat=${catVal}`; //catVal will be the chosen ones from 
    loadJSON(catUrl, (jsonData) => {
        gotWeather(jsonData, () => {
            drawGraphs();
            // drawCat(getArrayToSend());
        })
    });
    console.log(catUrl);
    console.log(catVal);
    jsonlink.href=`http://weatherband.itp.io:3000/data/by-cat?macAddress=A4:CF:12:8A:C8:24&cat=${catVal}`;
    jsonlink.innerHTML=`JSON Date for category ${catVal}` ;
    console.log("printing the category data");
}


function getArrayToSend() {
    if (windDir.selected) {
        return wind_dir;
    } else if (windSpeed.selected) {
        return windspeedmph;
    } else if (rain.selected) {
        return rainin;
    } else {
        return temperature;

    }
}
let dateUrl;

function getDateVal(){
    dateUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/date?macAddress=A4:CF:12:8A:C8:24&from='${beginDate.value}'&to='${endDate.value}'`;
    jsonlink.href=`http://weatherband.itp.io:3000/data/date?macAddress=A4:CF:12:8A:C8:24&from='${beginDate.value}'&to='${endDate.value}'`;
    jsonlink.innerHTML=`JSON Date from ${beginDate.value} to ${endDate.value}`;


    loadJSON(dateUrl, (jsonData) => {
        gotWeather(jsonData, () => {
            drawGraphs();
        })
    });
}
function getBeginDate() {
    getDateVal();
    return beginDate.value;
}

function getEndDate() {
    getDateVal();
    return endDate.value;

}
let idUrl;

function getId() {
    idUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/id/${idUser.value}`;
    jsonlink.href=`http://weatherband.itp.io:3000/data/id/${idUser.value}`;
    jsonlink.innerHTML=`JSON Date for ID ${idUser.value}` 

    console.log("jsonlink",  jsonlink.src);
    loadJSON(idUrl, (jsonData) => {
        gotWeatherID(jsonData, () => {
            drawIds();
        })
    });

    recorded_atSingle = 0; // the timezone is GMT
    wind_dirSingle = 0;
    windspeedmphSingle = 0;
    raininSingle = 0;
    temperatureSingle = 0;
    humiditySingle = 0;
    illuminanceSingle = 0;
    uvindexSingle = 0;


}
let allUrl;
function getAllData() {
    console.log("alldata");
    allUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/all?macAddress=A4:CF:12:8A:C8:24`;

    loadJSON(allUrl, (jsonData) => {
        gotWeather(jsonData, () => {
            drawGraphs();
        })
    });



}

//p5 sketch 
function setup() {
    myCanvas = document.createElement("canvas");
    myCanvas.id = 'myCanvas';
    myCanvas = createCanvas(canvasWid, canvasHeight);
    myCanvas.parent("sketch");
    // Request the data from the weather band database
    // To avoid 429, Too Many Requests Error 
    // Replace cors everywhere with proxy forked by Yiting through this repo: https://github.com/Rob--W/cors-anywhere

}

let url = 'https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/all?macAddress=A4:CF:12:8A:C8:24';

function preload() {

    // load the json file
    //loadJSON(url, gotWeather);
}

//for all and by date
function gotWeather(weatherData, callback = () => {}) {

    console.log("data length: " + weatherData.length)
    // console.log(weatherData);

    recorded_at = []; // the timezone is GMT
    wind_dir = [];
    winddir_avg2m = [];
    windspeedmph = [];
    rainin = [];
    dailyrainin = [];
    temperature = [];
    humidity = [];
    pressure = [];
    illuminance = [];
    uva = [];
    uvb = [];
    uvindex = [];

    // add each weather data to the arrays
    for (i = 0; i < weatherData.length; i++) {
        recorded_at.push(weatherData[i].recorded_at);
        wind_dir.push(weatherData[i].wind_dir);
        winddir_avg2m.push(weatherData[i].winddir_avg2m);
        windspeedmph.push(weatherData[i].windspeedmph);
        rainin.push(weatherData[i].rainin);
        dailyrainin.push(weatherData[i].dailyrainin);
        temperature.push(weatherData[i].temperature);
        humidity.push(weatherData[i].humidity);
        pressure.push(weatherData[i].pressure);
        illuminance.push(weatherData[i].illuminance);
        uva.push(weatherData[i].uva);
        uvb.push(weatherData[i].uvb);
        uvindex.push(weatherData[i].uvindex);
    }
    console.log("finished pushing all the data");
    callback();
}

let ID = 30;

function drawIds() {
    background(250);

    colorMode(HSB);
    // draw linear graphs for each data to see the trend
    // the mapping is done based on the average range of each weather data
    noStroke();
    fill(0, 0, 46);
    textSize(32);
    text("WEATHER DATA", 30, 50);


    textSize(14);
    text("from " + recorded_atSingle + " ID : " + idUser.value, 30, 75);
    textSize(10);
    text("Data collected with a DIY weather station in East Village, NY  by ITP Weather Band", 30, 95);
    text("", 30, 100);

    fill(258, 18, 91);
    textSize(14);
    text("rain", 30, 150);
    text(raininSingle, 30, 170);
    let mappedR = map(raininSingle, 0, 1, 0, 50);
    ellipse(200, 150, mappedR, mappedR);
    console.log("raininsinglei n drawids", raininSingle)

    fill(183, 29, 89);
    text("wind direction", 30, 250);
    text(wind_dirSingle, 30, 270);
    let mappedWD = map(wind_dirSingle, 0, 315, 0, 50);
    ellipse(200, 250, mappedWD, mappedWD);

    fill(156, 25, 93);
    text("wind speed", 30, 350);
    text(windspeedmphSingle, 30, 370);
    let mappedWS = map(windspeedmphSingle, 0, 5, 0, 50);
    ellipse(200, 350, mappedWS, mappedWS);

    fill(93, 28, 94);
    text("temperature", 30, 450);
    text(temperatureSingle, 30, 470);
    let mappedT = map(temperatureSingle, 0, 20, 0, 50);
    ellipse(200, 450, mappedT, mappedT);

    fill(52, 65, 94);
    text("illuminance", 30, 550);
    text(illuminanceSingle, 30, 570);
    let mappedI = map(illuminanceSingle, 0, 2500, 0, 50);
    ellipse(200, 550, mappedI, mappedI);

    fill(25, 48, 98);
    text("uvindex", 30, 650);
    text(uvindexSingle, 30, 670);
    let mappedU = map(uvindexSingle, 0, 1, 0, 50);
    ellipse(200, 650, mappedU, mappedU);

    fill(0, 25, 99);
    text("humidity", 30, 750);
    text(humiditySingle, 30, 770);
    let mappedH = map(humiditySingle, 50, 150, 0, 50);
    ellipse(200, 750, mappedH, mappedH);
}
let recorded_atSingle = 0; // the timezone is GMT
let wind_dirSingle = 0;
let windspeedmphSingle = 0;
let raininSingle = 0;
let temperatureSingle = 0;
let humiditySingle = 0;
let illuminanceSingle = 0;
let uvindexSingle = 0;

function gotWeatherID(weatherData, callback = () => {}) {
    console.log(weatherData);

    recorded_atSingle = weatherData.recorded_at; // the timezone is GMT
    wind_dirSingle = weatherData.wind_dir;
    windspeedmphSingle = weatherData.windspeedmph;
    raininSingle = weatherData.rainin;
    temperatureSingle = weatherData.temperature;
    humiditySingle = weatherData.humidity;
    illuminanceSingle = weatherData.illuminance;
    uvindexSingle = weatherData.uvindex;

    console.log("recirded at single", recorded_atSingle);
    callback();

}
//print out the cat text 
function drawCat(category) {
    background(230, 251, 255);
    console.log(category);
    text(catVal, 100, canvasHeight / 9);
    for (i = 1; i < category.length; i++) {
        let mapped = map(category[i], 0, 0.8, canvasHeight / 9, canvasHeight / 9.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
}


function drawGraphs() {
    background(250);
    colorMode(HSB);
    // draw linear graphs for each data to see the trend
    // the mapping is done based on the average range of each weather data
    noStroke();
    fill(0, 0, 46);
    textSize(32);
    text("WEATHER DATA", 30, 50);
    textSize(14);
    text("from " + beginDate.value + " to " + endDate.value, 30, 75);
    textSize(10);
    text("Data collected with a DIY weather station in East Village, NY  by ITP Weather Band", 30, 95);
    text("", 30, 100);

    pos=mouseX-130;
    noStroke();
    // console.log("mouseX",mouseX);
    fill(258, 18, 91);
    textSize(14);
    text("rain", 30, 150);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(rainin[i], 0, 1, 150, 100);
        stroke(258, 18, 91);
        line(130 + i, 150, 130 + i, mapped);

        // let col = color(258, 18, 91);
        // showText(rainin[pos], "rain = ", col, 100, 150);
       

    }

    noStroke();
    fill(183, 29, 89);
    textSize(14);
    text("wind direction", 30, 250);

    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(wind_dir[i], 0, 315, 250, 200);
        let b = map(wind_dir[i], 0, 315, 0, 100);
        stroke(183, 29, 89);
        line(130 + i, 250, 130 + i, mapped);

        // let col = color(183, 29, 89);
        // showText(wind_dir[pos], "wind dir = ", col, 200, 250);
    }

    noStroke();
    fill(156, 25, 93);
    textSize(14);
    text("wind speed", 30, 350);
    // beginShape();
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(windspeedmph[i], 0, 5, 350, 300);
        stroke(156, 25, 93);
        line(130 + i, 350, 130 + i, mapped);

        // let col = color(156, 25, 93);
        // showText(windspeedmph[pos], "wind speed = ", col, 300, 350);
    }

    noStroke();
    fill(93, 28, 94);
    textSize(14);
    text("temperature", 30, 450);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(temperature[i], 0, 20, 450, 400);
        stroke(93, 28, 94);
        line(130 + i, 450, 130 + i, mapped);

        // let col = color(93, 28, 94);
        // showText(temperature[pos], "tempreature = ", col, 400, 450);
    }
    noStroke();
    fill(52, 65, 94);
    textSize(14);
    text("illuminance", 30, 550);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(illuminance[i], 0, 2500, 550, 500);
        stroke(52, 47, 99);
        line(130 + i, 550, 130 + i, mapped);

        // let col = color(52, 65, 94);
        // showText(illuminance[pos], "illuminance = ", col, 500, 550);
    }
    noStroke();
    fill(25, 48, 98);
    textSize(14);
    text("uv index", 30, 650);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(uvindex[i], 0, 1, 650, 600);
        stroke(25, 48, 98);
        line(130 + i, 650, 130 + i, mapped);

        // let col = color(25, 48, 98);
        // showText(uvindex[pos], "uv = ", col, 600, 650);
    }

    noStroke();
    fill(0, 25, 99);
    textSize(14);
    text("humidity", 30, 750);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(humidity[i], 50, 150, 750, 700);
        stroke(0, 25, 99);
        line(130 + i, 750, 130 + i, mapped);

        // let col = color(0, 25, 99);
        // showText(humidity[pos], "humidity = ", col, 700, 750);
    }
}
/*** 
function showText(data, word, col, hMin, hMax) {
    textSize(10);
    if (mouseX >= 130 & mouseX <= 130 + recorded_at.length & mouseY >= hMin & mouseY <= hMax) {
        let txt = word + data;
        
        let txtW = textWidth(txt);
        noStroke();
        fill(255);
        rect(mouseX - 5, mouseY - 12, txtW + 10, 16);
        fill(col);
        text(txt, mouseX, mouseY);
    }
}
*/

// let pos,xPos,yPos;
// sketch.addEventListener("mousemove", function (e) {
//     xPos = e.clientX;
//     yPos = e.clientY;
//     pos = xPos - 130;

    
//     noStroke();
//     fill(93, 28, 94);
//     textSize(14);
//     text("temperature", 30, 450);
//     for (i = 0; i < recorded_at.length; i++) {
//         let mapped = map(temperature[i], 0, 20, 450, 400);
//         stroke(93, 28, 94);
//         line(130 + i, 450, 130 + i, mapped);

//         let col = color(93, 28, 94);
//         showText(temperature[pos], "tempreature = ", col, 400, 450);
//     }
//     console.log(temperature[pos],"pos for temp")

//     document.getElementById("display").innerHTML=temperature[pos];
//     console.log("mouseover", xPos);
// })

// scrolling example from https://taufik-nurrohman.js.org/dte-project/full-page-horizontal-scrolling.html
//https://jsfiddle.net/64p5r459/2/
//scrolling not working 
function scrollHorizontally(e) {
    e = window.event || e;
    const deltaX = Math.max(-1, Math.min(1, e.deltaX));
    const deltaY = Math.max(-1, Math.min(1, e.deltaY));
    // var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    const delta = (deltaX + deltaY) / 2;
    document.documentElement.scrollLeft += (delta * 30); // Multiplied by 40
    e.preventDefault();
}
if (sketch.addEventListener) {
    // IE9, Chrome, Safari, Opera
    sketch.addEventListener('wheel', scrollHorizontally, false);
    // Firefox
    sketch.addEventListener('DOMMouseScroll', scrollHorizontally, false);
} else {
    // IE 6/7/8
    sketch.attachEvent('onmousewheel', scrollHorizontally);
}


//bugs:
//need to change date values or it won't send the request. cannot submit the same date value
