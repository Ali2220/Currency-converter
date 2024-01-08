const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"


// Humne 2 selects elements ko dropdown varibale k andr dala hai.
const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector('form button')

const fromCurr = document.querySelector(".from select")

const toCurr = document.querySelector(".to select")

const msg = document.querySelector('.msg')





// ye code is liye likha ta k puri currency list select k option m ajae
for(let select of dropdowns){
    for (currCode in countryList){    // currCode is pkr, inr, usd etc        
        let newOption= document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected"
        }
        select.append(newOption)  // means select element k andr newOption ko daldo. newOption == USD, PKR, INR etc.
        
    }

    select.addEventListener("change", (e) => {    // change event is used for input, select and textarea element. Here we are using change event for select
        updateFlag(e.target)

        
    })
}

// ye code is liye likha h k jesi currency change krein to flag bhi change ho

const updateFlag = (elem) => {

    var currCode = elem.value       
    let countryCode = countryList[currCode] // PK, US, IN etc
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`    
    let img = elem.parentElement.querySelector('img')
    img.src = newSrc
 
}



// code for get exchange button

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let amount = document.querySelector(".amount input")

    
    let amtVal = amount.value

    if (amtVal === '' || amtVal < 1) {
        amtVal = 1;
        amount.value = "1"
    }

    const fromCurrency = fromCurr.value.toLowerCase();
    
    const toCurrency = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurrency}/${toCurrency}.json`; // Ensure correct URL structure

    try {
        let response = await fetch(URL);

        if (response.ok) {
            let data = await response.json();
            var rate = data[toCurrency];
            console.log(rate);
        } else {
            throw new Error('Failed to fetch exchange rates');
        }
    } catch (error) {
        console.error(error);
    }
    msg.innerHTML = `${amount.value} ${fromCurrency} = ${rate} ${toCurrency}`
});

