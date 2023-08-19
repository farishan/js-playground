import uglify from "@lopatnov/rollup-plugin-uglify";

export default {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        compact: true
    },
    plugins: [uglify()]
};