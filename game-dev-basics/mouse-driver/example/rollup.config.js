import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'example/main.js',
    output: {
        file: 'example/bundle.js',
        format: 'iife'
    },
    plugins: [nodeResolve()]
};