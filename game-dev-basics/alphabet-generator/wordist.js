class Wordist {
  constructor(alphabetor) {
    this.alphabetor = alphabetor
  }

  getRandomWord(length) {
    if (
      typeof length === 'number'
    ) {
      let result = ''
      for (let index = 0; index < length; index++) {
        result += this.alphabetor.getRandomAlphabet()
      }
      return result
    }
    return
  }
}