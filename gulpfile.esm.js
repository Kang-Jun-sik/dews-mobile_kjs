/* eslint-disable no-undef */
import { src, dest, watch, parallel, lastRun } from 'gulp';
import sass from 'gulp-sass';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import nodeSass from 'node-sass';
import through2 from 'through2';

sass.compiler = nodeSass;

function scss() {
  return src(['./src/**/*.scss'], lastRun(scss))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      through2.obj((file, _enc, cb) => {
        if (file.isBuffer()) {
          file.contents = Buffer.from(`import { css } from 'lit-element';
export default css\`${String(file.contents)}\`;`);
          file.extname = '.scss.ts';
        }
        cb(null, file);
      })
    )
    .pipe(dest('./src'));
}

function html() {
  return src(['./src/**/*.html'], lastRun(html))
    .pipe(
      through2.obj((file, _enc, cb) => {
        if (file.isBuffer()) {
          file.contents = Buffer.from(`import { html } from 'lit-element';
export default function (this: any) { return html\`${String(file.contents)}\`; }`);
          file.extname = '.html.ts';
        }
        cb(null, file);
      })
    )
    .pipe(dest('./src'));
}

function ts() {
  const project = typescript.createProject('tsconfig.json', { since: lastRun(ts) });
  return project
    .src()
    .pipe(sourcemaps.init())
    .pipe(project())
    .js.pipe(sourcemaps.write('.', { sourceRoot: './', includeContent: true }))
    .pipe(dest('./.tmp'));
}

const build = parallel(scss, html);

function watchAll() {
  // watch(['./**/*.ts'], ts);
  watch(['./src/**/*.scss'], scss);
  watch(['./src/**/*.html'], html);
}

export default watchAll;

export { watchAll as watch, ts, scss, html, build };
