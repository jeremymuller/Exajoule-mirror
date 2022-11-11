//
// app.js
// by Jeremy Muller
// To be used in my piece "Exajoule" for marimba quartet and mobile phones
//

// window.addEventListener("load", init);

// comment this out, this is for debugging on old iphones
// window.addEventListener("error", handleError, true);

// function handleError(evt) {
//     if (evt.message) { // Chrome sometimes provides this
//         alert("error: " + evt.message + " at linenumber: " + evt.lineno + " of file: " + evt.filename);
//     } else {
//         alert("error: " + evt.type + " from element: " + (evt.srcElement || evt.target));
//     }
// }

/************* variables *************/
var startButton, text, wrapper;

var play = false;

// HSL's for hydrogen atom:
// 0, 100, 50
// 184, 100, 50
// 249, 100, 50
// 275, 100, 43

// var colors = ["red", "sky", "blue", "purple"];
var colors = { "red": 0, "sky": 184, "blue": 249, "purple": 275 };
var stripColors = ["#212227", "#b10707", "#ff5400", "#ffd400", "#ffff67", "#ffd400", "#ff5400", "#b10707", "#212227"];
// var stripColors = ["#212227", "#b10707", "#ff5400", "#ffd400", "#ffff67"];
var strips;
// var hues = [0, 184, 249, 275];
var hue;
var colorIndex = 0;
var backgroundSat = 100;
var backgroundLight = 50;
var light = 50;
var incr = 0.2;

var countInBars = 3; // need to figure out how to use this

// var eighthNote = 0.2; // in seconds
// var quarterNote = eighthNote * 2;
// var halfNote = quarterNote * 2;
// var wholeNote = halfNote * 2;
// var m5_8 = quarterNote + eighthNote * 3;
// var m9_8 = 9 * eighthNote;
// var m10_8 = 10 * eighthNote;
// var m12_8 = 12 * eighthNote;
// var m4_4 = wholeNote;
var eighthNote, quarterNote, halfNote, wholeNote, m5_8, m9_8, m10_8, m12_8, m4_4;
var timeline;

var qRange16s = 4;
var qRange5s = 4;
var qScale = ['F#6', 'E6', 'D6', 'Bb5', 'A5', 'F#5', 'D5', 'Bb4', 'A4', 'F#4', 'E4', 'D4'];
// var qScale = ["D4", "E4", "F#4", "A4", "Bb4", "D5", "F#5", "A5", "Bb5", "D6", "E6", "F#6"];
// var timeline = [];
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

var animate = false;
var repeatID234Running = false;

var noSleep = new NoSleep();
var pubnub;

// ["Eb5", "F5", "Db5", "Gb5", "F5", "Eb5", "C5", "Ab5", "Db5", "Gb5", "Eb5", "F5", "Gb5", "Db5", "Bb4", "Bb5", "Eb5"]

var motiveA = new Tone.Pattern(function (time, note) {
    squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
    drawingMotive(currentDrawM, time, motiveA.index);
    // var r = Math.floor(random(strips.length));
    // var r = randomInt(-2, 2);
    // console.log("r: " + r);
    // if (r < 0) r += strips.length;
    // console.log("if (r<0): " + r);

    // Tone.Draw.schedule(function (time) {
    //     setOpacity(1, r);
    //     // strips[r].style.opacity = 1.0;
    //     // colorIndex %= strips.length;
    //     // strips[r].style.opacity = 1.0;
    // }, time);
    // // Tone.Draw.schedule(function (time) {
    //     // setOpacity(1, colorIndex++);
    // //     colorIndex %= strips.length;
    // //     // strips[r].style.opacity = 0.0;
    // // }, (time + eighthNote/2));
}, ["D5", "D5", "E5"], "up");
motiveA.interval = "8n";

var motiveA_8va = new Tone.Pattern(function (time, note) {
    var note8va = Tone.Frequency(note).transpose(12);
    squareSynth.triggerAttackRelease(note8va, 0.1, time, 0.9);
    drawingMotive(currentDrawM, time, motiveA_8va.index);
}, ["D4", "E4", "E4", "D4"], "up");
motiveA_8va.interval = "8n";

var motiveB = new Tone.Pattern(function (time, note) {
    squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
    drawingMotive(currentDrawM, time, motiveB.index);
    // var r = Math.floor(random(strips.length));
    // var r = randomInt(-2, 2);
    // if (r < 0) r += strips.length;
    // console.log("r: " + r);

    // Tone.Draw.schedule(function (time) {
    //     setOpacity(1, r);
    //     // colorIndex %= strips.length;
    //     // strips[r].style.opacity = 1.0;
    // }, time);
    // // Tone.Draw.schedule(function (time) {
    // //     setOpacity(1, colorIndex++);
    // //     colorIndex %= strips.length;
    // //     // strips[r].style.opacity = 0.0;
    // // }, (time + eighthNote / 2));
}, ["D4", "E4", "E4", "D4"], "up");
motiveB.interval = "8n";

var motiveB_8va = new Tone.Pattern(function (time, note) {
    var note8va = Tone.Frequency(note).transpose(12);
    squareSynth.triggerAttackRelease(note8va, 0.1, time, 0.9);
    drawingMotive(currentDrawM, time, motiveB_8va.index);
}, ["D4", "E4", "E4", "D4"], "up");
motiveB_8va.interval = "8n";

var motiveB_15va = new Tone.Pattern(function (time, note) {
    var note15va = Tone.Frequency(note).transpose(24);
    squareSynth.triggerAttackRelease(note15va, 0.1, time, 0.9);
    drawingMotive(currentDrawM, time, motiveB_15va.index);
}, ["D4", "E4", "E4", "D4"], "up");
motiveB_15va.interval = "8n";

var motiveC = new Tone.Pattern(function (time, note) {
    squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
    drawingMotive(currentDrawM, time, motiveC.index);
    // Tone.Draw.schedule(function (time) {
    //     setOpacity(0.5, colorIndex++);
    //     colorIndex %= strips.length;
    // }, time);
}, ["D5", "C5", "C5", "D5", "E5", "C5"], "up");
motiveC.interval = "8n";

// TODO: fix this
var jumpOct = false;
var motivesProb = 1.0;
var motiveD = new Tone.Pattern(function (time, note) {
    var n = note;
    if (motivesProb < 1.0) {
        var r = Math.random();
        if (r < 0.1) { // 10%
            n = Tone.Frequency(note).transpose(36);
            // squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
            squareWithLFO.triggerAttackRelease(n, eighthNote, time, 0.9);
            drawingMotive(4, time);
            drawingMotive('b', time + eighthNote);
        } else if (r < motivesProb) {
            squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
            drawingMotive(currentDrawM, time, motiveD.index);
        }

    } else {
        if (jumpOct) n = Tone.Frequency(note).transpose(24);
        squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
        drawingMotive(currentDrawM, time, motiveD.index);
    }
}, ["D4", "E4", "C4", "E4", "D4"], "up");
motiveD.interval = "8n";

var motiveE = new Tone.Pattern(function (time, note) {

    var n = note;
    if (motivesProb < 1.0) {
        var r = Math.random();
        if (r < 0.1) { // 10%
            n = Tone.Frequency(note).transpose(36);
            // squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
            squareWithLFO.triggerAttackRelease(n, eighthNote, time, 0.9);
            drawingMotive(4, time);
            drawingMotive('b', time + eighthNote);
        } else if (r < motivesProb) {
            squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
            drawingMotive(currentDrawM, time, motiveE.index);
        }
    } else {
        if (jumpOct) n = Tone.Frequency(note).transpose(24);
        squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
        drawingMotive(currentDrawM, time, motiveE.index);
    }
}, ["G4", "C#5", "F#5", "B4", "D5", "G5", "B4", "D5", "C#5", "F#5"], "up");
motiveE.interval = "16n";

