"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp = require("gulp"),
    clean = require('gulp-clean'),
    tsc = require("gulp-typescript"),
    tscConfig = require("./tsconfig.json"),
    path = require('path'),
    concat = require('gulp-concat'),
    foreach = require("gulp-foreach"),
    runSequence = require("run-sequence"),
    less = require('gulp-less'),
    tslint = require('gulp-tslint'),
    rename = require('gulp-rename'),
    format = require('string-format'),
    config = require("./gulpfile.config.json"),
    vpkg = require("./package.json"),
    webpack = require('webpack'),
    webpackProdConfig = require('./webpack.config.js'),
    webpackDevConfig = require('./webpack.dev.config.js'),
    webpackStream = require('webpack-stream');


//******************************************************************************
//* TASKS
//******************************************************************************

gulp.task('clean', function () {
    var directories = [];
    directories.push(config.buildOutput.outputFolder);
    return gulp.src(directories, { read: false })
        .pipe(clean());
});

gulp.task('copy', function () {
    return gulp.src([config.buildOutput.sourceFolder + "**/*"])
        .pipe(rename(function (path) {
            path.extname = path.extname.replace('.html', '.txt').replace('.json', '.txt');
            path.dirname = path.dirname.replace('less', 'css').replace('ts', 'js');
        }))
        .pipe(gulp.dest(config.buildOutput.outputFolder));
});

gulp.task('ts-lint', function () {
    return gulp.src(config.buildOutput.tsFiles)
        .pipe(tslint({ formatter: 'prose' }))
        .pipe(tslint.report());
});

gulp.task('compile-typescript', function () {
    return gulp.src(config.buildOutput.tsFiles)
        .pipe(foreach(function (stream, file) {
            var outFile = file.path.replace(".ts", ".js");
            return stream
                .pipe(tsc(tscConfig/*, tsc.reporter.nullReporter*/))
                .pipe(gulp.dest('.'));
        }));
});

gulp.task('clean-typescript', function () {
    return gulp.src(config.buildOutput.outputFolder + '/**/*.ts', { read: false })
        .pipe(clean());
});

gulp.task('webpack', function () {
    return gulp.src('src/ts/handlingsplaner')
        .pipe(webpackStream(webpackProdConfig, webpack))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('webpackDev', function () {
    return gulp.src('src/ts/utvikling')
        .pipe(webpackStream(webpackDevConfig, webpack))
        .pipe(gulp.dest('dist/js'));
});

gulp.task("prod", function () {
    runSequence("clean", "copy", "ts-lint", "clean-typescript", "webpack");
});

gulp.task("dev", function () {
    runSequence("clean", "copy", "ts-lint", "clean-typescript", "webpackDev");
});