
var gulp = require('gulp'),
    browserSync = require('browser-sync');


gulp.task('copyIndex', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}));

});

gulp.task('copyJquery',function(){
  gulp.src(['node_modules/jquery/dist/*.js','node_modules/jquery/dist/*.map'])
       .pipe(gulp.dest('public/js/lib/jquery'));
});

gulp.task('copyAngular', function () {
    gulp.src(['node_modules/angular/angular.js','node_modules/angular/angular.min.js','node_modules/angular/angular.min.js.map'])
        .pipe(gulp.dest('public/js/lib/angular'));
});

gulp.task('copyBootstrap',function(){
    var pathBase = 'node_modules/bootstrap/dist';
   gulp.src(pathBase+'/js/*js')
       .pipe(gulp.dest('public/js/lib/bootstrap'));
});

gulp.task('copyLibs', ['copyJquery','copyAngular']);

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './public'
        }
    })
});

gulp.task('watchFiles', function () {
    gulp.watch('public/index.html', ['browserSync']);
});

gulp.task('default', ['copyLibs','browserSync','watchFiles']);