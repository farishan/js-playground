class Alphabetor {
  constructor() {
    this.alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  getAlphabets() {
    return this.alphabets
  }

  getAlphabetByIndex(index) {
    return this.alphabets[index]
  }

  getRandomAlphabet() {
    const alphabets = this.alphabets
    const random = Math.floor(Math.random() * alphabets.length)
    return alphabets[random]
  }
}