var motiveF = new Tone.Pattern(function (time, note) {

    var n = note;
    if (motivesProb < 1.0) {
        var r = Math.random();
        if (r < 0.1) { // 10%
            n = Tone.Frequency(note).transpose(36);
            // squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
            squareWithLFO.triggerAttackRelease(n, eighthNote, time, 0.9);
            drawingMotive(4, time);
            drawingMotive('b', time + eighthNote);
        } else if (r < motivesProb) {
            squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
            drawingMotive(currentDrawM, time, motiveF.index);
        }
    } else {
        if (jumpOct) n = Tone.Frequency(note).transpose(24);
        squareSynth.triggerAttackRelease(n, 0.1, time, 0.9);
        drawingMotive(currentDrawM, time, motiveF.index);
    }
}, ["D5", "G5", "F#5", "C#6", "E5", "G5", "A5", "D6"], "up");
motiveF.interval = "4n/5";

var playMotiveDescending = true;
var motiveDescending = new Tone.Pattern(function (time, note) {
    if (playMotiveDescending) {
        squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
        drawingMotive(5, time, 6 - motiveDescending.index);
        // drawingMotive(7, time);
    } 
    // drawingMotive(currentDrawM, time);

    if (motiveDescending.index == motiveDescending.values.length - 1) {
        playMotiveDescending = !playMotiveDescending;
        motiveDescending.index = randomInt(0, 2);
    }

}, ["F#6", "E6", "D6", "C6", "B5", "A5", "G5"], "up");
motiveDescending.interval = "16n";
// motiveDescending.iterations = 1;

var motiveRandOctShiftProb = 0;
var motiveRandOctShift = new Tone.Pattern(function (time, note) {
    var i;
    switch (note) {
        case "E6":
            i = 0;
            break;
        case "F#6":
            i = 1;
            break;
        case "D6":
            i = 2;
            break;
        case "A6":
            i = 3;
            break;
    }
    drawingMotive(5, time, i);

    var note8ba = note;
    if (Math.random() < motiveRandOctShiftProb) { // r < 5%
        note8ba = Tone.Frequency(note).transpose(-12);
        // if (random(100) < 50) note8ba = Tone.Frequency(note).transpose(-12);
        // else note8ba = Tone.Frequency(note).transpose(-24);
    }
    squareWithLFO.triggerAttackRelease(note8ba, 0.1, time, 0.9);
}, ["E6", "E6", "F#6"], "up");
motiveRandOctShift.interval = "16n";
var augPattern = [
    "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", 
    "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6",
    "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6",
    "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6",
    "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6",
    "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6",
    "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6",
    "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6",
    "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6", "D6",
    "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6",
    "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6", "F#6",
    "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6", "E6"
];

var drawRange = [-2, 2];
var currentDrawM = 0;
function drawingMotive(motive, time, colorIndex) {
    switch (motive) {
        case 0:
            var r = randomInt(drawRange[0], drawRange[1]);
            if (r < 0) r += strips.length;
            Tone.Draw.schedule(function (time) {
                setOpacity(1, r);
            }, time);
            Tone.Draw.schedule(function (time) {
                setOpacity(0, r);
            }, time + eighthNote / 4);
            break;
        case 1:
            // double time
            Tone.Draw.schedule(function (time) {
                var r = randomInt(0, strips.length);
                setOpacity(1, r);
            }, time);
            Tone.Draw.schedule(function (time) {
                var r = randomInt(0, strips.length);
                setOpacity(0, r);
            }, time + eighthNote / 4);
            Tone.Draw.schedule(function (time) {
                var r = randomInt(0, strips.length);
                setOpacity(1, r);
            }, time + eighthNote / 2);
            Tone.Draw.schedule(function (time) {
                var r = randomInt(0, strips.length);
                setOpacity(1, r);
            }, time + eighthNote / 2 + eighthNote / 4);
            break;
        case 2:
            var rInd = randomInt(strips.length);
            var rTime = random(quarterNote, quarterNote+eighthNote);
            Tone.Draw.schedule(function (time) {
                strips[rInd].style.opacity = 1;
            }, time);
            Tone.Draw.schedule(function (time) {
                strips[rInd].style.opacity = 0;
            }, time+rTime);
            break;
        case 3:
            var r = randomInt(3, 6);
            console.log("r is: " + r);
            Tone.Draw.schedule(function (time) {
                setOpacity(1, r);
            }, time);
            Tone.Draw.schedule(function (time) {
                setOpacity(0, r);
            }, time + eighthNote/2);
            break;
        case 4:
            var r = randomInt(stripColors.length);
            Tone.Draw.schedule(function (time) {
                setColor(stripColors[r]);
            }, time);
            break;
        case 5:
            Tone.Draw.schedule(function (time) {
                setColor(stripColors[colorIndex]);
            }, time);
            break;
        case 6:
            Tone.Draw.schedule(function (time) {
                colorIndex = colorIndex % stripColors.length;
                var prev;
                if (colorIndex == 0) prev = stripColors.length - 1;
                else prev = colorIndex - 1;
                setOpacity(0, prev);

                setOpacity(1, colorIndex);
            }, time);
            break;
        case 7:
            var r = randomInt(strips.length);
            Tone.Draw.schedule(function (time) {
                setOpacity(1, r);
            }, time);
            Tone.Draw.schedule(function (time) {
                setOpacity(0, r);
            }, time + eighthNote / 2);
            break;
        case 'b':
            Tone.Draw.schedule(function (time) {
                setColor('black');
            }, time);
            break;
        case 100:
            // off
            Tone.Draw.schedule(function (time) {
                setColor('black');
                for (var i = 0; i < stripColors.length; i++) {
                    setOpacity(0, i);
                }
            }, time);
            break;
    }
}

/***************** POINTILLISTIC PATTERN *****************/
var pointOctave = 0;
var loopPoints = false;
var pointIndex = 0;
var pointValues = ["E6"];
var pointInterval = [eighthNote/2, eighthNote/2];
// var pointInterval = [quarterNote, halfNote+quarterNote];
function pointillistic(time) {
    if (loopPoints) {
        var randTime = random(pointInterval[0], pointInterval[1]);
        var note = pointValues[pointIndex++];
        pointIndex %= pointValues.length;
        var noteOct = Tone.Frequency(note).transpose(pointOctave);
        squareSynth.triggerAttackRelease(noteOct, 0.2, time, 0.9);
        var next = "+" + randTime;
        Tone.Transport.schedule(pointillistic, next);
    }
}
function pointillisticStart(time) {
    if (!loopPoints) {
        loopPoints = true;
        pointillistic(time);
    }
}
function pointillisticStop() {
    loopPoints = false;
}
// var pointillistic = new Tone.Pattern(function(time, note) {
//     var noteOct = Tone.Frequency(note).transpose(pointOctave);
//     squareSynth.triggerAttackRelease(noteOct, 0.2, time, 0.9);
// }, ["E6"], "up");
// pointillistic.interval = eighthNote/2;
// pointillistic.humanize = eighthNote/2;

// var motiveB = new Tone.Pattern(function (time, note) {
//     squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
//     Tone.Draw.schedule(function (time) {
//         var keys = Object.keys(colors);
//         var k = random(keys);
//         if ((motiveB.index % 3) == 0) setColor(k);
//     }, time);
//     colorIndex++;
//     colorIndex %= 4;

// }, ["F5", "Bb5", "Ab5"], "up");
// motiveB.interval = "16n";

// var motiveC = new Tone.Pattern(function (time, note) {
//     squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
//     Tone.Draw.schedule(function (time) {
//         var keys = Object.keys(colors);
//         var k = random(keys);
//         if ((motiveC.index % 5) == 0) setColor(k);
//     }, time);
// }, ["F5", "Db6", "Bb5", "Ab5", "Gb5"], "up");
// motiveC.interval = "16n";

// var motiveD = new Tone.Pattern(function (time, note) {
//     squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
//     Tone.Draw.schedule(function (time) {
//         var keys = Object.keys(colors);
//         keys.push("grey");
//         var k = random(keys);
//         setColor(k);
//     }, time);
// }, ["Eb4", "F4", "Gb4", "Ab4", "Bb4", "C5", "Db5", "Eb5", "F5", "Gb5", "Ab5", "Bb5", "C6", "Db6",
//         "Eb6", "F6", "Gb6", "Ab6", "Bb6", "C7", "Db7", "Eb7", "F7", "Gb7"], "randomOnce");
// // ["Eb3", "F3", "Gb3", "Ab3", "Bb3", "C4", "Db4", "Eb4", "F4", "Gb4", "Ab4", "Bb4", "C5", "Db5", "Eb5", "F5", "Gb5", "Ab5", "Bb5",
// //     "C6", "Db6", "Eb6", "F6", "Gb6", "Ab6", "Bb6", "C7", "Db7", "Eb7", "F7", "Gb7"]
// motiveD.interval = "16n";

