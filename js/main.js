var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var typeButtons = document.querySelectorAll(".type");
var typeS;
var hexRgb;

//NOTE: Anything that needs to launch at start add to init()
init();

function init(){
	setupModeButtons();
	setupTypeButtons();
	setupSquares();
	reset();
}

//NOTE: Changes difficulty by changing the size of the array using var numSqaures
function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//NOTE: testinng this out instead of an if else statement
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

// changes the type of color name
function setupTypeButtons(){
	for(var i = 0; i < typeButtons.length; i++){
		typeButtons[i].addEventListener("click", function(){
			typeButtons[0].classList.remove("selected");
			typeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "HEX" ? typeS = "hex": typeS="rgb";
			console.log(typeS);
			reset();
		});
	}
}

// compares the index of the picked color and clicked color
function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background;
			if(typeS == "hex"){
				hexRgb = hexToRgb(colors[pickedColor]);
				hexRgb = "rgb("+hexRgb.r+", "+hexRgb.g+", "+hexRgb.b+")";
			}else{
				hexRgb = colors[pickedColor];
				console.log("ran");
				console.log(hexRgb);
			}
			console.log(clickedColor);
			if(clickedColor == hexRgb){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = colors[pickedColor];
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

// this changes all the colors after getting it right
function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

// this picks a random color from the array of generated random colors
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return random;

}

// picks colors by type
function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		if(typeS == "hex"){
			arr.push(randomColorHex())
		}else{
			arr.push(randomColorRGB())
		}
	}
	return arr;
}

function randomColorRGB(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
function randomColorHex(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}
// converts hex to RGB
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
