//
// script.js
// by Jeremy Muller
// This is used to control the performer's clock
//

var startButton, txt, wrapper;

// var clock;
var start = false;
var mm_offset = 0;
var noSleep = new NoSleep();
var metIndex = 0; // I have to use this because transport time isn't always accurate enough
var clickOn = false;
var beat = 2;
var totalSubdivions = 9;
var ringBlink = false;

// var eighthNote = 200; // in milliseconds
// var quarterNote = eighthNote * 2;
// var halfNote = quarterNote * 2;

var eighthNote, quarterNote, halfNote, wholeNote, m5_8, m9_8, m10_8, m12_8, m4_4;
var timeline;
// var eighthNote = 0.2; // in seconds
// var quarterNote = eighthNote * 2;
// var halfNote = quarterNote * 2;
// var wholeNote = halfNote * 2;
// var m5_8 = quarterNote + eighthNote * 3;
// var m9_8 = 9 * eighthNote;
// var m10_8 = 10 * eighthNote;
// var m12_8 = 12 * eighthNote;
// var m4_4 = wholeNote;

// var timeline = [];
// OLD SCORE!!!!
// var timeline = [m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // -3 - 8
//     m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, // 9-14
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, //15-34
//     m12_8, m12_8, m12_8, m12_8, m12_8, // 35-39
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // 40-60
//     m5_8, m9_8, m5_8, m9_8, m5_8, m9_8, m5_8, // 61-67
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8,
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8,
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // 68-122
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 123 - 145
//     m9_8, m9_8, // 146-147
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 148 - 170
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 171 - 193
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 194 - 216
//     m4_4, m4_4, m4_4, m4_4, m4_4, // 217 - 221
//     m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8,
//     m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, // 222 - 257
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 258 - 349
// ];
// OLD SCORE!!!!


// var timeline = [m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // -3 - 8
//     m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, // 9-14
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, //15-34
//     m12_8, m12_8, m12_8, m12_8, m12_8, // 35-39
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // 40-60
//     m5_8, m9_8, m5_8, m9_8, m5_8, m9_8, m5_8, // 61-67
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8,
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8,
//     m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // 68-122
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 123 - 145
//     m9_8, m9_8, // 146-147
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 148 - 170
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 171 - 193
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 194 - 216
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 217 - 239
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 240 - 256
//     m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8,
//     m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, // 257 - 292
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
//     m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 258 - 349
// ];

var meterDisplay;
var cnv;
var clockDiameter = 450;
var currentBeat = -1;
var currentMM = 0;
var countInBars = 3; // need to figure out how to use this
var beatsIndicators = [];
var repeatedEventID;

var impulse = new Tone.NoiseSynth({
    "noise": {
        "type": "white"
    },
    "envelope": {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0,
        "release": 0.1
    }
});

var metFilter = new Tone.Filter({
    "type": "bandpass",
    "frequency": 1000,
    "Q": 100,
    "gain": 0
}).toMaster();

var boost = new Tone.Multiply(10);
impulse.chain(metFilter, boost, Tone.Master);

var metronome = new Tone.Loop(function (time) {
    if (clickOn) {
        if (metIndex == 0) {
            metFilter.frequency.setValueAtTime(3000, time);
        } else if (beatsIndicators[metIndex] == undefined) {
            metFilter.frequency.setValueAtTime(1000, time);
        } else if (beatsIndicators[metIndex].z == 2) {
            metFilter.frequency.setValueAtTime(2000, time);
        } else {
            metFilter.frequency.setValueAtTime(1000, time);
        }
        impulse.triggerAttackRelease(0.1, time, 0.9);
    }
    Tone.Draw.schedule(function (time) {
        currentBeat = metIndex;
        ringBlink = (beatsIndicators[metIndex].z == 2) ? true : false;
    }, time);
    metIndex = (metIndex + 1) % totalSubdivions;
}, "8n");

