"use strict";
var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    nodemon = require("gulp-nodemon"),
    less = require('gulp-less'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject');

var config = {
    publicPath: '/public',
    srcPublicPath: function () {
        return './src' + this.publicPath;
    },
    distPublicPath: function () {
        return './dist' + this.publicPath;
    },
    distPublicLibsPath: function () {
        return this.distPublicPath() + '/scripts/lib'
    },
    distPublicAngularLibsPath: function () {
        return this.distPublicLibsPath() + '/angular';
    },
    distPublicJQueryLibsPath: function () {
        return this.distPublicLibsPath() + '/jquery';
    },
    distPublicBootstrapJsLibsPath: function () {
        return this.distPublicLibsPath() + '/bootstrap';
    },
    distPublicStylePath: function () {
        return this.distPublicPath() + '/styles';
    },
    distPublicFontsPath: function () {
        return this.distPublicPath() + '/fonts';
    },
    distServerDir: './dist',
    srcServerDir: './src/server',
    srcMainAppFilePath: function () {
        return this.srcServerDir + '/index.ts';
    },
    distMainAppFilePath: function () {
        return this.distServerDir + '/index.js';
    },
    distDbAppDir: function () {
        return this.distServerDir + '/db/';
    },
    srcDbAppDir: function () {
        return this.srcServerDir + '/db/';
    },
    distServerApiDir: function () {
        return this.distServerDir + '/api';
    },
    srcServerApiDir: function () {
        return this.srcServerDir + '/api';
    },
    distStartHtmlFilePath: function () {
        return this.distPublicPath();
    },
    sourceStartHtmlFile: function () {
        return this.srcPublicPath() + '/index.html';
    },
    srcPublicAppDir: function () {
        return this.srcPublicPath() + '/scripts';
    },
    typings: './src/typings/',
    libraryTypeScriptDefinitions: './src/typings/**/*.ts',
    serverTypeScriptReferences: './src/typings/' + 'typescriptServer.d.ts',
    publicTypeScriptReferences: './src/typings/' + 'typescriptPublic.d.ts'
};

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-server-ts-refs', function () {
    var target = gulp.src(config.serverTypeScriptReferences);
    var sources = gulp.src(config.srcServerDir + '/**/*.ts', {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

gulp.task('gen-public-ts-refs', function () {
    var target = gulp.src(config.publicTypeScriptReferences);
    var sources = gulp.src([config.srcPublicAppDir()], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

gulp.task('compileServerFiles', function () {
    gulp.src(config.srcServerDir + '/**/*.ts')
        .pipe(tsc({
            module: 'commonjs',
            target: 'ES5',
            noExternalResolve: false
        })).js.pipe(gulp.dest(config.distServerDir));
});

gulp.task('copyMainAppFile', function () {
    return gulp.src([config.srcMainAppFilePath()])
        .pipe(tsc({
            module: 'commonjs',
            target: 'ES5',
            noExternalResolve: false
        })).js
        .pipe(gulp.dest(config.distServerDir))
});

gulp.task("copyIndex", function () {
    gulp.src([config.sourceStartHtmlFile()])
        .pipe(gulp.dest(config.distStartHtmlFilePath()))
});

gulp.task("copyJquery", function () {
    gulp.src([
        "node_modules/jquery/dist/*.js",
        "node_modules/jquery/dist/*.map"
    ]).pipe(gulp.dest(config.distPublicJQueryLibsPath()));
});

gulp.task("copyAngular", function () {
    //js files
    gulp.src([
        "node_modules/angular/angular.js",
        "node_modules/angular/angular.min.js",
        "node_modules/angular/angular.min.js.map",
        "node_modules/angular-route/angular-route.js",
        "node_modules/angular-route/angular-route.min.js",
        "node_modules/angular-route/angular-route.min.js.map",
        "node_modules/angularjs-toaster/toaster.min.js",
        "node_modules/angularjs-toaster/toaster.js",
        "node_modules/angular-animate/angular-animate.min.js",
        "node_modules/ng-resource/lib/angular-resource.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        "bower_components/angular-resource/angular-resource.js",
        "bower_components/angular-resource/angular-resource.min.js"
    ]).pipe(gulp.dest(config.distPublicAngularLibsPath()));

    //css files
    gulp.src([
        "node_modules/angularjs-toaster/toaster.css",
        "bower_components/angular-bootstrap/ui-bootstrap-csp.css"
    ]).pipe(gulp.dest(config.distPublicStylePath()));
});

gulp.task("copyBootstrap", function () {
    var pathBase = "node_modules/bootstrap/dist";

    //copy js files
    gulp.src(pathBase + "/js/*js")
        .pipe(gulp.dest(config.distPublicBootstrapJsLibsPath()));

    //copy css files
    gulp.src([pathBase + "/css/*.css", pathBase + "/css/*.css.map"])
        .pipe(gulp.dest(config.distPublicStylePath()));

    //copy fonts
    gulp.src(pathBase + "/fonts/*.*")
        .pipe(gulp.dest(config.distPublicFontsPath()));
});

gulp.task('copyDbApp', function () {
    return gulp.src([config.srcDbAppDir() + '**/*.js'])
        .pipe(gulp.dest(config.distDbAppDir()))
});

gulp.task('copyApiApp', function () {
    return gulp.src([config.srcServerApiDir() + '/**/*.js'])
        .pipe(gulp.dest(config.distServerApiDir()));
});

gulp.task("nodemon", function () {
    return nodemon({
        script: config.distMainAppFilePath(),
        ext: "js css html",
        //ext:'index.js',
        watch: config.distMainAppFilePath(),
        env: {
            "NODE_ENV": "development"
        }
    });
});

gulp.task("browserSync", ["nodemon"], function () {
    browserSync({
        port: 7000,
        proxy: "http://localhost:3000",
        files: [config.distPublicPath() + '/**']
    });
});

gulp.task("reloadBrowserSync", function () {
    browserSync.reload({stream: true});
});

gulp.task("watchFiles", function () {
    gulp.watch(config.distStartHtmlFilePath(), ["reloadBrowserSync"]);
});

gulp.task('watchServerFiles', function () {
    gulp.watch(config.srcServerDir + '/**/*.ts', ['compileServerFiles','gen-server-ts-refs']);
    gulp.watch(config.srcMainAppFilePath(),['copyMainAppFile'])
});

gulp.task("copyLibs", ["copyJquery", "copyAngular", "copyBootstrap"]);

gulp.task('processLessFiles', function () {
    return gulp.src([config.srcPublicPath() + '/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest(config.distPublicPath()));
});

gulp.task('copyFrontEnd', function () {
    return gulp.src([
        config.srcPublicPath() + '/**/*.js',
        config.srcPublicPath() + '/**/*.html'
    ]).pipe(gulp.dest(config.distPublicPath()))
});

gulp.task('build', [
    "copyMainAppFile",
    "copyIndex",
    "copyDbApp",
    "copyApiApp",
    "copyLibs",
    "copyFrontEnd",
    "watchServerFiles"
]);

//gulp.task("default", ["build", "browserSync", "watchFiles","watchServerFiles"]);
gulp.task("default", ["build", "watchFiles","watchServerFiles"]);