line = h:Hanzi DIV p:Pinyins DIV t:Translation {
    return {
        hanzi:  h,
        pinyin: p.pinyin,
        tone:   p.tone,
        trans:  t,
    }
}

Hanzi = h:[^ \t\r\n]+ {
    return h;
}

Pinyins = ps:Pinyin+ {
    let pinyin = ps.map(p => p.chars);
    let tone   = ps.map(p => p.tone);
    return {
        pinyin: pinyin,
        tone:   tone,
    }
}
Pinyin = chars:Chars tone:(Tone)? {
    return {
        chars: chars,
        tone: (tone) ? tone : 5
    };
}
Chars = char:Char+ {
    let result = '';
    for(var i = 0; i < char.length; i++) {
        result += char[i];
    }
    return result;
}
Char = [a-zA-Z]
Tone = [1-5]

Translation = trans:.+ {
    return trans.join('').trim();
}

DIV = [ \t\n\r]+