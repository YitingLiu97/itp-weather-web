// ITP Weather Band: GET Example
// this sketch gets weather data (JSON) from the weather band database and display the data.
// this example is written by Yeseul. the database is developed by Name and Cy. 
// see the json data here http://157.230.182.5:3000/data/all?macAddress=A4:CF:12:8A:C8:24
// November 2020
// feel free to modify and play with it for your project!

// making arrays for each weather data so you can access easily
let recorded_at= []; // the timezone is GMT
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
// set which data you want to start from with its session id
let starting_id = 30;
let myCanvas;

let canvasWid = 5000;
let canvasHeight =  0.5*window.innerHeight;



function setup() {
 myCanvas = document.createElement("canvas");
 myCanvas.id='myCanvas';
 myCanvas= createCanvas(canvasWid,canvasHeight);
  myCanvas.parent("sketch");
  // Request the data from the weather band database
  // To avoid 429, Too Many Requests Error 
  // Replace cors everywhere with proxy forked by Yiting through this repo: https://github.com/Rob--W/cors-anywhere

}
function preload(){
  let url = 'https://proxy-server-yt.herokuapp.com/http://weatherband.itp.io:3000/data/all?macAddress=A4:CF:12:8A:C8:24';

  // load the json file
  loadJSON(url, gotWeather);
}
function draw() {
  background(230,251,255);
  drawGraphs();
  // getItems();


}

function gotWeather(weatherData) {  
  // add each weather data to the arrays
  for (i = starting_id; i < weatherData.length; i++) {
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
  
  // pring out the arrays loaded with weather data
  // console.log(recorded_at);
  // console.log(wind_dir);
  // console.log(winddir_avg2m);
  // console.log(windspeedmph);
  // console.log(rainin);
  // console.log(dailyrainin);
  // console.log(temperature);
  // console.log(windspeedmph);
  // console.log(humidity);
  // console.log(pressure);
  // console.log(illuminance);
  // console.log(uva);
  // console.log(uvb);
}

function drawGraphs() { 
  
  // draw linear graphs for each data to see the trend
  // the mapping is done based on the average range of each weather data
  text("Weather data from " + recorded_at[0] + "(GMT) and onwards", 30, canvasHeight/9*0.35);
  text("Data collected with a DIY weather station in East Village, NY", 30, canvasHeight/9*0.55);

  text("rainin", 30, canvasHeight/9);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(rainin[i], 0, 0.8, canvasHeight/9, canvasHeight/9.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
  text("dailyrainin", 30, canvasHeight/9*2);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(dailyrainin[i], 0, 1, canvasHeight/9*2, canvasHeight/9*2.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
  text("wind_dir", 30, canvasHeight/9*3);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(wind_dir[i], 0, 315, canvasHeight/9*3, canvasHeight/9*3.25);
    ellipse(130+i, mapped, 0.5, 0.5);      
  }
  text("windspeedmph", 30, canvasHeight/9*4);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(windspeedmph[i], 0, 5, canvasHeight/9*4, canvasHeight/9*4.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
  text("temperature", 30, canvasHeight/9*5);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(temperature[i], 10, 70, canvasHeight/9*5, canvasHeight/9*5.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
  text("illuminance", 30, canvasHeight/9*6);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(illuminance[i], 0, 2500, canvasHeight/9*6, canvasHeight/9*6.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
  text("uv index", 30, canvasHeight/9*7);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(uvindex[i], 0, 4, canvasHeight/9*7, canvasHeight/9*7.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
  text("humidity", 30, canvasHeight/9*8);
  for (i = 0; i < recorded_at.length; i++) {
    let mapped = map(humidity[i], 0, 100, canvasHeight/9*8, canvasHeight/9*8.25);
    ellipse(130+i, mapped, 0.5, 0.5);        
  }
}

  