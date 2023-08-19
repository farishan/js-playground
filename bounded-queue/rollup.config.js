import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const esConfig = {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es'
    },
    plugins: [terser({
        format: {
            comments: false,
            beautify: true
        },
        compress: false,
        mangle: false
    })],
    external: ['@farishan/queue/dist/bundle.min']
}

const amdConfig = {
    input: 'index.js',
    output: {
        file: 'dist/bundle.amd.js',
        format: 'amd'
    },
    plugins: [terser({
        format: {
            comments: false,
            beautify: true
        },
        compress: false,
        mangle: false
    })],
    external: ['@farishan/queue/dist/bundle.min']
}

const esMinConfig = {
    input: 'index.js',
    output: {
        file: 'dist/bundle.min.js',
        format: 'es',
    },
    plugins: [terser()],
    external: ['@farishan/queue/dist/bundle.min']
}

const amdMinConfig = {
    input: 'index.js',
    output: {
        file: 'dist/bundle.amd.min.js',
        format: 'amd'
    },
    plugins: [terser()],
    external: ['@farishan/queue/dist/bundle.min']
}

const exampleConfig = {
    input: 'example/main.js',
    output: {
        file: 'example/bundle.js',
        format: 'iife'
    },
    plugins: [nodeResolve()]
}

export default [
    esConfig,
    amdConfig,
    esMinConfig,
    amdMinConfig,
    exampleConfig
];