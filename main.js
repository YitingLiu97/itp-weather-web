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

reset.addEventListener("click",function(){
    // reset everything 
    dateUser.style.display = "none";
    transactionID.style.display = "none";
    catSelections.style.display = "none";
})

data.addEventListener("click", function () {

    console.log("dataclicked")
    if (catData.selected) {
        console.log("catdata selected")
        if (catSelections.style.display = "none") {
            catSelections.style.display = "block";
        } else {
            catSelections.style.display = "none";
        }
    }
    if (idData.selected) {
        console.log("idData selected")
        if (transactionID.style.display = "none") {
            transactionID.style.display = "block";
        } else {
            transactionID.style.display = "none"
        }
    }

    if (dateData.selected) {
        console.log("dateData selected")
        if (dateUser.style.display = "none") {
            dateUser.style.display = "block";
        } else {
            dateUser.style.display = "none"
        }
    }
    if (allData.selected) {
        //also reset 
        dateUser.style.display = "none";
        transactionID.style.display = "none";
        catSelections.style.display = "none";
       
    }
});



catSelections.addEventListener("click", function () {

    console.log("cat selections chosen")
    if (windDir.selected) {
        console.log("windDir selected");
        // should return the value 
    
    }
    if (windSpeed.selected) {
        console.log("windSpeed selected");
    }

    if (rain.selected) {
        console.log("rain selected")
   
    }
    if (temp.selected) {
        console.log("temp selected")
      
    }
 
});


beginDate.addEventListener("change",function(){
    //send the input date out 
    console.log(beginDate.value);
    return beginDate.value;

});

endDate.addEventListener("change",function(){
    //send the input date out 
    
    console.log(endDate.value);
    return endDate.value;

});

idUser.addEventListener("click",function(){
    // idUser.value="";
    idUser.min="1";
    idUser.max="200";//will be changed according to the size of the data 
})