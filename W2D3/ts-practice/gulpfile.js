const gulp = require('gulp');
const ts = require('ts');

gulp.task('default', () => 
  gulp.src('typescript/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      out: 'output.js',
      module: 'system',
    })
    .pipe(gulp.dest('scripts'))
  )
);
