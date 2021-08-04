// set some variables
let percentage = document.documentElement;
let charging = document.getElementById("void");
let buildUp = 25;
let buildPiece = 100/buildUp;
let button = document.getElementById("chargeIt");

button.onclick = function() {
	percentage.style.setProperty("--charged", 0);
	buildUp = document.getElementById("numero").value;
	buildPiece = 100/buildUp;
	chargingUp(buildUp-1);
}

// initialize main charging sequence
function chargingUp(i) {
	let timeOpt = {
		max: 500,
		min: 250,
		inc: 50
	}
	setTimeout(function() {
		sparkle()
		if(i--) chargingUp(i)
	}, randomization(timeOpt))
}

// function for each charging sparkle
function sparkle() {
	let spark = document.createElement("div")
	let sparkPosOpt = {
		max: 20,
		min: -20,
		inc: .5
	}
	let sparkIntOpt = {
		max: 50,
		inc: 1
	}
	let sparkRotOpt = {
		max: 360,
		min: -360,
		inc: 15
	}
	spark.className = "pulsing"
	spark.style = "--top: "+randomization(sparkPosOpt)+"vw; --left: "+randomization(sparkPosOpt)+"vw; --direction: "+(randomization()>0?1:-1)+"; --intensity: ."+randomization(sparkIntOpt)+"; --rotate: "+randomization(sparkRotOpt)+"deg;"
	charging.append(spark)
	setTimeout(function() {
		spark.remove()
		percentage.style.setProperty("--charged", parseInt(getComputedStyle(percentage).getPropertyValue("--charged"))+buildPiece)
	}, 2750)
}

// function for randomized numbers
function randomization(options) {
	let inc = typeof(options)==="object" && options.hasOwnProperty("inc") ? options.inc : 1
	let max = typeof(options)==="object" && options.hasOwnProperty("max") ? options.max : 2
	let min = typeof(options)==="object" && options.hasOwnProperty("min") ? options.min : 0
	let ran = (Math.floor(Math.random()*((max-min + inc)/inc))*inc+min)
	return ran
}
