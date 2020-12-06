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
})

data.addEventListener("change", selectData);
catSelections.addEventListener("change", catFun);
beginDate.addEventListener("change", getBeginDate);
endDate.addEventListener("change", getEndDate);
allData.addEventListener("change", getAllData);

idUser.addEventListener("input", getId);
    
    //idUser.value="";
    //idUser.min = "1";
    //idUser.max = "2000";
  //will be changed according to the size of the data 
//)

function selectData() {
    //console.log("dataclicked")
    if (catData.selected) {
        console.log("catdata selected")
        if (catSelections.style.display = "none") {
            return catSelections.style.display = "block";
        } else {
            return catSelections.style.display = "none";
        }
     //return catData.selected;

    }
    if (idData.selected) {
        console.log("idData selected")
        if (transactionID.style.display = "none") {
            return transactionID.style.display = "block";
        } else {
            return transactionID.style.display = "none"
        }
        //return idData.selected;
    }

    if (dateData.selected) {
        console.log("dateData selected")
        if (dateUser.style.display = "none") {
            return dateUser.style.display = "block";
        } else {
            return dateUser.style.display = "none";
        }
        //return dateData.selected;
    }
    if (allData.selected) {
        //also reset 
        dateUser.style.display = "none";
        transactionID.style.display = "none";
        catSelections.style.display = "none";
        getAllData();
        //return;
        //return allData.selected;
    }
}
// if category is chosen
function catFun() {
    console.log("cat selections chosen");
    let catVal = "";
    // let arrayToSend = [];

    if (windDir.selected) {
        console.log("windDir selected");
        // should return the value 
        catVal='wind_dir';
        //return windDir.selected;

    }
    else if (windSpeed.selected) {
        console.log("windSpeed selected");
        catVal='windspeedmph';
        //return windSpeed.selected;
    }

    else if (rain.selected) {
        console.log("rain selected");
        catVal='rainin';

        //return rain.selected;

    }
    else {
        console.log("temp selected");
        catVal='temperature';
        //return temp.selected;

    }


    function getArrayToSend() {
        if (windDir.selected) {
            return wind_dir;
        }
        else if (windSpeed.selected) {
            return windspeedmph;
        }
    
        else if (rain.selected) {
            return rainin;
        }
        else {
            return temperature;
    
        }
    }
    
    let catUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/by-cat?macAddress=A4:CF:12:8A:C8:24&cat=${catVal}`;//catVal will be the chosen ones from 
    loadJSON(catUrl, (jsonData) => {
        gotWeather(jsonData, () => {
            drawCat(getArrayToSend());
        })
    });
    console.log(catUrl);
    console.log(catVal);
    console.log("printing the category data");    
}

function getBeginDate() {
     return beginDate.value;
}

function getEndDate() {
    console.log("got date");
    let dateUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/date?macAddress=A4:CF:12:8A:C8:24&from='${beginDate.value}'&to='${endDate.value}'`;
    loadJSON(dateUrl, (jsonData) => {
        gotWeather(jsonData, () => {
            drawGraphs();
        })
    });
}

function getId(){
    let idUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/id/${idUser.value}`;
    console.log(idUrl.value)
    if(idUser.value!=null){
        console.log("trying anyways")
        loadJSON(idUrl, (jsonData) => {
            gotWeather(jsonData, () => {
                drawId();
            })
        });
    }
}

function getAllData(){
    console.log("alldata");
    let allUrl = `https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/all?macAddress=A4:CF:12:8A:C8:24`;

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

    background(230, 251, 255);
    //drawGraphs();
}


function preload() {
    let url = 'https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/all?macAddress=A4:CF:12:8A:C8:24';

    // load the json file
    //loadJSON(url, gotWeather);
}

//for all and by date
function gotWeather(weatherData, callback = () => {}) {

    console.log("data length: " + weatherData.length)
    console.log(weatherData);

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

function drawId(){
    background(230, 251, 255);
    let vSpacing = 20
    textSize(30);
    console.log(recorded_at);
    for (i=0; i< 12; i++){
        text(recorded_at[0], 10, i*vSpacing);
        text(wind_dir[0], 10, i*vSpacing);
        text(winddir_avg2m[0], 10, i*vSpacing);
        text(rainin[0], 10, i*vSpacing);
        text(dailyrainin[0], 10, i*vSpacing);
        text(temperature[0], 10, i*vSpacing);
    }
    console.log("finished drawing by id");
}



function drawCat(category){
    background(230, 251, 255);
    console.log(category);
    for (i = 1; i < category.length; i++) {
        let mapped = map(category[i], 0, 0.8, canvasHeight / 9, canvasHeight / 9.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    console.log("finished drawing by category");
}

function drawGraphs() {
    background(230, 251, 255);
    // draw linear graphs for each data to see the trend
    // the mapping is done based on the average range of each weather data
    text("Weather data from " + recorded_at[0] + "(GMT) and onwards", 30, canvasHeight / 9 * 0.35);
    text("Data collected with a DIY weather station in East Village, NY", 30, canvasHeight / 9 * 0.55);
    text("rainin", 30, canvasHeight / 9);

    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(rainin[i], 0, 0.8, canvasHeight / 9, canvasHeight / 9.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("dailyrainin", 30, canvasHeight / 9 * 2);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(dailyrainin[i], 0, 1, canvasHeight / 9 * 2, canvasHeight / 9 * 2.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("wind_dir", 30, canvasHeight / 9 * 3);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(wind_dir[i], 0, 315, canvasHeight / 9 * 3, canvasHeight / 9 * 3.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("windspeedmph", 30, canvasHeight / 9 * 4);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(windspeedmph[i], 0, 5, canvasHeight / 9 * 4, canvasHeight / 9 * 4.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("temperature", 30, canvasHeight / 9 * 5);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(temperature[i], 10, 70, canvasHeight / 9 * 5, canvasHeight / 9 * 5.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("illuminance", 30, canvasHeight / 9 * 6);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(illuminance[i], 0, 2500, canvasHeight / 9 * 6, canvasHeight / 9 * 6.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("uv index", 30, canvasHeight / 9 * 7);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(uvindex[i], 0, 4, canvasHeight / 9 * 7, canvasHeight / 9 * 7.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }
    text("humidity", 30, canvasHeight / 9 * 8);
    for (i = 0; i < recorded_at.length; i++) {
        let mapped = map(humidity[i], 0, 100, canvasHeight / 9 * 8, canvasHeight / 9 * 8.25);
        ellipse(130 + i, mapped, 0.5, 0.5);
    }

    console.log("finished drawing");
}
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


// function draw() {
//     background(230, 251, 255);
//     //drawGraphs();
//     // getItems();

//     // loadJSON(dateUrl, gotWeather);

// }


//bugs:
//need to change date values or it won't send the request. cannot submit the same  date value
//n