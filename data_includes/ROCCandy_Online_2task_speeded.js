// ROCOUT - 6 point online rating version
// Implements word by word presentation, with 6 point judgment scale at the end
// (a modified version of van Dyke & Lewis (2003) methodology)

// Asserts breaks every 12 items.

var showProgressBar = false;

// Main shuffleSequence definition
var shuffleSequence = seq(
//  'consent',
    'setcounter',
    'intro',
    'prepractice',
    'practice',
    sepWith("timeoutSep", rshuffle(startsWith('ROC'),startsWith('f'))),
    'debrief',
    'exit');

// Variable definitions.
var DS = 'EPDashedAcceptabilityJudgment';

// Controller settings.
var defaults = [
    DS, {q: 'Is that sentence grammatical?',
        as: [['s','Yes'],['k','No']],
        randomOrder: false,
        presentHorizontally: true,
        mode: 'speeded acceptability',
        display: 'in place',
        blankText: '+',
        wordTime: 225,
        wordPauseTime: 100,
        timeout: 2000}
];
//
//var defaults = [
//    "EPDashedSentence", {
//        mode: 'speeded acceptability',
//        display: 'in place',
//        blankText: '+',
//        wordTime: 1000,
//        wordPauseTime: 150
//        },
//    DS, {q: 'Is that sentence grammatical?',
//        as: [['s','Yes'],['k','No']],
//        randomOrder: false,
//        presentHorizontally: true,
//        mode: 'speeded acceptability',
//        display: 'in place',
//        blankText: '+',
//        wordTime: 225,
//        wordPauseTime: 100,
//        timeout: 2000}
//];

// Add breaks every 12 items
function modifyRunningOrder(ro)
{
    for (var i = 0; i < ro.length; ++i)
    {
        if (i % 12 == 10
            && i > 13
            && i < 200)
        {
            ro[i].push(new DynamicElement(
                "Message",
                {html: "<p>Please take a short break. Press a button to continue when you're ready.</p>", transfer: "keypress"},
            true));
        }
    }
    return ro;
}

// Items array.
var items = [

["setcounter", "__SetCounter__", { }],
["timeoutSep", Separator, { transfer: 250, normalMessage: "", errorMessage: "Timed out. Please respond more quickly."}],

["consent", "Form", {consentRequired: true, html: {include: "consent.html"}}],
["intro", "SSForm", {consentRequired: true, html: {include: "intro.html"}}],
["debrief", "Form", {consentRequired: true, html: {include: "debrief.html"}}],
["exit", "Form", {consentRequired: true, html: {include: "exit.html"}}],

["prepractice", "Form", {consentRequired: true, html: {include: "practice1.html"}}],
["prepractice", "Form", {consentRequired: true, html: {include: "practice2.html"}}],
["prepractice", "Form", {consentRequired: true, html: {include: "practice3.html"}}],

["practice", Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Let's try one practice item."]
                         ]}],


["practice", Separator, { transfer: 1000, normalMessage: "+"}],
["practice", DS, {s: "Those cats was snoring loudly."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

//["practice", Message, {consentRequired: false,
//                   html: ["div",
//                           ["p", "How was that? That item is one that some, but not all, English speakers judge to be ungrammatical. "],
//                           ["p", "Let's try some more."]
//                         ]}],
//
//["practice", Separator, { transfer: 1000, normalMessage: "+"}, DS, {s: "At the ball, the prince waltzed with every girl before midnight."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
//["practice", Separator, { transfer: 1000, normalMessage: "+"}, DS, {s: "Without warning, Geoffrey turned and screamed at the waiter who embarrassed itself."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
//["practice", Separator, { transfer: 1000, normalMessage: "+"}, DS, {s: "Madame de Plessy sat up all night worrying about her son, who was fighting the invaders."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
//
//["practice", Message, {consentRequired: false,
//                   html: ["div",
//                           ["p", "Alright, that's it for practice!"],
//                           ["p", "Hit any key when you're ready to begin, and please pay attention throughout the experiment. Have Fun!"]
//                         ]}],
//
//["practice", Separator, { transfer: 1000, normalMessage: "+"}],

[["ROCCandy-MisMatch",1], DS, {s:"At the meeting, Belinda greeted the assistants who the manager supervises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",1], DS, {s:"At the meeting, Belinda greeted the assistant who the manager supervise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",1], DS, {s:"At the meeting, Belinda greeted the assistants who the manager supervise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",1], DS, {s:"At the meeting, Belinda greeted the assistant who the manager supervises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],


[["f-GoodFillSingular",900], DS, {s:"For her daughter's birthday party, Alice hired the magician who the clown assists."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",901], DS, {s:"During his speech at the high school, Brad called out the students who the teacher heckles."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}]


];
