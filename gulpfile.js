const 	Gulp 		= require('gulp'),
	  	SASS 		= require('gulp-ruby-sass'),
	  	Browserify 	= require('browserify-gulp'),
		CSSO 		= require('gulp-csso'),
		Concat 		= require('concat'),
		Clean 		= require('clean'),
		Sourcemaps 	= require('gulp-sourcemaps'),
		Babel   	= require('gulp-babel'),
		BrowserSync = require('browser-sync').create();


Gulp.task('sass', ()=>{
    return SASS(['app/sass/**/*.scss'], {
            style: 'compressed'
        })
        .pipe(Gulp.dest('dist/'))
        .pipe(BrowserSync.stream());  
});


// Static server + watching sass + JS + Html files
Gulp.task('browser-sync', ()=>{
    BrowserSync.init({
        server: {
            baseDir: "./"
        }
    });

    Gulp.watch("app/sass/*.scss", ['sass']);
    //Gulp.watch("app/ecma/*.js",   ['babel']);
    Gulp.watch("./index.html").on("change", BrowserSync.reload) ;
});

Gulp.task('babel', () => {
    return Gulp.src('app/ecma/*.js')
    	.pipe(Sourcemaps.init())
        .pipe(Babel({
            presets: ['es2015']
        }))
        .pipe(Concat("all.js"))
        .pipe(Sourcemaps.write('.'))
        .pipe(Gulp.dest('dist/'));
});


Gulp.task("go", ['sass','browser-sync']);
Gulp.task("hi", ()=> console.info("Hi"));