// var descending16ths = new Tone.Pattern(function (time, note) {
//     squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
// }, ["E6", "F#6", "D6", "E6", "A5", "Bb5", "D6", "A5", "Bb5", "F#5", "E5", "A5", "F#5", "D5", "E5", "D5", "D5", "E5", "Bb4", "A4", "D5", "Bb4", "A4", "D5", "F#4", "A4", "Bb4", "F#4", "E4", "F#4", "A4", "E4"], "up");
var increment16ths = 0;
var sixteenthsIncrement = new Tone.Loop(function(time) {
    qRange16s += increment16ths;
}, "16n");

var descending16thsTWO = new Tone.Loop(function(time) {   
    var randIndex = randomInt(qRange16s-4, qRange16s);
    var note = qScale[randIndex];
    squareSynth.triggerAttackRelease(note, 0.09, time, 0.9);
}, "16n");



var descending16thsProb = 33;
var descending16ths = new Tone.Pattern(function (time, note) {
    if (descending16thsProb > 100) descending16thsProb = 100;
    var noteShift = note;
    var r = random(descending16thsProb-33, descending16thsProb);
    if (r < 33) {
        noteShift = note; // less than 33
    } else if (r < 66) { // between 33 and 66
        noteShift = Tone.Frequency(note).transpose(-12);
    } else { // greater than 66
        noteShift = Tone.Frequency(note).transpose(-24);
    }
    squareSynth.triggerAttackRelease(noteShift, 0.1, time, 0.9);

}, ["F#6", "E6", "D6", "Bb5", "A5"], "randomOnce");
descending16ths.interval = "16n";

var ascending16thsProb = 33;
var ascending16ths = new Tone.Pattern(function (time, note) {
    if (ascending16thsProb > 100) ascending16thsProb = 100;
    var noteShift = note;
    var r = random(ascending16thsProb-33, ascending16thsProb);
    if (r < 33) {
        noteShift = note;
    } else if (r < 66) {
        noteShift = Tone.Frequency(note).transpose(12);
    } else {
        noteShift = Tone.Frequency(note).transpose(24);
    }
    squareSynth.triggerAttackRelease(noteShift, 0.1, time, 0.9);
    drawingMotive(2, time);
}, ["E4", "F#4", "G4", "A4", "B4", "C#5", "D5"], "randomOnce");
ascending16ths.interval = "16n";

// var descending5 = new Tone.Pattern(function (time, note) {
    //     squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
    // }, ["E6", "F#6", "E6", "F#6", "D6", "E6", "A5", "D6", "Bb5", "A5", "D6", "Bb5", "F#5", "A5", "Bb5", "F#5", "A5", "E5", "F#5", "D5", "E5", "Bb4", "D5", "A4", "Bb4", "D5", "F#4", "A4", "Bb4", "A4", "F#4", "Bb4", "E4", "F#4", "D5", "Bb4", "A4", "F#4", "E4", "D4"], "up");
var descending5sProb = 33;
var descending5 = new Tone.Pattern(function (time, note) {
    if (descending5sProb > 100) descending5sProb = 100;
    var noteShift = note;
    var r = random(descending5sProb - 33, descending5sProb);
    if (r < 33) {
        noteShift = note; // less than 33
    } else if (r < 66) { // between 33 and 66
        noteShift = Tone.Frequency(note).transpose(-12);
    } else { // greater than 66
        noteShift = Tone.Frequency(note).transpose(-24);
    }
    squareSynth.triggerAttackRelease(noteShift, 0.1, time, 0.9);
    // squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
}, ["F#6", "E6", "D6", "Bb5", "A5"], "randomOnce");
descending5.interval = "4n/5";

// probably get rid of this later
var metronome = new Tone.Loop(function (time) {
    console.log("WTF?!?!");
    var note = "C6";
    if (random([0, 1])) note = "Bb5";
    squareSynth.triggerAttackRelease(note, 0.1, time, 0.9);
}, "16n");

var loopCrescPattern = false;
function crescendoPattern (time) {
    if (loopCrescPattern) {
        var randTime = random([quarterNote, quarterNote+eighthNote, halfNote, halfNote+eighthNote, halfNote+quarterNote, halfNote+quarterNote+eighthNote, wholeNote]);
        // synthGain.volume.setValueAtTime(-500, Tone.now());
        // synthGain.volume.linearRampToValueAtTime(0, (time + (randTime / 2)));
        // synthGain.volume.linearRampToValueAtTime(-500, time + randTime);
    
        var release = random([halfNote, halfNote+quarterNote, wholeNote]);
        squareWithLFO.triggerAttack("E6", time, 0.9);
        squareWithLFO.triggerRelease(time + release);

        // TODO: doesn't start right
        // drawing for this section
        drawingMotive(4, time);
        drawingMotive('b', time + release);
        // var r = randomInt(stripColors.length);
        // Tone.Draw.schedule(function (time) {
        //     setColor(stripColors[r]);
        // }, time);
        // Tone.Draw.schedule(function (time) {
        //     setColor('black');
        // }, time + release);

        var next = "+" + (randTime+release);
        Tone.Transport.schedule(crescendoPattern, next);
    }
}

function startCrescPattern(time) {
    if (!loopCrescPattern) {
        loopCrescPattern = true;
        crescendoPattern(time);
    }
}

function stopCrescPattern() {
    loopCrescPattern = false;
    synthGain.volume.setValueAtTime(0, Tone.now()); // do I need this? it may cause problems
    squareWithLFO.triggerRelease(Tone.now());
}

var meter = new Tone.Meter();

/************** synths **************/

var synthGain = new Tone.Volume();
var squareSynth = new Tone.Synth({
    "oscillator": {
        "type": "square", // maybe use pulse? "width" : 0.5,
        "volume": 3
    },
    "envelope": {
        "attack": 0.05, // 0.05
        "decay": 0.1,
        "sustain": 1,
        "release": 0.1
    }
});
squareSynth.chain(synthGain, meter, Tone.Master);

var synthLFOGain = new Tone.Volume();
var squareWithLFO = new Tone.Synth({
    "oscillator": {
        "type": "square",
        "volume": 3
    },
    "envelope": {
        "attack": 0.05, // 0.05
        "decay": 0.1,
        "sustain": 0.9,
        "release": 0.1
    }
});
squareWithLFO.chain(synthLFOGain, Tone.Master);

var lfo = new Tone.LFO({
    "frequency": "16n",
    "type": "square",
    "min": -100,
    "max": 3
}).sync().start();
lfo.connect(squareWithLFO.oscillator.volume);

var pulseWidthSynth = new Tone.Synth({
    "oscillator": {
        "type": "pulse", 
        "width" : 0.5,
        "volume": 3
    },
    "envelope": {
        "attack": 0.05, // 0.05
        "decay": 0.1,
        "sustain": 1,
        "release": 0.1
    }
});
pulseWidthSynth.chain(synthGain, Tone.Master);

/*****************************/
/********* functions *********/
/*****************************/

// delete these? I think i won't be using them
var stripOpacities = [0.1, 0.08, 0.06, 0.04, 0.02];
// var opacIncr = [0.01, 0.01, 0.01, 0.01, 0.01];
var startOpac = 0;
var opacIncr = -0.005;
var usingMeter = false;
function draw() {
    if (animate) requestAnimationFrame(draw);
    // document.body.style.backgroundColor = "hsl(" + colors[hue] + ", 100%, " + light + "%)";
    // light += incr;
    // if (light > 50 || light < 0) incr *= -1;

    for (var i = 0; i < strips.length; i++) {
        strips[i].style.opacity = startOpac;
    }

    if (usingMeter) {
        startOpac = meter.value;
    } else {
        startOpac += opacIncr;
    }

    if (startOpac < 0) startOpac = 0;
    if (startOpac > 1) startOpac = 1;
    
    // for (var i = 0; i < strips.length; i++) {
    //     var n = stripOpacities[i];
    //     if (n > 1 || n < 0) opacIncr[i] *= -1;
    //     strips[i].style.opacity = n;
    //     stripOpacities[i] += opacIncr[i];
    // }
}

