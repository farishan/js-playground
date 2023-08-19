import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
    },
    plugins: [
        uglify()
    ]
};