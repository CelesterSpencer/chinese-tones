function encode(card) {
    return card.hanzi.join() + card.pinyin.join();
}

function getRatings(deck) {
    let ratings = localStorage.getItem(deck.name) || '{}';
    return JSON.parse(ratings);
}

function loadRating(deck) {
    // get ratings
    let ratings = getRatings(deck);

    // set card's ratings for each card
    for (let card of deck.cards) {
        let rating = ratings[encode(card)] || 0;
        card.rating = rating;
    }
}

function saveRating(deck) {
    // get ratings
    let ratings = getRatings(deck);

    // update ratings
    for (let card of deck.cards) {
        ratings[encode(card)] = card.rating;
    }

    // save ratings
    localStorage.setItem(deck.name, JSON.stringify(ratings));
}

export {loadRating, saveRating}