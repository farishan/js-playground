requirejs(['../index.amd'], (CustomStorage) => {
    const s = new CustomStorage()
    console.log(s)

    s.setItem('test', 'test')
    s.write('hello', 'world')
    console.log(s.getItem('test'))
    console.log(s.read('hello'))
    s.removeItem('test')
    s.delete('hello')
    console.log(s.read('test'))
    console.log(s.read('hello'))
})