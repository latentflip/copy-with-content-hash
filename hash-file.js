var crypto = require('crypto');
var fs = require('fs-extra');
var path = require('path');

module.exports = function (file, outdir, done) {
    if (!outdir) {
        outdir = path.dirname(file);
    }

    getHash(file, function (err, hash) {
        if (err) { return done(err); }

        var filename = path.basename(file);
        var newFilename = injectHashInFilename(filename, hash);
        fs.copy(file, path.join(outdir, newFilename), function (err) {
            if (err) { return done(err); }
            return done(null, newFilename);
        });
    });
};

function getHash(file, done) {
    var sha = crypto.createHash('sha1');
    fs.readFile(file, function (err, contents) {
        if (err) { return done(err); }
        sha.update(contents);
        done(null, sha.digest('hex').slice(0,8));
    });
}

function injectHashInFilename(filename, hash) {
    var dirname = path.dirname(filename);
    var extname = path.extname(filename);
    filename = path.basename(filename, extname);
    return path.join(dirname, filename + "." + hash + extname);
}