/**********************************/
function startDraw() {
    animate = true;
    draw();
}

function stopDraw() {
    animate = false;
    light = backgroundLight;
}

function buttonAction() {
    // everything that needs to happen when you press start
    console.log("Connected");
    wrapper.remove();
    play = true;

    strips = document.getElementsByClassName("strip");
    console.log("length: " + strips.length);
    
    for (var i = 0; i < strips.length; i++) {
        strips[i].style.backgroundColor = stripColors[i];
        strips[i].style.opacity = "0.0";
    }

    noSleep.enable();

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
        withPresence: true
    });

    // if (random([0, 1])) {
    //     pattern.values = ["Eb4", "Db5", "F5", "Gb5"];
    // }

    // if (random([0, 1])) {
    //     pattern.values = ["Bb4", "Bb5"];
    //     pattern.pattern = "up";
    // }

    draw();
}

/************** helpers **************/

// function draw() {
// 	// this slowly animates background hue
// 	requestAnimationFrame(draw);
// 	document.body.style.backgroundColor = "hsl(" + backgroundHue + ", 100%, 50%)";
// 	if (play) backgroundHue += 0.1; backgroundHue % 360;
//
// 	// document.getElementsByTagName("p")[0].innerHTML = "audio context: " + Tone.now().toFixed(3);
//     // document.querySelector('p').textContent = Tone.now().toFixed(3);
//     var transport = Tone.Transport.seconds.toFixed(3);
//
//     // document.querySelector('span').textContent = "bars: " + Tone.Time(transport).toBarsBeatsSixteenths();
// }

