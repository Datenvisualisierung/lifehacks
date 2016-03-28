var gulp       = require('gulp'),
    gulpif   = require('gulp-if'),
    gutil      = require('gulp-util'),
    concat     = require('gulp-concat'),
    //prefix     = require('gulp-autoprefixer'),
    swig       = require('gulp-swig'),
	debug      = require('gulp-debug'),
	livereload = require('gulp-livereload'),
     uglify   = require('gulp-uglifyjs');
	sourcemaps = require('gulp-sourcemaps');
	less = require('gulp-less');
	path = require('path');



var args = require('yargs').
 boolean('iscroll').
 boolean('compress').argv;

gulp.task('default', ['build-html', 'build-css', 'build-images', 'build-images-dynamic', 'build-js', 'build-fonts']);

gulp.task('build-html', function() {

	gulp.src('src/*.html')
		.pipe(swig({defaults: { cache: false }}))
		.pipe(gulp.dest('build/'));

});

gulp.task('build-css', function() {

	gulp.src([	'src/css/*.less',
				'src/css/styles_typo3.css' ])
	  	.pipe(sourcemaps.init())
		.pipe(less())
  		.pipe(sourcemaps.write())
		//.pipe(prefix())
		.pipe(gulp.dest('build/css'));




});





gulp.task('build-images', function() {

	gulp.src('src/images/**/*')
		.pipe(gulp.dest('build/images'));

});
gulp.task('build-images-dynamic', function() {

	gulp.src('src/images-dynamic/**/*')
		.pipe(gulp.dest('build/images-dynamic'));

});

gulp.task('build-js', function() {

var scripts = [

        'src/js/main.js'


    ];
    gulp.src(scripts).
        pipe(concat("main.js")).
        pipe(gulpif(args.compress, uglify())).
        pipe(gulp.dest('build/js'));

//aus libraries
    gulp.src([
		'src/libraries/bootstrap.min.js',
        'src/libraries/jquery-2.1.1.min.js',
        'src/libraries/jquery-ui.min.js',
		'src/libraries/jquery.mCustomScrollbar.min.js',
		'src/libraries/jquery.mousewheel.min.js',
		'src/libraries/selectBoxIt-3.8.1.min.js',
		'src/libraries/jquery.mobile.custom.min.js'
		


    ]).
    	//pipe(concat("libraries.js")).
        //pipe(gulpif(args.compress, uglify())).
    	pipe(gulp.dest('build/libraries'));

});

gulp.task('build-fonts', function() {

	gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts'));

});



gulp.task('watch', function() {

	var server = livereload();

	gulp.watch('src/**/*.html', ['build-html']).on('change', function(file) {
		server.changed(file.path);
	});

	gulp.watch('src/css/**/*.less', ['build-css']).on('change', function(file) {
		server.changed(file.path);
	});

	gulp.watch('src/images/**/*', ['build-images']).on('change', function(file) {
		server.changed(file.path);
	});
	gulp.watch('src/images-dynamic/**/*', ['build-images-dynamic']).on('change', function(file) {
		server.changed(file.path);
	});

	gulp.watch('src/js/**/*.js', ['build-js']).on('change', function(file) {
		server.changed(file.path);
	});
	gulp.watch('src/fonts/*/', ['build-fonts']).on('change', function(file) {
		server.changed(file.path);
	});

});