function draw() {
    background(0);    

    displayClock(currentMM);

    // draws the beats and highlights current position
    push();
    translate(width/2, height/2);
    for (var i = 0; i < totalSubdivions; i++) {
        var pos = beatsIndicators[i];
        noStroke();
        fill(255, 0, 0);

        // if (currentBeat >= beatsIndicators.length) {
        //     console.log("true!");
            
        //     currentBeat = 0;
        // }
        if (i == currentBeat) {
            // console.log("currentbeat: " + currentBeat);

            fill(255, 0, 0);
            ellipse(pos.x, pos.y, 15 * pos.z * 3, 15 * pos.z * 3);
            fill(255, 0, 0);
            ellipse(pos.x, pos.y, 15 * pos.z, 15 * pos.z);
        } else {
            fill(100);
            ellipse(pos.x, pos.y, 15 * pos.z, 15 * pos.z);
        }

    }
    pop();




    // if (start) requestAnimationFrame(draw);

    // document.getElementsByTagName("p")[0].innerHTML = "audio context: " + Tone.now().toFixed(3);
    // document.querySelector('p').textContent = Tone.now().toFixed(3);


    // document.querySelector('span').textContent = "bars: " + Tone.Time(transport).toBarsBeatsSixteenths();

    // var transport = Tone.Transport.seconds.toFixed(3);
    var transport = Tone.Transport.seconds;
    var notation = Tone.Time(transport).toNotation();
    var ticks = Tone.Time(transport).toTicks();
    var time = Tone.Time(transport).toBarsBeatsSixteenths();
    var index1 = time.indexOf(':');
    var index2 = time.indexOf(':', index1 + 1);
    var bars = time.slice(0, index1);
    // var beat = time.slice(index1 + 1, index2);
    // console.log("notation: " + notation);
    // console.log("bar: " + bars + ", beat: " + beat);
    // console.log("time: " + time);
    // console.log("ticks: " + ticks);

    var b = parseInt(bars);
    // document.getElementById("timer").innerHTML = ++b;
    // document.getElementById("timer").innerHTML = b;
    // if (b < 100) {
    //     if (b < 10) {
    //         document.getElementById("timer").innerHTML = "00" + bars + beat;
    //     } else {
    //         document.getElementById("timer").innerHTML = "0" + bars + beat;
    //     }
    // } else {
    //     document.getElementById("timer").innerHTML = "" + bars + beat;
    // }

    var beats = document.getElementsByClassName("beat");
    for (var i = 0; i < beats.length; i++) {
        beats[i].style.opacity = 0;
    }
    // for (var b in beats) {
    //     // b.style.opacity = 0;
    //     // console.log("b: " + b);
    // }

    // document.getElementById(beat).style.opacity = 1;

}

function drawBeats(beats) {
    // beatsIndicators = []; // clear array
    console.log("drawing new meter!");

    var sum = 0;
    for (var i = 0; i < beats.length; i++) {
        sum += beats[i];
    }
    totalSubdivions = sum;

    var spacing = 360 / sum;
    var a = -90;
    var indicatorIndex = 0;
    for (var i = 0; i < beats.length; i++) {
        var subdivision = beats[i];
        for (var j = 0; j < subdivision; j++) {
            var angle = radians(a);
            a += spacing;
            var x = cos(angle) * (clockDiameter / 2 - 32.5);
            var y = sin(angle) * (clockDiameter / 2 - 32.5);
            var z = (j == 0) ? 2 : 1;
            // beatsIndicators.push(createVector(x, y, z));
            beatsIndicators[indicatorIndex] = createVector(x, y, z);
            indicatorIndex++;
        }
    }

    // for (var a = -90; a < 270; a += spacing) {
    //     var angle = radians(a);
    //     var x = cos(angle) * (clockDiameter / 2 - 20);
    //     var y = sin(angle) * (clockDiameter / 2 - 20);
    //     var z = 
    //     beatsIndicators.push(createVector(x, y, z));

    //     // var x = width / 2 + cos(angle) * (clockDiameter/2 - 20);
    //     // var y = height / 2 + sin(angle) * (clockDiameter/2 - 20);

    //     // noStroke();
    //     // fill(255, 0, 0);
    //     // ellipse(x, y, 30, 30);
    // }
}

