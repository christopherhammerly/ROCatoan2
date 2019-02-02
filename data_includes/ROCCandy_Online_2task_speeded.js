// ROCOUT - 6 point online rating version
// Implements word by word presentation, with 6 point judgment scale at the end
// (a modified version of van Dyke & Lewis (2003) methodology)

// Asserts breaks every 12 items.

var showProgressBar = false;

// Main shuffleSequence definition
var shuffleSequence = seq(
//  'consent',
    'setcounter',
    //'intro',
    //'prepractice',
    'practice',
    sepWith("timeoutSep", rshuffle(startsWith('ROC'),startsWith('f'))),
    'debrief',
//  'exit'
    );

// Variable definitions.
var DS = 'EPDashedAcceptabilityJudgment';

//var DS = 'EPDashedAcceptabilityJudgment';

//  Set the Prolific Academic Completion URL
var sendingResultsMessage = "Please wait. Your data are being sent to the server."; 
var completionMessage = "Thank you for your participation. Your completion code is ASRJCD6V. To complete this experiment, go to: https://app.prolific.ac/submissions/complete?cc=ASRJCD6V."; 
var completionErrorMessage = "There was an error in sending your data to the server. You may still complete this experiment. Your completion code is ASRJCD6V. Please go to: https://app.prolific.ac/submissions/complete?cc=ASRJCD6V."; 


// Controller settings.
var defaults = [
    "EPDashedSentence", {
        mode: 'speeded acceptability',
        display: 'in place',
        blankText: '+',
        wordTime: 1000,
        wordPauseTime: 150
        },
    DS, {q: 'Is that sentence grammatical (J) or ungrammatical (K)?',
        as: [['j','Gram'],['k','Ungramm']],
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
            ro[i].push(new DynamicElement(
                "Separator",
                {transfer: 2500, normalMessage: "Hands in place! Your first sentence of this block will start soon."},
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
                           ["p", "Let's try the first practice item. After clicking the link you should get your hands reading. Your right hand will be on 'J' and 'K' (pointer finger on 'J' and middle finger on 'K') and your left hand on the '1-3' keys"]
                         ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],


["practice", "EPDashedSentence", {s:"+"}, DS, {s: "I know those cats was..."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],

["practice", Message, {consentRequired: false,
                  html: ["div",
                          ["p", "How was that? That item is one that some, but not all, English speakers judge to be ungrammatical."],
                          ["p", "Let's try another one."]
                        ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],

["practice", "EPDashedSentence", {s:"+"}, DS, {s: "I saw the students were..."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],

["practice", Message, {consentRequired: false,
                  html: ["div",
                          ["p", "That probably felt different than the last one. Many English speakers judge that last sentence to be grammatical. "],
                          ["p", "Now let's try a few in a row. These will be longer, and more similar to the ones you'll see in the experiment"]
                        ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],

["practice", "EPDashedSentence", {s:"+"}, DS, {s: "The prince waltzed with every girl who he are..."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],
["practice", "EPDashedSentence", {s:"+"}, DS, {s: "Geoffrey turned and screamed at the waiter who the customers always is..."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],
["practice", "EPDashedSentence", {s:"+"}, DS, {s: "John sat up all night worrying about her son who is..."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],

["practice", Message, {consentRequired: false,
                  html: ["div",
                          ["p", "Alright, that's it for practice!"],
                          ["p", "Hit any key when you're ready to begin, and please pay attention throughout the experiment. Have Fun!"]
                        ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],

[["ROCCandy-MisMatch",1], "EPDashedSentence", {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistants who the manager supervises."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",1], "EPDashedSentence", {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistant who the manager supervise."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",1], "EPDashedSentence", {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistants who the manager supervise."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",1], "EPDashedSentence", {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistant who the manager supervises."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],


[["f-GoodFillSingular",900], "EPDashedSentence", {s:"+"}, DS, {s:"For her daughter's birthday party, Alice hired the magician who the clown assists."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",901], "EPDashedSentence", {s:"+"}, DS, {s:"During his speech at the high school, Brad called out the students who the teacher heckles."},Question,{q: 'Please rate your confidence',as: ['Not at all confident','Somewhat confident','Very confident'],randomOrder: false,presentHorizontally: false}]


];
