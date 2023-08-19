require('esbuild').build({
    entryPoints: ['./example/index.js'],
    bundle: true,
    minify: false,
    sourcemap: true,
    watch: true,
    outfile: './example/bundle.js',
}).then(result => {
    // console.log(result)
    console.log('watching...')
})