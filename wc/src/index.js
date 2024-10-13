#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {getTargetFileContent, getNumberOfBytes, getNumberOfLines, getNumberOfWords, getNumberOfChar} from './wc.js'

const argv = yargs(hideBin(process.argv))
    .option('c', {
        alias: 'c',
        type: 'string',
        description: 'File path to get number of bytes',
    })
    .option('l', {
        alias: 'l',
        type: 'string',
        description: 'File path to get number of lines',
    })
    .option('w', {
        alias: 'w',
        type: 'string',
        description: 'File path to get number of words',
    })
    .option('m', {
        alias: 'm',
        type: 'string',
        description: 'File path to get number of char',
    })
    .help()
    .parseSync();

const main = () => {
    let {c, l, w, m, _: defaults} = argv;
    if (defaults.length > 0) {
        c = defaults[0];
        l = defaults[0];
        w = defaults[0];
    }
    const {file, content} = getTargetFileContent({c, l, w, m});

    let result = {};
    if (c) {
        result['c'] = getNumberOfBytes(content);
    }
    if (l) {
        result['l'] = getNumberOfLines(content);
    } 
    if (w) {
        result['w'] = getNumberOfWords(content);
    } 
    if (m) {
        result['m'] = getNumberOfChar(content);
    } 
    
    console.log(Object.values(result).join(' '), file)
}

main()
