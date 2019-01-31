// ROCOUT - 6 point online rating version
// Implements word by word presentation, with 6 point judgment scale at the end
// (a modified version of van Dyke & Lewis (2003) methodology)

// Asserts breaks every 12 items.

var showProgressBar = false;

// Main shuffleSequence definition
var shuffleSequence = seq(
//  'consent',
    'setcounter',
//    'intro',
    'prepractice',
    'practice',
    sepWith("timeoutSep", rshuffle(startsWith('ROC'),startsWith('f'))),
    'debrief',
    'exit');

// Variable definitions.
var DS = 'DashedAcceptabilityJudgment';

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
["timeoutSep", Separator, { transfer: 1000, normalMessage: "", errorMessage: "Timed out. Please respond more quickly."}],

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


["practice", "EPDashedSentence", {s:"+"}, DS, {s: "Those cats was snoring loudly."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

["practice", Message, {consentRequired: false,
                   html: ["div",
                           ["p", "How was that? That item is one that some, but not all, English speakers judge to be ungrammatical. "],
                           ["p", "Let's try some more."]
                         ]}],

["practice", Separator, { transfer: 1000, normalMessage: "+"}, DS, {s: "At the ball, the prince waltzed with every girl before midnight."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
["practice", Separator, { transfer: 1000, normalMessage: "+"}, DS, {s: "Without warning, Geoffrey turned and screamed at the waiter who embarrassed itself."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
["practice", Separator, { transfer: 1000, normalMessage: "+"}, DS, {s: "Madame de Plessy sat up all night worrying about her son, who was fighting the invaders."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

["practice", Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Alright, that's it for practice!"],
                           ["p", "Hit any key when you're ready to begin, and please pay attention throughout the experiment. Have Fun!"]
                         ]}],

["practice", Separator, { transfer: 1000, normalMessage: "+"}],

[["ROCCandy-MisMatch",1], DS, {s:"At the meeting, Belinda greeted the assistants who the manager supervises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",1], DS, {s:"At the meeting, Belinda greeted the assistant who the manager supervise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",1], DS, {s:"At the meeting, Belinda greeted the assistants who the manager supervise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",1], DS, {s:"At the meeting, Belinda greeted the assistant who the manager supervises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",2], DS, {s:"During the conference call, Boris scolded the managers who the assistant hates."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",2], DS, {s:"During the conference call, Boris scolded the manager who the assistant hate."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",2], DS, {s:"During the conference call, Boris scolded the manager who the assistant hate."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",2], DS, {s:"During the conference call, Boris scolded the manager who the assistant hates."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",3], DS, {s:"In the garage, Clyde bumped into the chauffeurs who the CEO employs."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",3], DS, {s:"In the garage, Clyde bumped into the chauffeur who the CEO employ."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",3], DS, {s:"In the garage, Clyde bumped into the chauffeurs who the CEO employ."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",3], DS, {s:"In the garage, Clyde bumped into the chauffeur who the CEO employs."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",4], DS, {s:"After the accident, Clarissa interviewed the CEOs who the chauffeur drives."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",4], DS, {s:"After the accident, Clarissa interviewed the CEO who the chauffeur drive."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",4], DS, {s:"After the accident, Clarissa interviewed the CEOs who the chauffeur drive."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",4], DS, {s:"After the accident, Clarissa interviewed the CEO who the chauffeur drives."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",5], DS, {s:"From across the room, Armand spotted the apprentices who the painter cares for."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",5], DS, {s:"From across the room, Armand spotted the apprentice who the painter care for."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",5], DS, {s:"From across the room, Armand spotted the apprentices who the painter care for."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",5], DS, {s:"From across the room, Armand spotted the apprentice who the painter cares for."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",6], DS, {s:"In the studio, Amanda spoke with the painters who the apprentice idolizes."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",6], DS, {s:"In the studio, Amanda spoke with the painter who the apprentice idolize."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",6], DS, {s:"In the studio, Amanda spoke with the painters who the apprentice idolize."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",6], DS, {s:"In the studio, Amanda spoke with the painter who the apprentice idolizes."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",7], DS, {s:"At the office, Daria evaluated the coworkers who the administrator recommendss."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",7], DS, {s:"At the office, Daria evaluated the coworker who the administrator recommends."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",7], DS, {s:"At the office, Daria evaluated the coworkers who the administrator recommends."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",7], DS, {s:"At the office, Daria evaluated the coworker who the administrator recommendss."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",8], DS, {s:"In between meetings, Damen met with the administrators who the coworker respects."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",8], DS, {s:"In between meetings, Damen met with the administrator who the coworker respect."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",8], DS, {s:"In between meetings, Damen met with the administrators who the coworker respect."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",8], DS, {s:"In between meetings, Damen met with the administrator who the coworker respects."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",9], DS, {s:"After reading the book, Edwin researched the agents who the actor dislikes."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",9], DS, {s:"After reading the book, Edwin researched the agent who the actor dislike."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",9], DS, {s:"After reading the book, Edwin researched the agents who the actor dislike."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",9], DS, {s:"After reading the book, Edwin researched the agent who the actor dislikes."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",10], DS, {s:"Through the article, Elena discredited the actors who the agent hates."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",10], DS, {s:"Through the article, Elena discredited the actor who the agent hate."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",10], DS, {s:"Through the article, Elena discredited the actors who the agent hate."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",10], DS, {s:"Through the article, Elena discredited the actor who the agent hates."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",11], DS, {s:"From the gallery, Franny observed the nurses who the surgeon trusts."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",11], DS, {s:"From the gallery, Franny observed the nurse who the surgeon trust."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",11], DS, {s:"From the gallery, Franny observed the nurses who the surgeon trust."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",11], DS, {s:"From the gallery, Franny observed the nurse who the surgeon trusts."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",12], DS, {s:"During the consultation, Frank analyzed the surgeons who the nurse admires."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",12], DS, {s:"During the consultation, Frank analyzed the surgeon who the nurse admire."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",12], DS, {s:"During the consultation, Frank analyzed the surgeons who the nurse admire."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",12], DS, {s:"During the consultation, Frank analyzed the surgeon who the nurse admires."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",13], DS, {s:"Before the race, Gerold introduced himself to the sailors who the captain prefers."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",13], DS, {s:"Before the race, Gerold introduced himself to the sailor who the captain prefer."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",13], DS, {s:"Before the race, Gerold introduced himself to the sailors who the captain prefer."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",13], DS, {s:"Before the race, Gerold introduced himself to the sailor who the captain prefers."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",14], DS, {s:"Below the main deck, Georgia reconvened with the captains who the sailor worhips."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",14], DS, {s:"Below the main deck, Georgia reconvened with the captain who the sailor worhip."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",14], DS, {s:"Below the main deck, Georgia reconvened with the captains who the sailor worhip."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",14], DS, {s:"Below the main deck, Georgia reconvened with the captain who the sailor worhips."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",15], DS, {s:"After being reacquainted, Hilda remembered the clients who the celebrity wants."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",15], DS, {s:"After being reacquainted, Hilda remembered the client who the celebrity want."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",15], DS, {s:"After being reacquainted, Hilda remembered the clients who the celebrity want."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",15], DS, {s:"After being reacquainted, Hilda remembered the client who the celebrity wants."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",16], DS, {s:"Behind the curtains, Harry conversed with the celebrities who the client refuses."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",16], DS, {s:"Behind the curtains, Harry conversed with the celebrity who the client refuse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",16], DS, {s:"Behind the curtains, Harry conversed with the celebrities who the client refuse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",16], DS, {s:"Behind the curtains, Harry conversed with the celebrity who the client refuses."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",17], DS, {s:"At the press conference, Issac recorded the speakers who the ambassador endorses."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",17], DS, {s:"At the press conference, Issac recorded the speaker who the ambassador endorse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",17], DS, {s:"At the press conference, Issac recorded the speakers who the ambassador endorse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",17], DS, {s:"At the press conference, Issac recorded the speaker who the ambassador endorses."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",18], DS, {s:"Following the interview, Isabelle argued with the ambassadors who the speaker supports."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",18], DS, {s:"Following the interview, Isabelle argued with the ambassador who the speaker support."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",18], DS, {s:"Following the interview, Isabelle argued with the ambassadors who the speaker support."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",18], DS, {s:"Following the interview, Isabelle argued with the ambassador who the speaker supports."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",19], DS, {s:"During the budget negotiation, Janet charmed the assistants who the executive assigns."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",19], DS, {s:"During the budget negotiation, Janet charmed the assistant who the executive assign."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",19], DS, {s:"During the budget negotiation, Janet charmed the assistants who the executive assign."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",19], DS, {s:"During the budget negotiation, Janet charmed the assistant who the executive assigns."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",20], DS, {s:"Despite the profit loss, Jeff vouched for the executives who the assistant distrusts."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",20], DS, {s:"Despite the profit loss, Jeff vouched for the executive who the assistant distrust."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",20], DS, {s:"Despite the profit loss, Jeff vouched for the executives who the assistant distrust."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",20], DS, {s:"Despite the profit loss, Jeff vouched for the executive who the assistant distrusts."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",21], DS, {s:"While watching T.V., Karl recognized the hostages who the pirate despises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",21], DS, {s:"While watching T.V., Karl recognized the hostage who the pirate despise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",21], DS, {s:"While watching T.V., Karl recognized the hostages who the pirate despise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",21], DS, {s:"While watching T.V., Karl recognized the hostage who the pirate despises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",22], DS, {s:"Before production began, Kathy rehired the pirates who the hostage fears."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",22], DS, {s:"Before production began, Kathy rehired the pirate who the hostage fear."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",22], DS, {s:"Before production began, Kathy rehired the pirates who the hostage fear."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",22], DS, {s:"Before production began, Kathy rehired the pirate who the hostage fears."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",23], DS, {s:"Among the chaos, Loraine contacted the officers who the chief relies on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",23], DS, {s:"Among the chaos, Loraine contacted the officer who the chief rely on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",23], DS, {s:"Among the chaos, Loraine contacted the officers who the chief rely on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",23], DS, {s:"Among the chaos, Loraine contacted the officer who the chief relies on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",24], DS, {s:"Outside the station, Lucas found the chiefs who the officer recommends."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",24], DS, {s:"Outside the station, Lucas found the chief who the officer recommend."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",24], DS, {s:"Outside the station, Lucas found the chiefs who the officer recommend."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",24], DS, {s:"Outside the station, Lucas found the chief who the officer recommends."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",25], DS, {s:"At the potluck, Marcus chatted with the nuns who the priest adores."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",25], DS, {s:"At the potluck, Marcus chatted with the nun who the priest adore."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",25], DS, {s:"At the potluck, Marcus chatted with the nuns who the priest adore."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",25], DS, {s:"At the potluck, Marcus chatted with the nun who the priest adores."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",26], DS, {s:"Following the mass, Mary prayed with the priests who the nun sees."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",26], DS, {s:"Following the mass, Mary prayed with the priest who the nun see."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",26], DS, {s:"Following the mass, Mary prayed with the priests who the nun see."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",26], DS, {s:"Following the mass, Mary prayed with the priest who the nun sees."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",27], DS, {s:"For the charity auction, Noreen organized the singers who the producer hires."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",27], DS, {s:"For the charity auction, Noreen organized the singer who the producer hire."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",27], DS, {s:"For the charity auction, Noreen organized the singers who the producer hire."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",27], DS, {s:"For the charity auction, Noreen organized the singer who the producer hires."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",28], DS, {s:"Since the event, Nick worked for the producers who the singer amuses."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",28], DS, {s:"Since the event, Nick worked for the producer who the singer amuse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",28], DS, {s:"Since the event, Nick worked for the producers who the singer amuse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",28], DS, {s:"Since the event, Nick worked for the producer who the singer amuses."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",29], DS, {s:"Down at the pub, Ollie complained about the landlords who the tenant despises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",29], DS, {s:"Down at the pub, Ollie complained about the landlord who the tenant despise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",29], DS, {s:"Down at the pub, Ollie complained about the landlords who the tenant despise."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",29], DS, {s:"Down at the pub, Ollie complained about the landlord who the tenant despises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",30], DS, {s:"After the feud, Olivia fought for the tenants who the landlord robs."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",30], DS, {s:"After the feud, Olivia fought for the tenant who the landlord rob."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",30], DS, {s:"After the feud, Olivia fought for the tenants who the landlord rob."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",30], DS, {s:"After the feud, Olivia fought for the tenant who the landlord robs."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",31], DS, {s:"For her art class, Paulina will sketch the models who the teacher suggests."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",31], DS, {s:"For her art class, Paulina will sketch the model who the teacher suggest."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",31], DS, {s:"For her art class, Paulina will sketch the models who the teacher suggest."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",31], DS, {s:"For her art class, Paulina will sketch the model who the teacher suggests."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",32], DS, {s:"After the exhibition, Peter commissioned the teachers who the model knows."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",32], DS, {s:"After the exhibition, Peter commissioned the teacher who the model know."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",32], DS, {s:"After the exhibition, Peter commissioned the teachers who the model know."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",32], DS, {s:"After the exhibition, Peter commissioned the teacher who the model knows."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",33], DS, {s:"Around midnight, Quentin frantically called the therapists who the secretary depends on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",33], DS, {s:"Around midnight, Quentin frantically called the therapist who the secretary depend on,"}],
[["ROCCandy-MisMatchUnGram",33], DS, {s:"Around midnight, Quentin frantically called the therapists who the secretary depend on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",33], DS, {s:"Around midnight, Quentin frantically called the therapist who the secretary depends on."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",34], DS, {s:"By the next day, Quinn followed up with the secretaries who the therapist oversees."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",34], DS, {s:"By the next day, Quinn followed up with the secretary who the therapist oversee."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",34], DS, {s:"By the next day, Quinn followed up with the secretaries who the therapist oversee."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",34], DS, {s:"By the next day, Quinn followed up with the secretary who the therapist oversees."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",35], DS, {s:"During the trial, Rose testified against the senators who the judge distrusts."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",35], DS, {s:"During the trial, Rose testified against the senator who the judge distrust."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",35], DS, {s:"During the trial, Rose testified against the senators who the judge distrust."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",35], DS, {s:"During the trial, Rose testified against the senator who the judge distrusts."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["ROCCandy-MisMatch",36], DS, {s:"Near the courthouse, Ryan fled from the judges who the senator infuriates."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MatchUnGram",36], DS, {s:"Near the courthouse, Ryan fled from the judge who the senator infuriate."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-MisMatchUnGram",36], DS, {s:"Near the courthouse, Ryan fled from the judges who the senator infuriate."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["ROCCandy-Match",36], DS, {s:"Near the courthouse, Ryan fled from the judge who the senator infuriates."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],

[["f-GoodFillSingular",900], DS, {s:"For her daughter's birthday party, Alice hired the magician who the clown assists."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",901], DS, {s:"During his speech at the high school, Brad called out the students who the teacher heckles."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",902], DS, {s:"Since no one was dancing, Morris called up the band who the D.J. follows."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",903], DS, {s:"During the airshow, General Griff intently watched the pilot who the commander mentors."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",904], DS, {s:"At the business meeting, Michael bickered with the human resources representative who management sends."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",905], DS, {s:"While at the party, Johnny saw the bartender who the bouncer fancies."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",906], DS, {s:"After the lecture, Mary-Anne talked with the German professor who the advisor suggests."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",907], DS, {s:"Without considering the warning, Fiona angered the project leader who the associate displeases."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillSingular",908], DS, {s:"At the end of class, Jacob consoled the colleague who the teaching assistant fails."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",909], DS, {s:"Since the meeting, Zachary wanted to know about the accountants who the financial branches hire."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",910], DS, {s:"Following the debacle, Regan scolded the UPS driver who the mailmen loath."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",911], DS, {s:"At the university, Henry argued in favor of the lecturer who the chancellors pity."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",912], DS, {s:"After the incident, Anthony bailed out the pharmacist who the cops accuse."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",913], DS, {s:"During the multiple visits, Ben bonded with the receptionists who the companies overwork."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",914], DS, {s:"Through trial and error, Jason overcame his differences with the student teacher who the board members doubt."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",915], DS, {s:"At the annual Veteran's Day parade, Hunter cheered for the soldiers who the documentary makers feature."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",916], DS, {s:"Among the other employees, Brooke found it most difficult to help the salesperson who the consultants offend."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-GoodFillPlural",917], DS, {s:"Despite the impressive administration, Oliver noticed the head custodian who the supervisors overlook."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",918], DS, {s:"At the ceremony, Rogelio honored the scientist who the organization recognize."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",919], DS, {s:"Through the dog barking, Catherine held a pleasant conversation with the botanist who the herbalist study."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",920], DS, {s:"Against regulations, Dylan punished the quarterback who the coach push."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",921], DS, {s:"After they clocked out, Tracy poured a beer for the partner who the detective betray."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",922], DS, {s:"As the book was being purchased, Quinn realized that it was the author who the school district ban."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",923], DS, {s:"At the front desk, Eli began to fear the test administrator that the DMV clerk villainize."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",924], DS, {s:"During the fancy dinner, George tasted wine provided by the sommelier who the diner adore."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",925], DS, {s:"While examining the produce, Frank inquired about the fruit from the harvester who the farmer supply."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillPlural",926], DS, {s:"In the entire shop, Hannah couldn't find the comic for the collector who the museum rival."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",927], DS, {s:"Inside of the bakery, Gregory learned to make croissants from the baker who the milkmen loves."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",928], DS, {s:"In the middle of the game, Lauren assaulted the player who the referees favors."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",929], DS, {s:"Outside the lunchroom Susie sat with the lunch lady who the cooks serves."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",930], DS, {s:"After the prank, Howard was suspended by the principal who the school board members upsets."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",931], DS, {s:"Aboard the cruise ship, Grant tanned on the deck with the lifeguard who the sailors mocks."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",932], DS, {s:"To celebrate the new job, Irma bought a large pizza from the pizza maker who the waiters praises."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",933], DS, {s:"Since it was a recent thing, Dave figured he got the flu from the pediatrician who the physical therapists treats."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",934], DS, {s:"Since it was the most glamorous ball of the season, Phillip asked the princess who the princes desires."},Question,{q: 'Please indicate your confidence',as: ['Very confident','Somewhat confident','Not confident'],randomOrder: false,presentHorizontally: false}],
[["f-BadFillSingular",935], DS, {s:"At the commune, Rachel collaborated with the illustrators who the glass blowers envies."}]

];
