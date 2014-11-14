#!/usr/bin/env node
// copy-with-content-hash foo.js
// copy-with-content-hash foo.js bar.js
// copy-with-content-hash foo.js bar.js -o some/dir
// copy-with-content-hash -o some/dir foo.js bar.js

var nopt = require('nopt');
var path = require('path');
var fs = require('fs-extra');
var parallel = require('run-parallel');

var hashFile = require('./hash-file');

var knownOpts = {
    'outdir': [String, null],
    'just-copy': [Boolean, false]
};

var shorthands = {
  'outdir': ['-o']
};

var options = nopt(knownOpts, shorthands, process.argv, 2);
var outdir = options.outdir;

var json = {};
var fns = options.argv.remain.map(function (file) {
    return (function (done) {
        var filename = path.basename(file);

        if (options['just-copy']) {
            if (!outdir) {
                return done(new Error("can't --just-copy without an --outdir"));
            }

            fs.copy(file, path.join(outdir, filename), function (err) {
                if (err) { return done(err); }
                json[filename] = filename;
                done();
            });
        } else {
            hashFile(file, outdir, function (err, newFilename) {
                if (err) { return done(err); }
                json[filename] = newFilename
                done();
            });
        }
    });
});

parallel(fns, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(JSON.stringify(json, null, 2));
});
