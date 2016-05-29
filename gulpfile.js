var exec = require('child_process').exec,
    gulp = require('gulp');

gulp.task('watch',['compile'],function(){
    gulp.watch(['./src/*.ts','./src/*.tsx','./src/**/*.tsx','./src/**/*.ts'],['compile']);
});

gulp.task('compile',function(){
    exec('tsc -p .',function(err,stdout,stderr){
        if (!err){
             exec('jspm bundle-sfx es6/main.js dist/scripts/app.bundle.js',function(err,stdout,stderr){
                 if (err){
                    console.log(err);
                    return; 
                 }
            });
        }else {
            console.log(err);
        }
    });
});