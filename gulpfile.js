const { src, dest } = require('gulp');


// 处理文件
exports.file = function() {
  return src('src/**/*.js').pipe(dest('dist'));
}


// 入门指南 - 使用插件篇

// 例子1：压缩文件
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
exports.jsmin = function() {
  return src('src/**/*.js')
    // gulp-uglify 插件并不改变文件名
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest('dist2'));
}

// 例子2
const rollup = require('rollup');
const fs = require('fs');
const path = require('path');
// Rollup 提供了基于 promise 的 API，在 `async` 任务（task）中工作的很好
exports.bundle = async function() {
  const bundle = await rollup.rollup({
    input: 'src/main.js'
  });

  if (!fs.existsSync('dist3')) {
    fs.mkdirSync(path.resolve('./dist3'));
  }

  return bundle.write({
    file: 'dist3/bundle.js',
    format: 'iife'
  });
}

// 例子3：条件插件
const gulpIf = require('gulp-if');
function isJs(file) {
  // 判断文件的扩展名是否是 '.js'
  return file.extname === '.js';
}
exports.jsmin3 = function() {
  // 在同一个管道（pipeline）上处理 JavaScript 和 CSS 文件
  return src(['src/**/*.js', 'src/**/*.css'])
  // 只对 JavaScript 文件应用 gulp-uglify 插件
  .pipe(gulpIf(isJs, uglify()))
  .pipe(dest('dist4'));
}

// 例子4：内联插件 （避免自己创建并维护插件，避免fork已存在插件来修改）
const uglifyJs = require('uglify-js');
const through2 = require('through2');
exports.jsmin2 = function() {
  return src('src/**/*.js')
  .pipe(through2.obj(function(file, _, cb) {
    if (file.isBuffer()) {
      const code = uglifyJs.minify(file.contents.toString())
      file.contents = Buffer.from(code)
    }
    cb(null, file);
  }))
  .pipe(dest('dist5'));
}















