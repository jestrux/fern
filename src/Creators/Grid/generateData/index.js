const titles = require("./titles");
const authors = require("./authors");
const descriptions = require("./descriptions");
const metas = require("./metas");
const positions = require("./positions");
const { shuffle, randomBetween } = require("../../../utils");

function teamData(imageNames) {
    const data = Array(imageNames ? imageNames.length : 50).fill("").map((_, i) => {
        const randomPrice = Math.floor(randomBetween(95, 2000));
        const randomRating = randomBetween(1, 5).toFixed(1);

        return {
            title: imageNames ? imageNames[i] : authors[i],
            description: positions[i],
            price: randomPrice.toLocaleString(),
            rating: randomRating
        }
    });

    return imageNames ? data : shuffle(data);
}

function shopData(imageNames) {
    const data = Array(imageNames ? imageNames.length : 50).fill("").map((_, i) => {
        const randomPrice = Math.floor(randomBetween(230, 2750));
        const randomRating = randomBetween(1, 5).toFixed(1);

        return {
            title: imageNames ? imageNames[i] : titles[i],
            description: descriptions[i],
            price: randomPrice.toLocaleString(),
            rating: randomRating
        }
    });

    return imageNames ? data : shuffle(data);
}

function articleData() {
    const data = Array(50).fill("").map((_, i) => {
        const randomPrice = Math.floor(randomBetween(95, 2000));
        const randomRating = randomBetween(1, 5).toFixed(1);

        return {
            title: titles[i],
            description: descriptions[i],
            price: randomPrice.toLocaleString(),
            rating: randomRating
        }
    });

    return shuffle(data);
}

function generateData(entries, type = "team", imageNames){
    const generator = {
        "articles": articleData,
        "team": teamData,
        "shop": shopData,
    }[type];

    return generator(imageNames).slice(0, entries);
}

module.exports = generateData;