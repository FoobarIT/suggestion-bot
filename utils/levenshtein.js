const stringSimilarity = require("string-similarity");


const levenshtein = (a, b) => {
    return stringSimilarity.compareTwoStrings(a, b);
    //TODO: Add the database check string here. => suggest.js
}

module.exports = levenshtein;