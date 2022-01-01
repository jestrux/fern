const titles = require("./titles");
const authors = require("./authors");
const descriptions = require("./descriptions");
const metas = require("./metas");
const { shuffle, randomBetween } = require("../../../utils");

function generateData(entries){
    const data = Array(50).fill("").map((_, i) => {
        const randomPrice = Math.floor(randomBetween(95, 2000));
        const randomRating = randomBetween(1, 5).toFixed(1);

        return {
            title: titles[i],
            // description: descriptions[i],
            description: authors[i],
            price: randomPrice.toLocaleString(),
            rating: randomRating
        }
    });

    return shuffle(data).slice(0, entries);
}

module.exports = generateData;