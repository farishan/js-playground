require('esbuild').buildSync({
    entryPoints: ['./example/index.js'],
    bundle: true,
    minify: false,
    sourcemap: true,
    outfile: './example/bundle.js',
})