const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('default', ['cards']);

gulp.task('cards', () => {
    return gulp.src('src/decks/**.**')
        .pipe(gulp.dest('dist/deck-builder'));
});

gulp.task('clean', () => {
    return gulp.src('dist')
        .pipe($.clean())
    ;
});
