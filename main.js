var GUESS_STRINGS = ["ADIVINAR", "LISTO", "VERIFICAR"];

var stringRandomHex = "";
var randomHex = "";

window.onload = function() {
      document.getElementById("guess-body").style.display = "flex";
      newRandomBg(false);
      setTimeout(function() {
        document.getElementsByClassName("guess-input")[0].focus();
      }, 1000);
};

function randomColorHex(){
    return Math.floor(Math.random() * 16777215).toString(16);
}

function evaluateHex() {
  var inputText = document.getElementsByClassName("guess-input")[0].value;
  if ((inputText.length != 6 && inputText.length != 3) || (!(/^#[0-9A-F]{6}$/i.test("#" + inputText)) && !(/^#[0-9A-F]{3}$/i.test("#" + inputText)))) {
    alert("Por favor ingresa un valor hexadecimal válido de 6 caracteres (#000000 - #ffffff)");
  } else {

    inputText = "#"+inputText.toLowerCase();
    var message = ""

    if(inputText === strRandomHex){
      message = "Acertaste";
    }else{
      message = "Incorrecto intenta de nuevo";
    }
    document.getElementsByClassName("result-color")[0].style.backgroundColor = "#" + inputText;
    document.getElementsByClassName("result-answer")[0].innerText = strRandomHex;
    document.getElementsByClassName("result-message")[0].innerText = message;
    document.getElementById("results-div").style.display = "flex";
    document.getElementById("guess-div").style.display = "none";
    document.getElementsByClassName("guess-input")[0].disabled = true;
  }
}

window.addEventListener("keydown", handleFirstTab);

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}

window.addEventListener("keydown", handleEnter);

function handleEnter(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (document.getElementById("results-div").style.display === "none") {
      evaluateHex();
    } else {
      newRandomBg(true);
    }
  }
}

function newRandomBg(autofocus) {
    strRandomHex = "#" + randomColorHex();
  
    var textColor = isLightColor(strRandomHex) ? "black" : "white";
    document.body.style.color = textColor;
    document.getElementsByClassName("result-color")[0].style.border = "3px solid " + (textColor);
    
    var links = document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        if(links[i].href)
        {
            links[i].style.color = textColor;  
        }
    }  
  
    document.getElementsByClassName("colored-bg")[0].style.background = strRandomHex;
    document.getElementById("guess-button").innerText = randomGuessString();
  
    document.getElementById("results-div").style.display = "none";
    document.getElementById("guess-div").style.display = "initial";
    document.getElementsByClassName("guess-input")[0].disabled = false;
    if (autofocus) {
      document.getElementsByClassName("guess-input")[0].focus();
    }
    document.getElementsByClassName("guess-input")[0].value = "";
  }

  function isLightColor(bgColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map(col => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179;
  }

  function randomGuessString() {
    return GUESS_STRINGS[Math.floor(Math.random() * GUESS_STRINGS.length)];
  }