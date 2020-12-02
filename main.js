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

data.addEventListener("click", selectData);
catSelections.addEventListener("click", catFun);
beginDate.addEventListener("change", getBeginDate);

endDate.addEventListener("change", getEndDate);

idUser.addEventListener("click", function () {
    // idUser.value="";
    idUser.min = "1";
    idUser.max = "200";
    sessionStorage.getItem("maxId", maxId);//need to get from sketch js? 

    //will be changed according to the size of the data 
})



function selectData() {
    console.log("dataclicked")
    if (catData.selected) {
        console.log("catdata selected")
        if (catSelections.style.display = "none") {
            catSelections.style.display = "block";
        } else {
            catSelections.style.display = "none";
        }
        // sessionStorage.setItem("catData.selected", catData.selected);
        return catData.selected;

    }
    if (idData.selected) {
        console.log("idData selected")
        if (transactionID.style.display = "none") {
            transactionID.style.display = "block";
        } else {
            transactionID.style.display = "none"
        }
        // sessionStorage.setItem("idData.selected", idData.selected);

        return idData.selected;
    }

    if (dateData.selected) {
        console.log("dateData selected")
        if (dateUser.style.display = "none") {
            dateUser.style.display = "block";
        } else {
            dateUser.style.display = "none";
        }

        // sessionStorage.setItem("dateData.selected", dateData.selected);

        return dateData.selected;
    }
    if (allData.selected) {
        //also reset 
        dateUser.style.display = "none";
        transactionID.style.display = "none";
        catSelections.style.display = "none";
        return allData.selected;
    }
}

function catFun() {
    console.log("cat selections chosen")
    if (windDir.selected) {
        console.log("windDir selected");
        // should return the value 
        sessionStorage.setItem("windDir.selected", windDir.selected);
        return windDir.selected;

    }
    if (windSpeed.selected) {
        console.log("windSpeed selected");
        sessionStorage.setItem("windSpeed.selected", windSpeed.selected);
        return windSpeed.selected;
    }

    if (rain.selected) {
        console.log("rain selected");
        sessionStorage.setItem("rain.selected", rain.selected);
        return rain.selected;

    }
    if (temp.selected) {
        console.log("temp selected");
        sessionStorage.setItem("temp.selected", temp.selected);
        return temp.selected;

    }

}


// let beginDateVal,endDateVal;

function getBeginDate() {
    sessionStorage.setItem("beginDate.value", beginDate.value);

    return beginDate.value;

}

function getEndDate() {
    sessionStorage.setItem("endDate.value", endDate.value);

    return endDate.value;

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
