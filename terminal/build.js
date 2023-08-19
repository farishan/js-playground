const esbuild = require('esbuild')

esbuild.buildSync({
    entryPoints: ['./src/index.js'],
    bundle: true,
    minify: false,
    sourcemap: true,
    outfile: './dist/bundle.js',
})

esbuild.buildSync({
    entryPoints: ['./src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: './dist/bundle.min.js',
})