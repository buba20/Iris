"use strict";
var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    nodemon = require("gulp-nodemon");


gulp.task("copyIndex", function () {
    gulp.src("src/index.html")
        .pipe(gulp.dest("build"))
        .pipe(browserSync.reload({stream: true}));

});

gulp.task("copyJquery",function(){
    gulp.src([
        "node_modules/jquery/dist/*.js",
        "node_modules/jquery/dist/*.map"
    ]).pipe(gulp.dest("public/scripts/lib/jquery"));
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
        "node_modules/angular-animate/angular-animate.min.js"
    ]).pipe(gulp.dest("public/scripts/lib/angular"));

    //css files
    gulp.src([
        "node_modules/angularjs-toaster/toaster.css"
    ]).pipe(gulp.dest("public/styles"));
});

gulp.task("copyBootstrap",function(){
    var pathBase = "node_modules/bootstrap/dist";

    //copy js files
    gulp.src(pathBase+"/js/*js")
       .pipe(gulp.dest("public/scripts/lib/bootstrap"));

    //copy css files
    gulp.src([pathBase+"/css/*.css",pathBase+"/css/*.css.map"])
        .pipe(gulp.dest("public/styles"));

    //copy fonts
    gulp.src(pathBase+"/fonts/*.*")
        .pipe(gulp.dest("public/fonts"));
});

gulp.task("nodemon", function () {
    nodemon({
        script: "index.js",
        ext: "js css html",
        env: {
            "NODE_ENV": "development"
        },
        debug: ""
    });
});

gulp.task("browserSync", ["nodemon"], function () {
    browserSync({
        port: 7000,
        proxy: "http://localhost:3000",
        files: ["public/**"]
    });
});

gulp.task("reloadBrowserSync",function(){
    browserSync.reload({stream: true});
});

gulp.task("watchFiles", function () {
   gulp.watch("public/index.html", ["reloadBrowserSync"]);
});

gulp.task("copyLibs", ["copyJquery","copyAngular","copyBootstrap"]);

gulp.task("default", ["copyLibs","browserSync","watchFiles"]);