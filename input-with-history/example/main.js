import InputWithHistory from "../index.js";

const input = new InputWithHistory({
    onsubmit: function (value) {
        console.log('eaaa', value)
    }
})

document.body.append(input.getDOM())