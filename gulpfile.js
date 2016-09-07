var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch', ['sass','browserSync'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/css/*.css', browserSync.reload);
        gulp.watch('app/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync.init({
	    server: {
		baseDir: 'app'
	}
	});
});