function displayClock(mm) {
    var measure = mm.toString();

    if (ringBlink) fill(255);
    else fill(25);
    noStroke();
    ellipse(width / 2, height / 2, clockDiameter, clockDiameter);

    // fill(25);
    // ellipse(width / 2, height / 2, clockDiameter * 0.82, clockDiameter * 0.82);

    fill(0);
    ellipse(width / 2, height / 2, clockDiameter * 0.7, clockDiameter * 0.7);

    fill(255);
    noStroke();
    textSize(175);
    textAlign(CENTER, CENTER);
    text(measure, width / 2, height / 2);
}

function initTimeline() {
    var seconds8thNote = 60 / (Tone.Transport.bpm.value * 2);

    eighthNote = seconds8thNote; // in seconds
    quarterNote = eighthNote * 2;
    halfNote = quarterNote * 2;
    wholeNote = halfNote * 2;
    m5_8 = quarterNote + eighthNote * 3;
    m9_8 = 9 * eighthNote;
    m10_8 = 10 * eighthNote;
    m12_8 = 12 * eighthNote;
    m4_4 = wholeNote;

    timeline = [m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // -3 - 8
        m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, // 9-14
        m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, //15-34
        m12_8, m12_8, m12_8, m12_8, m12_8, // 35-39
        m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // 40-60
        m5_8, m9_8, m5_8, m9_8, m5_8, m9_8, m5_8, // 61-67
        m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8,
        m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8,
        m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, m9_8, // 68-122
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 123 - 145
        m9_8, m9_8, // 146-147
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 148 - 170
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 171 - 193
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 194 - 216
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 217 - 239
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 240 - 256
        m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8,
        m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, m10_8, // 257 - 292
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4,
        m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, m4_4, // 258 - 349
    ];
}

function buttonAction() {
    // wrapper.remove();
    wrapper.style.display = "none";
    // document.getElementById("timer").style.display = "inline";
    document.getElementById("resetButton").style.display = "inline";

    noSleep.enable();

    // Tone.Transport.start(Tone.now(), mm_offset);
    start = true;
    publishIt(0 + mm_offset);

    conductor();
    metronome.start();

}

function setup() {
    // create button
    startButton = document.createElement("button");
    startButton.onclick = buttonAction;
    txt = document.createTextNode("Start");
    startButton.appendChild(txt);
    startButton.className = "splash";
    startButton.id = "startButton";
    wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    // wrapper.id = "container";
    wrapper.appendChild(startButton);
    document.body.appendChild(wrapper);

    // tempo slider
    var slider = document.getElementById("tempoSlider");
    var output = document.getElementById("bpmText");
    output.innerHTML = slider.value + " bpm"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value + " bpm";
        Tone.Transport.bpm.value = this.value;
        initTimeline();
    }

    StartAudioContext(Tone.context);
    Tone.Transport.timeSignature = [9, 8];
    Tone.Transport.bpm.value = slider.value;
    initTimeline();
    // Tone.Transport.bpm.value = 100;

    cnv = createCanvas(500, 500);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + 100;
    cnv.position(x, y);
    background(0);

    drawBeats([3,3,3]); // 9/8 time sig
    // var beats = 5;
    // var spacing = 360 / beats;
    // for (var a = -90; a < 270; a += spacing) {
    //     var angle = radians(a);
    //     var x = cos(angle) * (clockDiameter / 2 - 20);
    //     var y = sin(angle) * (clockDiameter / 2 - 20);

    //     beatsIndicators.push(createVector(x, y));

    //     // var x = width / 2 + cos(angle) * (clockDiameter/2 - 20);
    //     // var y = height / 2 + sin(angle) * (clockDiameter/2 - 20);

    //     // noStroke();
    //     // fill(255, 0, 0);
    //     // ellipse(x, y, 30, 30);
    // }

    // initialize timeline
    // for (var i = 0; i < 8; i++) {
    //     timeline[i] = m9_8;
    // }
    // for (var i = 8; i < 14; i++) {
    //     timeline[i] = m10_8;
    // }
    // for (var i = 14; i < 34; i++) {
    //     timeline[i] = m9_8;
    // }
    // for (var i = 34; i < 39; i++) {
    //     timeline[i] = m12_8;
    // }
    // for (var i = 39; i < 60; i++) {
    //     timeline[i] = m9_8;
    // }
    // timeline[60] = m5_8;
    // timeline[61] = m9_8;
    // timeline[62] = m5_8;
    // timeline[63] = m9_8;
    // timeline[64] = m5_8;
    // timeline[65] = m9_8;
    // timeline[66] = m5_8;
    // for (var i = 67; i < 121; i++) {
    //     timeline[i] = m9_8;
    // }

    // Subscribe
    pubnub.addListener({
        message: function (m) {
            handleMessage(m);
        },
        presence: function (p) {
            console.log("occupancy: " + p.occupancy);
        }
    });
    pubnub.subscribe({
        channels: ['JeremyMuller_Exajoule'],
        withPresence: false
    });
}

