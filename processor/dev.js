require('esbuild').build({
    entryPoints: ['./example/main.js'],
    sourcemap: true,
    minify: false,
    bundle: true,
    watch: true,
    outfile: './example/bundle.js'
})