/**
 * @see https://rollupjs.org/guide/en/#configuration-files
 */

export default {
    input: 'example/main.js',
    output: {
        file: 'example/bundle.js',
        format: 'iife',
        sourcemap: true
    }
};