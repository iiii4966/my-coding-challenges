import * as fs from 'fs';

export const getTargetFileContent = (args) => {
    const {c, l, w, m} = args
    
    let file;
    if (c) {
        file = c;
    } else if (l) {
        file = l;
    } else if (w) {
        file = w;
    } else if (m) {
        file = m;
    } else {
        throw new Error('File path not exist')
    }
    
    if (!fs.existsSync(file)) {
        throw new Error(`File not found: ${file}`);    
    }
    
    return {file, content: fs.readFileSync(file, 'utf-8')}; 
}

export const getNumberOfBytes = (text) => {
    return Buffer.byteLength(text, 'utf8');
}

export const getNumberOfLines = (text) => {
    return Array.from(text).filter(c => c === '\n').length;
}

export const getNumberOfWords = (text) => {
     return text.trim().split(/\s+/).length;
}

export const getNumberOfChar = (text) => {
    return text.length;
}
