/**
 * @see https://rollupjs.org/guide/en/#configuration-files
 */

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        compact: true
    }
};