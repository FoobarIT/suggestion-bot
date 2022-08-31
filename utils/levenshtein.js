const stringSimilarity = require("string-similarity");


const levenshtein = (a, b) => {
    return stringSimilarity.compareTwoStrings(a, b);
}

module.exports = levenshtein;