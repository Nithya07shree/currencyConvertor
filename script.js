const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
window.addEventListener("load",()=>{
    updateExchangeRate();
});
//append countrylist from codes.js into select option in the convertor
for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        //we need usd and inr as the first select options
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
//add event listener to change flag when there is a change in the select option of currency codes
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
//to update flags when a currency code is changed
const updateFlag =(element)=>{ //element is the selected from or to select dropdowns
    let currCode = element.value; //value of a particular option
    let countryCode = countryList[currCode]; //get countrycode value from countrylist[key/currcode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //get corresponding flag from api
    let img = element.parentElement.querySelector("img"); //get the image from the parentelement of the select option
    img.src = newSrc; //change src of image to new src obtained from the api key
}

//getting exchange rates
btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); //prevents any default actions that takes place when the button is clicked
    updateExchangeRate();
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value; //input value
    //when input is empty or negative
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    let fromLcase = fromCurr.value.toLowerCase();
    let toLcase = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${fromLcase}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let res = (data[fromLcase][toLcase])*amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${res.toFixed(3)} ${toCurr.value}`; //toFixed is to reduce after decimal size to 2 digits
};