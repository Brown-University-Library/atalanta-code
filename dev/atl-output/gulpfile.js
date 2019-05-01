const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function(done) {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		online: true
	});
	done();
});

gulp.task('browserSyncReload', function(done) {
	browserSync.reload();
	done();
});

gulp.task('css', function() {
	return gulp
	.src('app/assets/scss/app.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 5 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('app/assets/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});
gulp.task('watchFiles', function() {
	gulp.watch('app/assets/scss/**/*', gulp.series('css'));
	gulp.watch('app/assets/js/**/*', gulp.series('browserSyncReload'));
	gulp.watch('app/*.html', gulp.series('browserSyncReload'));
});


gulp.task('watch', gulp.parallel('watchFiles', 'browserSync'), function() {

});