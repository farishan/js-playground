require('esbuild').buildSync({
    entryPoints: ['./src/index.js'],
    sourcemap: true,
    minify: false,
    bundle: true,
    outfile: './dist/bundle.js'
})

require('esbuild').buildSync({
    entryPoints: ['./src/index.js'],
    sourcemap: false,
    minify: true,
    bundle: true,
    outfile: './dist/bundle.min.js'
})