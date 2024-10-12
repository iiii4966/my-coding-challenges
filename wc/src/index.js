#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
const getTargetFileContent = (args) => {
    const { c, l } = args;
    if (!c && !l) {
        throw new Error(`File path not exist`);
    }
    let file;
    if (c) {
        file = c;
    }
    else if (l) {
        file = l;
    }
    else {
        throw new Error('File path not exist');
    }
    if (!fs.existsSync(file)) {
        throw new Error(`File not found: ${file}`);
    }
    return { file, content: fs.readFileSync(file, 'utf-8') };
};
const getNumberOfBytes = (text) => {
    return Buffer.byteLength(text, 'utf8');
};
const getNumberOfLines = (text) => {
    return Array.from(text).filter(c => c === '\n').length;
};
const main = () => {
    const { c, l } = argv;
    const { file, content } = getTargetFileContent({ c, l });
    let result;
    if (c) {
        result = getNumberOfBytes(content);
    }
    else if (l) {
        result = getNumberOfLines(content);
    }
    else {
        throw new Error('Not supported operation');
    }
    console.log(result, file);
};
main();
