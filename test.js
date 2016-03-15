'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const execFileSync = require('child_process').execFileSync;

// reset index.html:
fs.writeFileSync('index.html', fs.readFileSync('template.html', 'utf8'), 'utf8');

const emptyOriginal = fs.readFileSync('index.html', 'utf8');

console.log('--- EMPTY ORIGINAL ---');
console.log(emptyOriginal);

// inject files into index.html:
execFileSync(path.join('node_modules', '.bin', 'gulp'), ['fill']);

const filled = fs.readFileSync('index.html', 'utf8');

console.log('--- FILLED INDEX.HTML ---');
console.log(filled);

assert.ok(filled.length > emptyOriginal.length, 'Something should have been injected');

// inject empty stream (i.e. clear all injections):
execFileSync(path.join('node_modules', '.bin', 'gulp'), ['empty']);

const emptied = fs.readFileSync('index.html', 'utf8');

console.log('--- EMPTIED INDEX.HTML ---');
console.log(emptied);

assert.ok(emptied === emptied, 'The emptied file should be exactly the same as the empty original');

console.log('✔︎ ALL OK');
