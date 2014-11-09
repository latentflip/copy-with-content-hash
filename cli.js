#!/usr/bin/env node
// hash-filename foo.js
// hash-filename foo.js bar.js
// hash-filename foo.js bar.js -o some/dir
// hash-filename -o some/dir foo.js bar.js

var nopt = require('nopt');
var path = require('path');
var parallel = require('run-parallel');

var hashFile = require('./hash-file');

var knownOpts = {
    'outdir': [String, null]
};

var shorthands = {
    'outdir': ['-o']
};

var options = nopt(knownOpts, shorthands, process.argv, 2);
var outdir = options.outdir;

var fns = options.argv.remain.map(function (file) {
    return (function (done) {
        hashFile(file, outdir, done);
    });
});

parallel(fns, function (err) {
    if (err) {
        console.err(err);
        process.exit(1);
    }
});