'use strict';

//import source from 'vinyl-source-stream';
const gulp = require('gulp');
const connect = require('gulp-connect');
// import babelify from 'babelify';
const run = require('run-sequence');
const rimraf = require('rimraf');
//import shell from 'gulp-shell';
const gls = require('gulp-live-server');
const babel = require('gulp-babel');


const paths = {
    src: './src/',
    publicSrc: './public',
    dest: './',
    bundle: 'bundle.js',
    bundleDest: '/app/pulic/js'
}

let express;

gulp.task('default', cb => {
    run('babel', 'server', 'watch');
})

gulp.task('build', cb => {
    console.log("rebuild");
    run('clean', 'babel', 'restart', cb);

})

gulp.task('watch', cb => {
    console.log("Watching...");
    
    gulp.watch([
        `${paths.src}**.js`, 'app/**/*.js'
    ], ['build']);



    gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('server', () => {
    express = gls.new('server.js');
    express.start();
});


gulp.task('connect', () => {
    connect.server({
        livereload: true,
        port: 3005
    });
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('clean', cb => {
    rimraf('server.js', cb);
});

gulp.task('babel', cb => {
    return gulp.src(`${paths.src}**.js`)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.dest));
});
