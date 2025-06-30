import gulp from "gulp";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import { deleteAsync } from "del";
import svgSprite from "gulp-svg-sprite";
import webpackStream from "webpack-stream";
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);

function server() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    open: false,
  });
}

function copyFonts() {
  return gulp
    .src("src/fonts/**/*", { base: "src/fonts" })
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream({ once: true }));
}

function watch() {
  gulp.watch(["src/style.scss", "src/scss/*"], styles);
  gulp.watch(["src/js/*"], scripts);
  gulp.watch(["src/img/*"], copy);
  gulp.watch(["src/index.html"], copy);
  gulp.watch(["src/fonts/**/*"], copyFonts);
}

function styles() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer(["last 15 version"]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function copy() {
  return gulp
    .src(["src/index.html", "src/img/**/*", "!src/img/icons/*.svg"], {
      base: "src",
    })
    .pipe(gulp.dest("dist"))
    .pipe(
      browserSync.stream({
        once: true,
      })
    );
}

function clean() {
  return deleteAsync(["dist/**"]);
}

function svg() {
  return gulp
    .src("src/img/icons/*.svg")

    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest("dist/img/"));
}

function scripts() {
  return gulp
    .src("src/js/**/*.js")

    .pipe(
      webpackStream({
        mode: "production",
        module: {
          rules: [
            {
              test: /\.(?:js)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  targets: "defaults",
                  presets: [["@babel/preset-env"]],
                },
              },
            },
          ],
        },
      })
    )

    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"));
}

export { styles, clean, copy, svg, scripts, server, watch };
export default gulp.series(
  clean,
  gulp.parallel(copy, styles, copyFonts, svg, scripts),
  gulp.parallel(server, watch)
);