function reset() {
    start = false;
    publishIt(0);
    metronome.stop();
    metIndex = 0;
    Tone.Transport.stop();
    Tone.Transport.clear(repeatedEventID);
    Tone.Transport.seconds = 0;
    currentBeat = -1;
    currentMM = 0;
    var slider = document.getElementById("tempoSlider");
    Tone.Transport.bpm.value = slider.value;
    document.getElementById("resetButton").style.display = "none";
    wrapper.style.display = "inline";
    setTimeout(function() {
        Tone.Transport.stop();
    }, 100);
    // setTimeout(function () {
    //     document.getElementById("timer").innerHTML = "0";
    //     var beats = document.getElementsByClassName("beat");
    //     for (var i = 0; i < beats.length; i++) {
    //         beats[i].style.opacity = 0;
    //     }
    // }, 100);
}

function mmToSeconds(mm) {
    // converts measure to correct number of seconds (since Tonejs can't accurately handle meter changes!!!!!! ARGH!!!)
    var totalSeconds = 0;
    if ((typeof mm) == 'string') mm = parseInt(mm); // check to make sure it's not a string

    for (var i = 0; i < (mm + countInBars); i++) {
        totalSeconds += timeline[i];
    }
    // totalSeconds += countInBars * m9_8;
    return totalSeconds;
}

function getBarsBeats(seconds) {
    // converts seconds to [bars, beats] array
    var sum = 0;
    var bar = 0;
    var beats = 0;
    var result;
    for (var i = 0; i < timeline.length; i++) {
        sum += timeline[i];
        if (seconds < sum) {
            bar = i - countInBars;
            var diff = seconds - (sum - timeline[i]);
            beats = diff / eighthNote;
            var b = parseInt(beats.toFixed(0)) % totalSubdivions;
            result = [bar, b];
            // console.log("bars:beats: " + result);
            break;
        }
    }
    return result;
}

