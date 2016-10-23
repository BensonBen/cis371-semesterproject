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

//gulp task that calls the sass compiler, and the browser sync
//Then watches certain files in certain directories for changes.
//What the script does is call the appropriate function, or triggers a browser reload.
gulp.task('watch', ['sass','browserSync'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/css/*.css', browserSync.reload);
        gulp.watch('app/javascript/*.js', browserSync.reload);
	gulp.watch('app/**/*.php', browserSync.relod);
});

gulp.task('browserSync', function(){
	browserSync.init({
	    server: {
		baseDir: 'app'
	}
	});
});


