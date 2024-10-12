#!/usr/bin/env node

import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


interface Args {
    c?: string | fs.PathLike;
    l?: string | fs.PathLike;
}


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
    .help()
    .parseSync();

const getTargetFileContent = (args: Args) => {
    const {c, l} = args
    
    if (!c && !l) {
        throw new Error(`File path not exist`)
    }

    let file;
    if (c) {
        file = c;
    } else if (l) {
        file = l;
    } else {
        throw new Error('File path not exist')
    }
    
    if (!fs.existsSync(file)) {
        throw new Error(`File not found: ${file}`);    
    }
    
    return {file, content: fs.readFileSync(file, 'utf-8')}; 
}

const getNumberOfBytes = (text: string) => {
    return Buffer.byteLength(text, 'utf8');
}

const getNumberOfLines = (text: string) => {
    return Array.from(text).filter(c => c === '\n').length;
}

const main = () => {
    const {c, l} = argv;
    const {file, content} = getTargetFileContent({c, l});

    let result: number;
    if (c) {
        result = getNumberOfBytes(content);
    } else if (l) {
        result = getNumberOfLines(content);
    } else {
        throw new Error('Not supported operation')
    }

    console.log(result, file)
}

main()
