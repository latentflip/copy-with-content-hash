# copy-with-content-hash

Creates a copy of a file(s), adding it's content's hash to the filename. Useful for generating asset files to be served and cached by a webserver.

## installation

`npm install copy-with-content-hash -g`

## usage

* copy a single file into the same directory that it's in

    ```
    copy-with-content-hash path/to/foo.js
    # creates a file path/to/foo.f1234567.js
    ```

* copy multiple files into the same directory they are in

    ```
    copy-with-content-hash path/to/foo.js different/path/to/bar.js
    # creates a file path/to/foo.f1234567.js and different/path/to/bar.12abcdef.js
    ```

* copy files to a different directory

    ```
    copy-with-content-hash path/to/foo.js different/path/to/bar.js -o outputdir
    # creates a file outputdir/foo.f1234567.js and outputdir/bar.12abcdef.js
    ```

# License: MIT
