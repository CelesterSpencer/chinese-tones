// get the tone marks over the right vocal
const vocalMap = {
    "a": { priority: 1, tone: { "1": "&#257;", "2": "&#225;", "3": "&#462;", "4": "&#224;", "5": "a" }},
    "e": { priority: 2, tone: { "1": "&#275;", "2": "&#233;", "3": "&#283;", "4": "&#232;", "5": "e" }},
    "o": { priority: 3, tone: { "1": "&#333;", "2": "&#243;", "3": "&#466;", "4": "&#242;", "5": "o" }},
    "u": { priority: 4, tone: { "1": "&#363;", "2": "&#250;", "3": "&#468;", "4": "&#249;", "5": "u" }},
    "i": { priority: 4, tone: { "1": "&#299;", "2": "&#237;", "3": "&#464;", "4": "&#236;", "5": "i" }},
    "v": { priority: 4, tone: { "1": "&#470;", "2": "&#472;", "3": "&#474;", "4": "&#476;", "5": "&#252;" }}
}
function unicodeToString(text) {
    return String.fromCharCode(text.replace(/[&#;]/g, ""));
}
function addTonemark(pinyin, tone) {
    var pinyinWithTones = pinyin;

    // determine the smallest priority of the containing vocals
    // also keep track of the index of that vocal.
    // the vocal with the smallest priority will be the one that will have the tonemark.
    var smallestPriority = 6;
    var idx = -1;
    for (var i = 0; i < pinyin.length; i++) {
        var char = pinyin.charAt(i);
        var priority = vocalMap[char];
        priority = (priority != null) ? priority.priority : 5;
        if (priority < smallestPriority) {
            smallestPriority = priority;
            idx = i;
        }
    }

    // only add a tonemark if a vocal had been found.
    if (idx !== -1) {
        var char = pinyin.charAt(idx);
        var charWithTone = "";
        var charObj = vocalMap[char];
        if (charObj != null) {
            let toneObj = charObj.tone[tone];
            toneObj = (toneObj.length == 1) ? toneObj : unicodeToString(toneObj);
            charWithTone = (toneObj != null) ? toneObj : charObj[5];
        } else {
            charWithTone = char;
        }
        pinyinWithTones = pinyin.replace(char,charWithTone);
    }
    return pinyinWithTones;
}

export {addTonemark};