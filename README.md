# Front-Seed

Seed Project (Kick Ass Project) for the development of front-end javascript applications using yarn and grunt. The project is pre-configured with the following grunt modules:

* [Connect](https://github.com/gruntjs/grunt-contrib-connect): Static web server.
* [Proxy](https://github.com/drewzboto/grunt-connect-proxy): Grunt Connect support for proxying API calls during development.
* [Open](https://github.com/jsoverson/grunt-open): Open urls and files from a grunt task.
* [Sass](https://github.com/sindresorhus/grunt-sass): Compile Sass to CSS.
* [Copy](https://github.com/gruntjs/grunt-contrib-copy): Copy files and folders.
* [Uglify](https://github.com/gruntjs/grunt-contrib-uglify): Minify files with UglifyJS.
* [Concat](https://github.com/gruntjs/grunt-contrib-concat): Concatenate files.
* [Remove](https://github.com/nvoinov/grunt-remove):  Remove directory and files.
* [String-replace](https://github.com/eruizdechavez/grunt-string-replace): Replace strings on files by using string or regex patters.
* [Usebanner](https://github.com/mattstyles/grunt-banner): Adds a simple banner to files.
* [Watch](https://github.com/gruntjs/grunt-contrib-watch): Run tasks whenever watched files change.


## Usage

### Instal Dependecies
First install all the tools

```sh
$ npm -g yarn
$ npm -g grunt
```

and then download all the 3rd party library and tools with yarn

```sh
$ yarn install
```
the 3rd party library and dev tools should be in `node_modules`.

### Run
To compile and start the application in livereload mode :

```sh
$ grunt serve
```
If you only want to compile the application

```sh
$ grunt
```

The compiled application code is in `dist`

## Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion](http://github.com/mbaez/front-seed/issues/new) to [issues list](https://github.com/mbaez/front-seed/issues).
