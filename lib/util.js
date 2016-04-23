/**
 * @file utils
 * @author cxtom <cxtom2010@gmail.com>
 */

var Path = require('path');
var Fs   = require('fs');

/* eslint-disable no-console */

var internals = {};

// Expands source and target to absolute paths, then calls internals.copy
exports.copy = function (source, target, options) {

    if (typeof target === 'object') {
        options = target;
        target = undefined;
    }

    options = options || {};

    var root = Path.dirname(internals.findParent(module).filename);
    var projectRoot = exports.findGitRoot(root);

    var sourcePath = Path.resolve(root, source);
    var targetPath = Path.resolve(projectRoot, target || source);

    if (targetPath.indexOf(projectRoot) !== 0) {
        throw new Error('Destination must be within project root');
    }

    return internals.copy(sourcePath, targetPath, options);
};

// Given a starting directory, find the root of a git repository.
// In this case, the root is defined as the first directory that contains
// a directory named ".git"
//
// Returns a string if found, otherwise undefined
exports.findGitRoot = function (start) {

    start = start || Path.dirname(internals.findParent(module).filename);
    var root;

    if (exports.isDir(Path.join(start, '.git'))) {
        root = start;
    }
    /* $lab:coverage:off$ */
    // Coverage disabled here due to false positive on else if, since we have to trap the throwWarn method
    else if (Path.dirname(start) !== start) {
        root = exports.findGitRoot(Path.dirname(start));
    }
    else {
        return internals.throwWarn('Unable to find a .git directory for this project');
    }
    /* $lab:coverage:on$ */

    return root;
};


/* $lab:coverage:off$ */
// Coverage disabled for this method because we use a child process to test it due to the process.exit() call
internals.throwWarn = function (warning) {

    console.error('WARNING: ' + warning + ', installation aborted.');
    process.exit(0);
};
/* $lab:coverage:on$ */

// Find the topmost parent of the given module.
internals.findParent = function (mod) {

    return mod.parent ? internals.findParent(mod.parent) : mod;
};


// Similar to mkdir -p, recursively creates directories until `path` exists
internals.mkdir = function (path) {

    var mode = ~process.umask() & parseInt('777', 8);

    if (exports.isDir(path)) {
        return;
    }

    try {
        Fs.mkdirSync(path, mode);
    }
    catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }

        internals.mkdir(Path.dirname(path));
        internals.mkdir(path);
    }
};


// Determine if source is a directory or a file and call the appropriate method
internals.copy = function (source, target, options) {

    if (exports.isDir(source)) {
        internals.copyDirectory(source, target, options);
    }
    else {
        return internals.copyFile(source, target, options);
    }
};

// Copy a single file
internals.copyFile = function (source, target, options) {

    internals.mkdir(Path.dirname(target));

    var mode = ~process.umask() & parseInt('666', 8);

    if (Fs.existsSync(target)
        && !options.overwrite) {

        return new Error(target + ' already exists');
    }

    var sourceContent = '';
    try {
        sourceContent = Fs.readFileSync(source);
    }
    catch (e) {
        /* no source to copy */
    }

    Fs.writeFileSync(target, sourceContent, {flag: 'w', mode: mode});
};

// Recursively copy a directory
internals.copyDirectory = function (source, target, options) {

    internals.mkdir(target);

    var sources = Fs.readdirSync(source);
    for (var i = 0, l = sources.length; i < l; ++i) {
        var sourcePath = Path.join(source, sources[i]);
        var targetPath = Path.join(target, sources[i]);

        internals.copy(sourcePath, targetPath, options);
    }
};


// Given a path, determine if the path is a directory
exports.isDir = function (path) {

    try {
        var stat = Fs.statSync(path);
        return stat.isDirectory();
    }
    catch (e) {
        return false;
    }
};

