import uglify from '@lopatnov/rollup-plugin-uglify';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'esm'
    },
    plugins: [nodeResolve(), uglify()]
};