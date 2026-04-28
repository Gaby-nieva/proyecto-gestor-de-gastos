const {series, src, dest, watch} = require ('gulp');
const sass = require ('gulp-sass')(require('sass'));


// Función de compilar SASS

function css () {
    return src ('src/scss/app.scss')
    .pipe (sass())
    .pipe (dest ('./build/css'))
}

// Función de Minificar

function minificarcss () {
    return src ('src/scss/app.scss')
    .pipe (sass({
        outputStyle: 'compressed'
    }))
    .pipe (dest('./build/css'))
}

// Función Watch 

function watchArchivos () {
    watch ('src/scss/**/*.scss', css);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos;