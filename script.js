const math = window.math.create(window.math.all);


let display = document.querySelector(".cal-display");
display.textContent = 0;
let digits = document.querySelector(".cal-num");

// adds number to display
let num = document.querySelector(".cal-nums");
num.addEventListener("click", function(event) {
      if (event.target.tagName === 'BUTTON') {

        if (!(event.target.id === "dot")) {

          // if there is empty space before number swap with x
          if ((display.textContent.slice(-1) === " ") && (display.textContent.at(-2) === "²")) {
            display.textContent += "×" + event.target.textContent.trim();
          }

          else {
            display.textContent += event.target.textContent.trim();
          }
        } 

        // adds dot only once per operator
        else {
          
          // Get the current text
          let currentText = display.textContent;
          // Split the text at operators (assuming operators are +, -, *, /)
          let numbers = currentText.split(/[\+\-\*\/]/);
          // Get the active/current number (the last one in the array)
          let activeNumber = numbers[numbers.length - 1];

          // Add the dot only if the active number doesn't already have one
          if (!activeNumber.includes(".")) {
              display.textContent += event.target.textContent.trim();
          }
        }

      } 
    });

// adds operator to display
let operator = document.querySelector(".calc-operations");
operator.addEventListener("click", function(event) {
  let lastChar = display.textContent.trim().slice(-1);

  if (event.target.tagName === 'BUTTON' && !(event.target.id === "equals") && !(display.textContent.trim() === "")) {

    //  if last item is operator then swap
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      display.textContent = display.textContent.slice(0, -2) +  event.target.textContent.trim() + " ";
    }

    // if not, add operator
    else {
      display.textContent += " " + event.target.textContent.trim() + " ";
    }
  }

});

// adds calculator keys to display
let calculatorKeys = document.querySelector(".cal-content-top");
calculatorKeys.addEventListener("click", function(event) {

  if (event.target.tagName === 'BUTTON') {

    // clear key
    if  (event.target.id === "clear") {
      display.textContent = "0";
    }

    // back space key
    else if (event.target.id === "backSpace") {
      display.textContent = display.textContent.trim().slice(0,-1)
    }

    // square and root key
    else {

      let lastChar = display.textContent.trim().slice(-1);

      //  if last item is already key
      if (lastChar === "²" || lastChar === "√") {
        
        // if clicked button is square
        if (event.target.id === "square") {
          if (!(display.textContent.at(-1) === " ")) {
            display.textContent = display.textContent.trim().slice(0, -1) +  "² ";
          }
        }

        // if clicked button is root
        else {
          display.textContent = display.textContent.trim().slice(0, -1) +  " √";
        }
      }

      // if new key
      else {

        // if clicked button is square
        if (event.target.id === "square") {
          if (!(display.textContent.trim() === "") && !(display.textContent.at(-1) === " ")) {
            display.textContent += "² ";
          }
        }

        // if clicked button is root
        else if (event.target.id === "root") {
          display.textContent += " √";
        }
      }
      
    }
  }
});


// equals button
let equals = document.querySelector("#equals");
equals.addEventListener("click", function() {

  let str = display.textContent;
  let sanitized = str
    .replaceAll("²", "^2")     
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replace(/√(\d+\.?\d*)/g, "sqrt($1)");

  const result = math.evaluate(sanitized);

  display.textContent = result

});