function init() {
    StartAudioContext(Tone.context);
    // Tone.Master.volume.value = -500;
    Tone.Transport.timeSignature = [9, 8];
    Tone.Transport.bpm.value = 150;

    initTimeline();
    // Tone.Transport.start("+0.1");

    // delete? old?!?!
    // setColor("init");


    // backgroundHue = random(hues);
    // if (backgroundHue == 275) {
    //     backgroundLight = 43;
    //     light = 43;
    // }
    // document.body.style.backgroundColor = "hsl(" + backgroundHue + ", 100%, 0%)";
    // document.body.style.backgroundColor = "hsl(" + backgroundHue + ", 100%, 100%)";
    // document.body.style.backgroundColor = "rgb(255, 0, 0)";

    // create button
    startButton = document.createElement("button");
    startButton.onclick = buttonAction;
    text = document.createTextNode("Tap to connect");
    startButton.appendChild(text);
    startButton.className = "splash";
    wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "container";
    wrapper.appendChild(startButton);
    document.body.appendChild(wrapper);

    var s = 3.45;
    console.log("" + s + " seconds to notation: " + Tone.Time(s).toNotation());
    console.log("" + s + " seconds to Bars:Beats:Sixteenths: " + Tone.Time(s).toBarsBeatsSixteenths());
    console.log("random: " + random([0, 1, 2, 3], 10));
    console.log("shuffle: " + shuffle([1, 2, 3, 4]));

    Tone.Transport.on('start', score);

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

function cleanUp() {
    pubnub.unsubscribe({
        channels: ['JeremyMuller_Exajoule']
    });
}

function handleMessage(m) {
    console.log("start: " + m.message['start']);
    console.log("time: " + m.message['time']);

    var newBPM = m.message['tempo'];
    if (newBPM != Tone.Transport.bpm.value) {
        console.log("SHIT STAIN!!!");
        Tone.Transport.bpm.value = newBPM;
        initTimeline();
    }
    
    if (m.message['start'] == false) {
        Tone.Transport.stop();
    } else {
        var mm = m.message['time'];
        console.log("mm type: " + (typeof mm));
        if (Tone.Transport.state == "stopped") {
            Tone.Transport.start(Tone.now(), mm);
        } else {
            Tone.Transport.pause();
            Tone.Transport.start("+0.1", mm + 0.1);
            console.log("transport was paused and restarted");
        }
    }
}

function convertMM(mm) {
    // converts measure to correct number of seconds (since Tonejs can't accurately handle meter changes!!!!!! ARGH!!!)
    var totalSeconds = 0;
    if ((typeof mm) == 'string') mm = parseInt(mm); // check to make sure it's not a string
    for (var i = 0; i < (mm + countInBars); i++) {
        totalSeconds += timeline[i];
    }
    // totalSeconds += countInBars * m9_8;
    return totalSeconds;
}

function genSwell(startMM) {    
    Tone.Transport.scheduleOnce(function (time) {
        repeatID234Running = true;
        jumpOct = true;
        synthGain.volume.setValueAtTime(-12, time);
        synthGain.volume.linearRampToValueAtTime(0, time + m10_8 + halfNote + eighthNote);
        // synthGain.volume.linearRampToValueAtTime(-12, time + m10_8 + m10_8 + m10_8);
        // synthGain.volume.linearRampToValueAtTime(-12, time + m10_8 + halfNote + eighthNote);
    }, (convertMM(startMM) + 0.05)); // added offset so this triggers
    Tone.Transport.scheduleOnce(function (time) {
        // synthGain.volume.setValueAtTime(0, time);
        synthGain.volume.linearRampToValueAtTime(-12, time + m10_8 + halfNote + eighthNote);
    }, (convertMM(startMM) + m10_8 + halfNote + eighthNote));
    Tone.Transport.scheduleOnce(function (time) {
        repeatID234Running = false;
        jumpOct = false;
        // synthGain.volume.setValueAtTime(-3, time);
        synthGain.volume.linearRampToValueAtTime(-3, time + eighthNote/2);
    }, (convertMM(startMM) + m10_8 + m10_8 + m10_8));
}

// delete, unused
function linearRampSixteenths(duration) {
    // TODO: calculate the increment value
    var totalLength = qScale.length - qRange16s; // do I need length-1?
    var sixteenthNote = eighthNote / 2;
    var divTime = duration / sixteenthNote;
    increment16ths = totalLength / divTime;

    console.log("duration: " + duration);
    console.log("increment16ths: " + increment16ths);
    
    sixteenthsIncrement.start();
    // sixteenthsIncrement.stop(Tone.now() + duration);
}

// delete, unused
function quantizePitch(rawNote) {
    // returns quantized note
    for (var i = 0; i < qScale.length; i++) {
        var currentNote = Tone.Frequency(qScale[i]).toMidi();
        if (rawNote == currentNote) {
            return currentNote;
        } else if (rawNote < currentNote) {
            var prevNote = Tone.Frequency(qScale[i-1]).toMidi();
            var diffPrev = Math.abs(rawNote - prevNote);
            var diffCurrent = Math.abs(rawNote - currentNote);
            if (diffPrev < diffCurrent) {
                var prev = Tone.Frequency(prevNote, "midi").toNote();
                return prev;
            } else {
                var current = Tone.Frequency(currentNote, "midi").toNote();
                return current;
            }
        }
    }
}

function setColor(c) {
    if (c === "black") {
        document.body.style.backgroundColor = "#000000";
    } else {
        document.body.style.backgroundColor = c;
    }

}

function setOpacity(opac, index) {
    for (var i = 0; i < strips.length; i++) {
        if (i == index) strips[index].style.opacity = opac;
        else strips[i].style.opacity = 0;
    }
}

function linearOpacity(time, startDur, endDur) {
    if (endDur == undefined) {
        Tone.Draw.schedule(function (time) {
            startOpac = 1;
            startDraw();
        }, time);
        Tone.Draw.schedule(function (time) {
            stopDraw();
        }, time+startDur);
    } else {
        Tone.Draw.schedule(function (time) {
            startOpac = 0;
            startDraw();
            opacIncr = (1 / startDur) / 60; // assuming FPS is 60
        }, time);
        Tone.Draw.schedule(function (time) {
            startOpac = 1;
            opacIncr = -((1 / endDur) / 60); // assuming FPS is 60
        }, time + startDur);
    }
}

function stopPatterns() {
    ascending16ths.stop();
    descending16ths.stop();
    descending5.stop();
    motiveA.stop();
    motiveB.stop();
    motiveC.stop();
    motiveD.stop();
    motiveE.stop();
    motiveF.stop();
    motiveRandOctShift.stop();
    // pointillistic.stop();
    pointillisticStop();

    motiveA_8va.stop();
    motiveB_8va.stop();
    motiveB_15va.stop();

    // reset indeces
    motiveA.index = 0;
    motiveB.index = 0;
    motiveC.index = 0;
    motiveD.index = 0;
    motiveE.index = 0;
    motiveF.index = 0;
    motiveA_8va.index = 0;
    motiveB_8va.index = 0;
    motiveB_15va.index = 0;
    motiveRandOctShift.index = 0;
    // pointillistic.index = 0;
    pointIndex = 0;

    descending16ths.index = 0;
    descending5.index = 0;

}

function score() {

    // TODO! score isn't written yet, though
    // Tone.Transport.scheduleOnce(function (time) {
    //     motiveA.values = ["D7", "E7", "D7"];
    //     motiveA.interval = "16n";
    //     motiveB.values = ["D7", "E7", "C7", "E7", "D7"];
    //     motiveB.interval = "4n/5";
    //     random(100) < 50 ? motiveA.start() : motiveB.start();
    //     // motiveA.start();
    //     // motiveB.start();
    // }, "@1m");

    Tone.Transport.scheduleOnce(function (time) {
        console.log("mm 1");
        Tone.Draw.schedule(function (time) {
            setColor();
        }, "@1m");
        // startDraw();
        random(100) < 50 ? motiveA.start() : motiveB.start();
    }, convertMM(1));

    Tone.Transport.schedule(function (time) {
        console.log("mm 9");
        // Tone.Transport.timeSignature = [10, 8];
        stopPatterns();
        random(100) < 50 ? motiveC.start() : motiveD.start();
    }, convertMM(9)); // mm 9

    Tone.Transport.schedule(function (time) {
        console.log("mm 15");
        // Tone.Transport.timeSignature = [9, 8];
        stopPatterns();
        setOpacity(0, 0);
        if (random(100) < 50) {
            squareSynth.triggerAttack("D5", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8);
        } else {
            squareSynth.triggerAttack("D4", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8);
        }
    }, convertMM(15)); // mm 15

    Tone.Transport.schedule(function (time) {
        console.log("mm 16");
        drawRange[0] = -3;
        drawRange[1] = 3;
        random(100) < 50 ? motiveC.start() : motiveD.start();
    }, convertMM(16));

    Tone.Transport.schedule(function (time) {
        console.log("mm 25 + whole note");
        stopPatterns();
        // preparing
        motiveA.values = ["D5", "F#5", "C5", "C5", "F#5", "D5", "E5", "F#5", "C5"];
        motiveB.values = ["D3", "E3", "C3", "F#3", "E3", "D3"];
        if (random(100) < 50) {
            squareSynth.triggerAttack("C5", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + eighthNote);
        } else {
            squareSynth.triggerAttack("D4", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + eighthNote);
        }
    }, convertMM(25) + wholeNote); // "25m + 1n"

    Tone.Transport.schedule(function (time) {
        console.log("mm 27");
        drawRange[0] = -4;
        drawRange[1] = 4;
        // preparing
        motiveC.values = ["D3", "E3", "F#3", "C3", "E3", "D3", "D3", "E3", "C3", "F#3", "E3", "D3"];
        motiveC.index = 0;

        random(100) < 50 ? motiveA.start() : motiveB.start();
    }, convertMM(27)); // mm 27

    Tone.Transport.schedule(function (time) {
        console.log("mm 35");
        stopPatterns();
        // preparing
        motiveA.values = ["D4", "Bb3", "F#4", "C4", "C4", "F#4", "D4", "E4", "F#4", "C4"];
        motiveB.values = ["D4", "E4", "C4", "F#4", "Bb3", "E4", "D4", "Bb3", "D4", "E4", "C4", "F#4", "E4", "D4"];

        motiveC.start();
    }, convertMM(35));

    Tone.Transport.schedule(function (time) {
        console.log("mm 40");
        stopPatterns();
        drawRange[0] = 0;
        drawRange[1] = strips.length;
        // preparing
        motiveC.values = ["D3", "E3", "F#3", "C3", "E3", "D3", "Bb2", "D3", "E3", "C3", "F#3", "Bb2", "E3", "D3"];
        squareSynth.triggerAttack("D3", time, 0.9);
        squareSynth.triggerRelease(Tone.now() + m9_8);
    }, convertMM(40));

    if (random(100) < 50) {
        Tone.Transport.schedule(function (time) {
            console.log("mm 41");
            motiveA.start();
        }, convertMM(41));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            // preparing
            motiveA.values = ["D4", "Bb3", "G4", "F#4", "C4", "C4", "F#4", "D4", "E4", "F#4", "C4"];
            stopPatterns();
            squareSynth.triggerAttack("C4", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m10_8);
        }, (convertMM(50) + wholeNote));
        Tone.Transport.scheduleOnce(function (time) {
            motiveA.start();
        }, convertMM(52));
    } else {
        Tone.Transport.schedule(function (time) {
            console.log("mm 41");
            motiveB.start();
        }, convertMM(41));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            // preparing
            motiveB.values = ["D3", "E3", "C3", "F#3", "Bb2", "G3", "E3", "D3", "G3", "Bb2", "D3", "E3", "C3", "F#3", "E3", "D3"];
            stopPatterns();
            squareSynth.triggerAttack("D4", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + halfNote + quarterNote + eighthNote);
        }, (convertMM(50) + quarterNote));
        Tone.Transport.scheduleOnce(function (time) {
            motiveB.start();
        }, convertMM(52));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            var note = random(100) < 50 ? "G2" : "G3";
            squareSynth.triggerAttack(note, time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8);
            motiveB.index = 9;
        }, convertMM(55));
        Tone.Transport.scheduleOnce(function (time) {
            motiveB.start();
        }, convertMM(56));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            var note = random(100) < 50 ? "A2" : "A3";
            squareSynth.triggerAttack(note, time, 0.9);
            squareSynth.triggerRelease(Tone.now() + wholeNote + quarterNote);
            motiveB.index = 5;
        }, (convertMM(58) + halfNote + eighthNote));
        Tone.Transport.scheduleOnce(function (time) {
            motiveB.start();
        }, (convertMM(59) + halfNote + quarterNote));
    }

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        // preparing
        motiveA.values = ["D4", "Bb3", "G4", "F#4", "C4", "A3", "C4", "F#4", "D4", "E4", "A3", "F#4", "C4", "A3"];
        motiveB.values = ["D3", "E3", "C3", "F#3", "Bb2", "G3", "E3", "D3", "G3", "Bb2", "D3", "E3", "C3", "F#3", "E3", "D3"];

        motiveC.start();
    }, convertMM(60));

    if (random(100) < 50) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            currentDrawM = 2;
            motiveA.start();
        }, convertMM(68));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveA.index = 0;
            squareSynth.triggerAttack("A3", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + quarterNote + eighthNote);
        }, (convertMM(75) + halfNote + quarterNote));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveA.start();
        }, convertMM(77));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            // preparing
            motiveA.values = ["D5", "Bb4", "G5", "F#5", "C5", "A4", "A5", "C5", "F#5", "D5", "E5", "A4", "A5", "F#5", "C5", "A5", "A4", "F#4"];
            motiveB.values = ["D3", "E3", "C3", "F#3", "Bb2", "G3", "E3", "D3", "G3", "Bb2", "G2", "Bb3", "D3", "E3", "C3", "F#3", "E3", "D3"];

            squareSynth.triggerAttack("A3", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + m9_8);
        }, convertMM(92));
    } else {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            currentDrawM = 2;
            motiveB.start();
        }, convertMM(68));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            // preparing
            motiveB.values = ["D3", "E3", "C3", "F#3", "Bb2", "G3", "E3", "D3", "G3", "Bb2", "G2", "D3", "E3", "C3", "F#3", "E3", "D3"];
            motiveB.index = 0;

            squareSynth.triggerAttack("D3", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + halfNote + quarterNote);
        }, (convertMM(80) + quarterNote + eighthNote));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveB.start();
        }, convertMM(82));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            // preparing
            motiveA.values = ["D5", "Bb4", "G5", "F#5", "C5", "A4", "A5", "C5", "F#5", "D5", "E5", "A4", "A5", "F#5", "C5", "A5", "A4", "F#4"];
            motiveB.values = ["D3", "E3", "C3", "F#3", "Bb2", "G3", "E3", "D3", "G3", "Bb2", "G2", "Bb3", "D3", "E3", "C3", "F#3", "E3", "D3"];
            motiveB.index = 0;

            squareSynth.triggerAttack("D3", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + m9_8 + halfNote + quarterNote);
        }, (convertMM(91) + quarterNote + eighthNote));
    }

    if (random(100) < 50) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveA.start();
            currentDrawM = 1;
            // preparing
            motiveA_8va.values = motiveA.values;
        }, convertMM(94));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveA_8va.start();
            // preparing
            motiveA.values = ["D6", "D6", "E6"];
        }, convertMM(106));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveA.start();
            currentDrawM = 3;
            // preparing
            motiveA_8va.values = ["D6", "D6", "E6"];
        }, convertMM(114));
        Tone.Transport.scheduleOnce(function (time) {
            console.log("in mm 117");
            
            stopPatterns();
            motiveA_8va.start();
        }, (convertMM(117) + quarterNote + eighthNote));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            linearOpacity(time, m9_8+m9_8+eighthNote);
            // preparing 
            motiveA.values = ["E6", "E6", "F#6"];
            motiveA.interval = "16n";
            
            squareSynth.triggerAttack("E7", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + m9_8);

            synthGain.volume.setValueAtTime(0, Tone.now());
            synthGain.volume.linearRampToValueAtTime(-500, (time + m9_8 + m9_8));
        }, (convertMM(121) - eighthNote));
    } else {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveB.start();
            currentDrawM = 1;
            // preparing
            motiveB_8va.values = motiveB.values;
            motiveB_15va.values = motiveB.values;
        }, convertMM(94));
    
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveB_8va.start();
        }, convertMM(102));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveB.values = ["D5", "E5", "E5", "D5"];
            motiveB_15va.start();
        }, convertMM(108));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            motiveB.start();
            currentDrawM = 3;
        }, convertMM(112));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            linearOpacity(time, m9_8 + m9_8 + eighthNote);
            // preparing
            motiveA.values = ["E6", "E6", "F#6"];
            motiveA.interval = "16n";

            squareSynth.triggerAttack("D5", time, 0.9);
            squareSynth.triggerRelease(Tone.now() + m9_8 + m9_8);

            synthGain.volume.setValueAtTime(0, Tone.now());
            synthGain.volume.linearRampToValueAtTime(-500, (time + m9_8 + m9_8));
        }, (convertMM(121) - eighthNote));
    }


    Tone.Transport.scheduleOnce(function (time) {
        console.log("mm 123 in 4/4");
        stopPatterns();
        currentDrawM = 100;

        squareSynth.triggerRelease(time); // just in case

        synthLFOGain.volume.setValueAtTime(-12, time);
        squareWithLFO.triggerAttack("E6", time, 0.9);
        // squareWithLFO.triggerRelease(Tone.now() + m4_4 + m4_4 + m4_4);

        synthGain.volume.setValueAtTime(0, time);
        startCrescPattern(time + random([quarterNote, quarterNote+eighthNote, halfNote, halfNote+eighthNote]));

        // motiveRandOctShift.start();

        // motiveA.start();
        // var l = motiveRandOctShift.values.length;
        // motiveRandOctShift.index = randomInt(l);
    
        // preparing
        // motiveB.values = [];
        // motiveB.interval = "16n/5";
    }, convertMM(123));
    Tone.Transport.scheduleOnce(function (time) {
        stopCrescPattern();
        // synthLFOGain.volume.value = -12;
        motiveRandOctShift.start();
    }, convertMM(132));
    Tone.Transport.scheduleOnce(function (time) {
        synthLFOGain.volume.setValueAtTime(-12, time);
        synthLFOGain.volume.linearRampToValueAtTime(0, time + m4_4);
    }, convertMM(137));
    Tone.Transport.scheduleOnce(function (time) {
        // stopPatterns();
        // new notes
        motiveRandOctShift.values = ["E6", "F#6", "D6", "F#6", "E6"];
        motiveRandOctShift.index = 0;
    }, convertMM(138));

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        drawingMotive('b', time);
        // preparing
        motiveRandOctShift.values = ["E6", "E6", "F#6"];
        motiveRandOctShift.index = 0;

        synthGain.volume.setValueAtTime(-36, Tone.now());
        synthGain.volume.linearRampToValueAtTime(0, (time + m9_8 + m9_8));
        Math.random() < 0.5 ? descending5.start() : descending16ths.start();
        // descending5.start();
    }, convertMM(146));
    Tone.Transport.scheduleRepeat(function (time) {
        descending16thsProb += 1.8611111111111112;
        descending5sProb += 1.8611111111111112;
    }, eighthNote/2, convertMM(146), (m9_8 + m9_8));

    Tone.Transport.scheduleOnce(function (time) {
        descending16thsTWO.stop();
        stopPatterns();
        descending16thsProb = 33;
        descending5sProb = 33;
        synthLFOGain.volume.setValueAtTime(-12, time);
        motiveRandOctShiftProb = 0.05; // 5% probability
        motiveRandOctShift.start();
    }, convertMM(148));
    Tone.Transport.scheduleOnce(function (time) {
        // new notes
        motiveRandOctShift.values = ["E6", "F#6", "D6", "F#6", "E6"];
        motiveRandOctShift.index = 0;
    }, convertMM(160));
    Tone.Transport.scheduleOnce(function (time) {
        synthLFOGain.volume.setValueAtTime(-12, time);
        synthLFOGain.volume.linearRampToValueAtTime(0, time + m4_4 + m4_4);
    }, convertMM(168));
    Tone.Transport.scheduleOnce(function (time) {
        // new notes
        motiveRandOctShift.values = ["E6", "F#6", "A6", "D6", "F#6", "E6", "E6", "F#6", "D6", "A6", "F#6", "E6"];
        motiveRandOctShift.index = 0;
    }, convertMM(170));

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        drawingMotive('b', time);
        // preparing
        motiveRandOctShift.values = ["E6", "F#6", "D6", "F#6", "E6"];
        motiveRandOctShift.index = 0;

        synthGain.volume.setValueAtTime(-36, Tone.now());
        synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4 + m4_4));
        Math.random() < 0.5 ? descending5.start() : descending16ths.start();
        // descending5.start();
    }, convertMM(178));
    Tone.Transport.scheduleRepeat(function (time) {
        // TODO: I might make this in a separate function to calculate the linear increase
        descending16thsProb += 1.3958333333333333;
        descending5sProb += 1.3958333333333333;
    }, eighthNote/2, convertMM(178), (m4_4 + m4_4 + m4_4));
    Tone.Transport.scheduleOnce(function (time) {
        // ["F#6", "E6", "D6", "Bb5", "A5"]
        // ["F#6", "D6", "C#6", "B5", "G5"]
        descending5.values = ["F#6", "D6", "C#6", "B5", "G5"];
        descending16ths.values = ["F#6", "D6", "C#6", "B5", "G5"];
    }, convertMM(179) + halfNote);
    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        currentDrawM = 6;
        descending16thsProb = 33;
        descending5sProb = 33;
        synthLFOGain.volume.setValueAtTime(-6, time);
        motiveRandOctShiftProb = 0.1; // 10% probability
        motiveRandOctShift.start();
    }, convertMM(181));
    
    var tempR = Math.random();
    if (tempR < 1/3) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            synthGain.volume.setValueAtTime(-12, time);
            synthGain.volume.linearRampToValueAtTime(0, time + m4_4 + m4_4 + m4_4);
            synthGain.volume.linearRampToValueAtTime(-12, time + m4_4 + m4_4 + m4_4 + m4_4 + m4_4 + m4_4);
            motiveE.start();
        }, convertMM(185));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            motiveRandOctShift.start();
        }, convertMM(191));
    } else if (tempR < 2/3) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            synthGain.volume.setValueAtTime(-12, time);
            synthGain.volume.linearRampToValueAtTime(0, time + m4_4 + m4_4 + m4_4);
            synthGain.volume.linearRampToValueAtTime(-12, time + m4_4 + m4_4 + m4_4 + m4_4 + m4_4 + m4_4);
            motiveF.start();
        }, convertMM(190));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            motiveRandOctShift.start();
        }, convertMM(196));
    }
    Tone.Transport.scheduleOnce(function (time) {
        // preparing
        motiveE.values = ["F#4", "D5", "G5", "G4", "C5", "A5", "G4", "C5", "D5", "G5"];
        motiveF.values = ["G4", "D5", "G5", "A4", "C5", "B5", "A4", "C5", "D5", "G5"];
        motiveF.interval = "16n";

        motiveB.values = ["D4", "D5", "G5", "G4", "C5", "C6", "G4", "C5", "D5", "G5"];
        motiveC.values = ["C4", "C5", "G5", "D4", "A4", "A5", "D4", "A4", "C5", "G5"];
        motiveB.interval = "16n";
        motiveC.interval = "16n";
    }, convertMM(200));

    Tone.Transport.scheduleOnce(function (time) {
        // new notes
        motiveRandOctShift.values = ["E6", "F#6", "A6", "D6", "F#6", "E6", "E6", "F#6", "D6", "A6", "F#6", "E6"];
        motiveRandOctShift.index = 0;
    }, convertMM(201));
    tempR = Math.random();
    if (tempR < 1/3) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            synthGain.volume.setValueAtTime(0, time);
            motiveE.start();
        }, convertMM(201));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.setValueAtTime(0, time);
            synthGain.volume.linearRampToValueAtTime(-12, time + m4_4 + m4_4 + m4_4);
        }, convertMM(212));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            motiveB.start();
            synthGain.volume.linearRampToValueAtTime(0, time + m4_4 + m4_4 + m4_4);
        }, convertMM(215));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.setValueAtTime(0, time);
            synthGain.volume.linearRampToValueAtTime(-12, time + m4_4 + m4_4);
        }, convertMM(223));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            motiveRandOctShift.index = 0; // TODO: will this continue or no?
            motiveRandOctShift.start();
        }, convertMM(225));
    } else if (tempR < 2/3) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            synthGain.volume.setValueAtTime(-6, time);
            synthGain.volume.linearRampToValueAtTime(0, time + m4_4);
            motiveF.start();
        }, convertMM(203));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.setValueAtTime(0, time);
            synthGain.volume.linearRampToValueAtTime(-6, time + m4_4 + m4_4 + m4_4 + m4_4);
        }, convertMM(212));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            motiveC.start();
            synthGain.volume.linearRampToValueAtTime(0, time + m4_4 + m4_4);

            // motiveRandOctShift.start();
        }, convertMM(216));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.setValueAtTime(0, time);
            // synthGain.volume.linearRampToValueAtTime(12, time + m4_4);
            synthGain.volume.exponentialRampToValueAtTime(12, time + m4_4);
        }, convertMM(230));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
        }, convertMM(231));
    }

    // if (Math.random() < 0.5) {
    //     Tone.Transport.scheduleOnce(function (time) {
    //         stopPatterns();
    //         drawingMotive(100, time);
    //         synthGain.volume.setValueAtTime(0, time);
    //         // motiveRandOctShift.values = ["E6", "E6", "E6", "E6", "E6", "E6", "D6", "D6", "D6", "D6", "D6", "D6"];
    //         motiveRandOctShift.values = augPattern;
    //         motiveRandOctShift.index = 0;
    //         motiveRandOctShift.start();
    //     }, convertMM(231));
    // } else {
    //     Tone.Transport.scheduleOnce(function (time) {
    //         stopPatterns();
    //         drawingMotive(100, time);
    //         synthGain.volume.setValueAtTime(0, time);
    //         var rTime = random([0, "+8n", "+4n", "+4n+8n", "+2n", "+2n+4n", "+1n"]);
    //         console.log("rTime: " + rTime);
    //         motiveDescending.start(rTime);
    //     }, convertMM(231));
    // }
    /********** */

    if (Math.random() < 0.5) {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            synthGain.volume.setValueAtTime(0, time);
            // motiveRandOctShift.values = ["E6", "E6", "E6", "E6", "E6", "E6", "D6", "D6", "D6", "D6", "D6", "D6"];
            motiveRandOctShift.values = augPattern;
            motiveRandOctShift.index = 0;
            motiveRandOctShift.start();
        }, convertMM(231));

        // Tone.Transport.scheduleOnce(function (time) {
        //     motiveDescending.stop();
        //     // new notes
        //     synthLFOGain.volume.setValueAtTime(0, time);
        //     // motiveRandOctShift.values = ["E6", "F#6", "A6", "D6", "F#6", "E6", "B5", "E6", "F#6", "D6", "A6", "B5", "F#6", "E6"];
        //     // motiveRandOctShift.index = 0;
        //     motiveRandOctShift.start();
        // }, convertMM(248));
    } else {
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            synthGain.volume.setValueAtTime(0, time);
            var rTime = random([0, "+8n", "+4n", "+4n+8n", "+2n", "+2n+4n", "+1n"]);
            console.log("rTime: " + rTime);
            motiveDescending.start(rTime);
        }, convertMM(231));
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            drawingMotive(100, time);
            motiveDescending.stop();
            synthGain.volume.setValueAtTime(-3, Tone.now());
            ascending16ths.start();
        }, convertMM(248));
        Tone.Transport.scheduleRepeat(function (time) {
            ascending16thsProb += 2.09375;
        }, eighthNote/2, convertMM(248), (m4_4 + m4_4));
        Tone.Transport.scheduleOnce(function (time) {
            ascending16thsProb = 33;
        }, convertMM(250));
        Tone.Transport.scheduleRepeat(function (time) {
            ascending16thsProb += 2.09375;
        }, eighthNote / 2, convertMM(250), (m4_4 + m4_4));
        Tone.Transport.scheduleOnce(function (time) {
            ascending16thsProb = 33;
        }, convertMM(252));
        Tone.Transport.scheduleRepeat(function (time) {
            ascending16thsProb += 2.09375;
        }, eighthNote / 2, convertMM(252), (m4_4 + m4_4));
    }

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        drawingMotive(100, time);

        synthGain.volume.setValueAtTime(-36, time);
        synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4 + m4_4));
        Math.random() < 0.5 ? descending5.start() : descending16ths.start();
        // descending5.start();
    }, convertMM(254));
    Tone.Transport.scheduleRepeat(function (time) {
        // TODO: I might make this in a separate function to calculate the linear increase
        descending16thsProb += 1.3958333333333333;
        descending5sProb += 1.3958333333333333;
    }, eighthNote/2, convertMM(254), (m4_4 + m4_4 + m4_4));
    Tone.Transport.scheduleOnce(function (time) {
        // synthGain.volume.setValueAtTime(-6, time);
        synthGain.volume.setValueAtTime(-36, time);
        synthGain.volume.linearRampToValueAtTime(0, (time + m10_8 + m10_8 + m10_8 + m10_8));
        descending16thsProb = 33;
        descending5sProb = 33;
    }, convertMM(257));
    Tone.Transport.scheduleRepeat(function (time) {
        descending16thsProb += 2.09375;
        descending5sProb += 2.09375;
    }, eighthNote/2, convertMM(257), (m4_4 + m4_4));
    Tone.Transport.scheduleOnce(function (time) {
        descending16thsProb = 33;
        descending5sProb = 33;
    }, convertMM(259));
    Tone.Transport.scheduleRepeat(function (time) {
        descending16thsProb += 2.09375;
        descending5sProb += 2.09375;
    }, eighthNote/2, convertMM(259), (m4_4 + m4_4));
    Tone.Transport.scheduleOnce(function (time) {
        // preparing
        motiveE.values = ["G3", "C#4", "F#4", "B3", "D4", "G4", "B3", "D4", "C#4", "F#4"];
        motiveF.values = ["A4", "B3", "D4", "C#4", "F#4", "G3"];
        motiveF.interval = "4n/5";
        motiveD.values = ["A3", "D4", "C#4", "F#4"]; // 6tuplet
        motiveD.interval = "16t";

        descending16thsProb = 33;
        descending5sProb = 33;

        synthGain.volume.setValueAtTime(0, time);
        synthGain.volume.linearRampToValueAtTime(-6, (time + m10_8 + m10_8));
    }, convertMM(261));
    Tone.Transport.scheduleRepeat(function (time) {
        descending16thsProb += 2.09375;
        descending5sProb += 2.09375;
    }, eighthNote/2, convertMM(261), (m4_4 + m4_4));
    var randPoint = random([0,1,2]);
    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        drawingMotive(100, time);
        currentDrawM = 2;
        switch (randPoint) {
            case 0:
                motiveE.start();
                // pointillistic.values = motiveE.values;
                pointValues = motiveE.values;
                break;
            case 1:
                motiveF.start();
                // pointillistic.values = motiveF.values;
                pointValues = motiveF.values;
                break;
            case 2:
                motiveD.start();
                // pointillistic.values = motiveD.values;
                pointValues = motiveD.values;
                break;
        }
    }, convertMM(263));

    var mmIndex = 269;
    var repeatID234 = Tone.Transport.scheduleRepeat(function(time) {
        console.log("REPEAT EVENT: 269");
        
        if (Math.random() < 0.1 && !repeatID234Running) { // 10% chance
            console.log("IT WAS TRIGGERED!!");
            genSwell(mmIndex);
        }
        mmIndex++;
    }, m10_8, convertMM(269));

    Tone.Transport.scheduleOnce(function (time) {
        Tone.Transport.clear(repeatID234);
    }, convertMM(290));

    if (randPoint == 2) {
        var repeatID258 = Tone.Transport.scheduleRepeat(function (time) {
            console.log("REPEAT EVENT: 293, randPoint: " + randPoint);
            if (motivesProb < 0) {
                motivesProb = 0;
                Tone.Transport.clear(repeatID258);
            } else {
                motivesProb -= 0.1;
            }
        }, m4_4, convertMM(293));
    } else if (randPoint == 1) {
        var repeatID261 = Tone.Transport.scheduleRepeat(function (time) {
            console.log("REPEAT EVENT: 296, randPoint: " + randPoint);
            if (motivesProb < 0) {
                motivesProb = 0;
                Tone.Transport.clear(repeatID261);
            } else {
                motivesProb -= 0.1;
            }
        }, m4_4, convertMM(296));
    } else {
        var repeatID264 = Tone.Transport.scheduleRepeat(function (time) {
            console.log("REPEAT EVENT: 299, randPoint: " + randPoint);
            if (motivesProb < 0) {
                motivesProb = 0;
                Tone.Transport.clear(repeatID264);
            } else {
                motivesProb -= 0.1;
            }
        }, m4_4, convertMM(299));
    }

    /******** TODO: not sure about this section **************/
    // Tone.Transport.scheduleOnce(function (time) {
    //     pointInterval[0] = eighthNote/2;
    //     pointInterval[1] = eighthNote + eighthNote/2;
    //     // pointillistic.interval = eighthNote;
    //     // pointillistic.humanize = eighthNote/2;
    // }, convertMM(270));
    // Tone.Transport.scheduleOnce(function (time) {
    //     pointInterval[0] = quarterNote - eighthNote/2;
    //     pointInterval[1] = quarterNote + eighthNote/2 ;
    //     // pointillistic.interval = quarterNote;
    // }, convertMM(273));
    // Tone.Transport.scheduleOnce(function (time) {
    //     pointInterval[0] = halfNote - quarterNote;
    //     pointInterval[0] = halfNote + quarterNote;
    //     // pointillistic.interval = halfNote;
    //     // pointillistic.humanize = quarterNote;
    // }, convertMM(276));

    // var repeatID276 = Tone.Transport.scheduleRepeat(function (time) {
    //     console.log("REPEAT EVENT: 276");

    //     pointOctave = random([0, 12, 24, 36]);
    // }, (m4_4+m4_4), convertMM(276));
    /******** ******************************* **************/



    /************ updated *************/

    var longtones = false;
    if (Math.random() < 0.4) { // 40%
        longtones = true;
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            var note = Math.random() < 0.5 ? "G3" : "A3";
            squareSynth.triggerAttack(note, time, 0.9);
            squareSynth.triggerRelease(m4_4 * 3);
    
            synthGain.volume.setValueAtTime(-100, time);
            synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4));
            usingMeter = true;
            startDraw();
        }, convertMM(308));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4));
        }, convertMM(310));

        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            var note = Math.random() < 0.5 ? "A2" : "D3";
            squareSynth.triggerAttack(note, time, 0.9);
            squareSynth.triggerRelease(m4_4 * 3);

            synthGain.volume.setValueAtTime(-100, time);
            synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4));
            usingMeter = true;
            startDraw();
        }, convertMM(315));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4));
        }, convertMM(317));
    } else {
        Tone.Transport.scheduleOnce(function (time) {
            if (Math.random() < 0.5) pointOctave = 36;
        }, convertMM(308));
        Tone.Transport.scheduleOnce(function (time) {
            pointOctave = 36;
        }, convertMM(315));
    }

    if (longtones || Math.random() < (1/3)) { // 60% of remaining population
        longtones = true;
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            var note = Math.random() < 0.5 ? "G2" : "A2";
            squareSynth.triggerAttack(note, time, 0.9);
            squareSynth.triggerRelease(m4_4 * 4);
    
            synthGain.volume.setValueAtTime(-100, time);
            synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4));
            usingMeter = true;
            startDraw();
        }, convertMM(323));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4 + m4_4));
        }, convertMM(325));
    }

    if (longtones || Math.random() < 0.5) { // 80% of remaining population
        longtones = true;
        Tone.Transport.scheduleOnce(function (time) {
            stopPatterns();
            var note = Math.random() < 0.5 ? "D2" : "A2";
            squareSynth.triggerAttack(note, time, 0.9);
            squareSynth.triggerRelease(m4_4 * 5);
            synthGain.volume.setValueAtTime(-100, time);
            synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4 + m4_4));
            usingMeter = true;
            startDraw();
        }, convertMM(330));
        Tone.Transport.scheduleOnce(function (time) {
            synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4 + m4_4));
        }, convertMM(333));
    }

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        var note = Math.random() < 0.5 ? "D2" : "G2";
        squareSynth.triggerAttack(note, time, 0.9);
        squareSynth.triggerRelease(m4_4 * 6);
        synthGain.volume.setValueAtTime(-100, time);
        synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4 + m4_4));
        usingMeter = true;
        startDraw();
    }, convertMM(340));
    Tone.Transport.scheduleOnce(function (time) {
        synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4 + m4_4 + m4_4));
    }, convertMM(343));

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        var note = Math.random() < 0.5 ? "D2" : "E2";
        squareSynth.triggerAttack(note, time, 0.9);
        squareSynth.triggerRelease(m4_4 * 6);
        synthGain.volume.setValueAtTime(-100, time);
        synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4 + m4_4));
    }, convertMM(350));
    Tone.Transport.scheduleOnce(function (time) {
        synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4 + m4_4 + m4_4));
    }, convertMM(353));

    Tone.Transport.scheduleOnce(function (time) {
        stopPatterns();
        squareSynth.triggerAttack("A1", time, 0.9);
        squareSynth.triggerRelease(m4_4 * 6);
        synthGain.volume.setValueAtTime(-100, time);
        synthGain.volume.linearRampToValueAtTime(0, (time + m4_4 + m4_4 + m4_4));
    }, convertMM(360));
    Tone.Transport.scheduleOnce(function (time) {
        synthGain.volume.linearRampToValueAtTime(-100, (time + m4_4 + m4_4 + m4_4));
    }, convertMM(363));







    // Tone.Transport.scheduleOnce(function (time) {
    //     console.log("STOP!!");
    //     Tone.Draw.schedule(function (time) {
    //         setColor("black");
    //     }, time);
    //     Tone.Transport.stop(time+0.1);
    // }, "313m");
}