function conductor() {
    // Tone.Transport.scheduleRepeat(function (time) {
    //     if (beat == null) {
    //         beat = 0;
    //         console.log("TRUE!!");
    //     } 
    //     else {
    //         // console.log("beat: " + beat);
    //         beat++;
    //         beat %= 3;
    //     }
    // }, "4n+8n", "0m");

    repeatedEventID = Tone.Transport.scheduleRepeat(function (time) {
        var transport = Tone.Transport.seconds;
        var barsBeats = getBarsBeats(transport);
        currentMM = barsBeats[0];
        // currentBeat = barsBeats[1];
        // console.log("seconds: " + transport);
        
        // var transport = Tone.Transport.seconds;
        // var ticks = Tone.Time(transport).toTicks();
        // var ms = Tone.Time(transport).toMilliseconds();
        // console.log("ticks: " + ticks + ", ms: " + ms);
    }, "8n", "0m");

    Tone.Transport.scheduleOnce(function (time) {
        console.log("measure 0!");

        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(0));
    Tone.Transport.scheduleOnce(function (time) {
        console.log("mm 1");
        // publishIt(Tone.Transport.seconds);
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(1)); // 1m

    Tone.Transport.schedule(function (time) {
        drawBeats([2,3,2,3]); // 10/8 time sig
    }, mmToSeconds(9)); // 9m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3,3,3]); // 9/8 time sig
    }, mmToSeconds(15)); // 15m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3,3,3,3]);
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(35)); // 35m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3, 3, 3]);
    }, mmToSeconds(40)); // 40m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2,3]);
    }, mmToSeconds(61)); // 61m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3,3,3]);
    }, mmToSeconds(62)); // 62m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2, 3]);
    }, mmToSeconds(63)); // 63m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3, 3, 3]);
    }, mmToSeconds(64)); // 64m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2, 3]);
    }, mmToSeconds(65)); // 65m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3, 3, 3]);
    }, mmToSeconds(66)); // 66m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2, 3]);
    }, mmToSeconds(67)); // 67m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3,3,3]);
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(68)); // 68m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2,2,2,2]);
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(123)); // 123m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([3,3,3]);
    }, mmToSeconds(146)); // 146m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2, 2, 2, 2]);
    }, mmToSeconds(148)); // 148m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2, 3, 2, 3]);
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(257)); // 257m
    Tone.Transport.scheduleOnce(function (time) {
        drawBeats([2, 2, 2, 2]);
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(293)); // 293m
    Tone.Transport.scheduleOnce(function (time) {
        publishIt(Tone.Transport.seconds);        
    }, mmToSeconds(308));

    // ending
    Tone.Transport.scheduleOnce(function (time) {
        console.log("STOP!!");
        start = false;
        Tone.Transport.stop();
        publishIt(Tone.Transport.seconds);
    }, mmToSeconds(372)); // 337m
}

function inputChanged() {
    var v = document.getElementsByName("mm_num")[0].value;
    if (v == "") v = '0';    
    // mm_offset = Tone.Time(v + "m").toSeconds();
    console.log("type of: " + (typeof v));

    mm_offset = mmToSeconds(v);
    console.log("seconds: " + mm_offset);
    currentMM = v;
    // document.getElementById("timer").innerHTML = v;
}

function toggleClick() {
    clickOn = document.getElementById("beatClick").checked;
}

function publishIt(time) {

    // time test
    pubnub.time(function (status, response) {
        if (status.error) {
            // handle error if something went wrong based on the status object
        } else {
            console.log(response.timetoken);
        }
    });

    pubnub.publish({
        message: {
            // "number" : Math.floor(Math.random() * 360)
            "start": start,
            "time": time,
            "tempo": Tone.Transport.bpm.value
        },
        channel: 'JeremyMuller_Exajoule',
        storeInHistory: false
    },
        function (status, response) {
            if (status.error) {
                // handle error
                console.log(status)
            } else {
                // console.log("message published w/ server response: ", response);
                // console.log("message Published w/ timetoken", response.timetoken);
                console.log(response.timetoken);
            }
        });

    // pubnub.hereNow({
    //     channels: ['JeremyMuller_Orbitals'],
    //     includeUUIDs: true
    // },
    // function(status, response) {
    //     console.log(response);
    // });
}

function handleMessage(m) {
    // TODO
    if (m.message['start'] == false) Tone.Transport.stop();
    else {
        console.log("time: " + m.message['time']);
        var mm = m.message['time'];
        // Tone.Transport.start(Tone.now(), mm);
    
        if (Tone.Transport.state == "stopped") {
            Tone.Transport.start(Tone.now(), mm);
        } else {
            Tone.Transport.pause();
            Tone.Transport.start("+0.1", mm + 0.1);
            console.log("transport was paused and restarted");
        }
    }
}

// window.addEventListener("load", init);
