import resolve from 'rollup-plugin-node-resolve';
import pegjs from 'rollup-plugin-pegjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import image from 'rollup-plugin-image';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    name: 'Tones',
    input: './src/index.js',
    output: {
        file: 'build/tones.js',
        format: 'iife'
    },
    plugins: [
        pegjs(),
        resolve({
            module: true,
            jsnext: true,
            browser: true,
        }),
        image(),
        json({
            exclude: 'node_modules/**',
            preferConst: true,
            indent: '    '
        }),
        babel({
            comments: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        uglify({}, minify)
    ]
}