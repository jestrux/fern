const titles = require("./titles");
const authors = require("./authors");
const descriptions = require("./descriptions");
const metas = require("./metas");
const { shuffle } = require("../../../utils");

function generateData(entries){
    const data = Array(50).fill("").map((_, i) => {
        return {
            title: titles[i],
            // description: descriptions[i],
            description: authors[i],
        }
    });

    return shuffle(data).slice(0, entries);
}

module.exports = generateData;