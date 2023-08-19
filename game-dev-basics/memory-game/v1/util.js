// @see https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

const util = { shuffleArray }