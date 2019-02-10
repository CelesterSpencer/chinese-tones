function speak(hanzi) {
    try {
        let utt = new SpeechSynthesisUtterance(hanzi.join());
        utt.lang = 'zh-CN';
        utt.rate = 1.0;
        window.speechSynthesis.speak(utt);
    } catch(e) {
        console.log(e);
    }
}

export {speak}