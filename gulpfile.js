var gulp       = require('gulp'),
    gulpif   = require('gulp-if'),
    gutil      = require('gulp-util'),
    sass       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    prefix     = require('gulp-autoprefixer'),
    swig       = require('gulp-swig'),
	debug      = require('gulp-debug'),
	livereload = require('gulp-livereload'),
     uglify   = require('gulp-uglifyjs');





var args = require('yargs').boolean('iscroll').boolean('compress').argv;

gulp.task('default', ['build-html', 'build-css', 'build-img', 'build-js', 'build-fonts']);

gulp.task('build-html', function() {

	gulp.src('src/*.html')
		.pipe(swig({defaults: { cache: false }}))
		.pipe(gulp.dest('build/'));

});

gulp.task('build-css', function() {
	gulp.src(['src/css/*.css'])
		.pipe(gulp.dest('build/css/'));

	gulp.src(['src/sass/*.scss', '!src/sass/_*.scss'])
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest('build/css/'));

});

gulp.task('build-img', function() {

	gulp.src('src/img/**/*')
		.pipe(gulp.dest('build/img/'));

});


gulp.task('build-js', function() {

var scripts = [

    ];
    gulp.src(scripts).
        pipe(gulpif(args.compress, uglify())).
        pipe(gulp.dest('build/js'));

//aus Vendor
    gulp.src([
		'src/js/vendor/jquery.min.js',
		'src/js/vendor/what-input.min.js',
		'src/js/foundation.min.js'


    ]).
    	pipe(concat("vendor.js")).
        pipe(gulpif(args.compress, uglify())).
    	pipe(gulp.dest('build/js/vendor'));

});

gulp.task('build-fonts', function() {

	gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts/bms'));

});



gulp.task('watch', function() {

	var server = livereload();

	gulp.watch('src/**/*.html', ['build-html']).on('change', function(file) {
		server.changed(file.path);
	});

	gulp.watch('src/sass/**/*.scss', ['build-css']).on('change', function(file) {
		server.changed(file.path);
	});

	gulp.watch('src/img/**/*', ['build-img']).on('change', function(file) {
		server.changed(file.path);
	});

	gulp.watch('src/js/**/*.js', ['build-js']).on('change', function(file) {
		server.changed(file.path);
	});
	gulp.watch('src/js/**/*.js', ['build-fonts']).on('change', function(file) {
		server.changed(file.path);
	});

});
