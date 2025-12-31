
const source = document.getElementById("sourceText").textContent;
const output = document.getElementById("typeOutput");

let i = 0;

function typeText() {
  if (i < source.length) {
    output.textContent += source[i];
    i++;
    setTimeout(typeText, 80);
  }
  
}

typeText();
