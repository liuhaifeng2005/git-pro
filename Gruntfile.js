// 包装函数
/*module.exports = function(grunt) {
    // 任务配置
    grunt.initConfig({
        'hello-world':{}
    });
    // 自定义任务
    grunt.registerTask('hello-world', 'My "asyncfoo" task.', function() {
        grunt.log.writeln('hello world');
    });
    grunt.registerTask('default', ['hello-world']);
};
*/

// module.exports = function (grunt) {//单个压缩文件
//   // 项目配置
//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     uglify: {
//       options: {
//         banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//       },
//       build: {
//         src: 'src/<%=pkg.file %>.js',
//         dest: 'dest/<%= pkg.file %>.min.js'
//       }
//     }
//   });
//   // 加载提供"uglify"任务的插件
//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   // 默认任务
//   grunt.registerTask('default', ['uglify']);
// }

/*module.exports = function (grunt) {//合并文件
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/zepto.js', 'src/index.js', 'src/list.js'],
        dest: 'dest/libs.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 默认任务
  grunt.registerTask('default', ['concat']);
}*/

/*module.exports = function (grunt) {//合并多个文件并压缩
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/zepto.js', 'src/underscore.js', 'src/backbone.js'],
        dest: 'dest/libs.js'
      }
    },
    uglify: {
      build: {
        src: 'dest/libs.js',
        dest: 'dest/libs.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 默认任务
  grunt.registerTask('default', ['concat', 'uglify']);
}*/
module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      "my_target": {
        "files": {
          'dest/lis.js': ['src/calendar.js', 'src/focus-plugin.js', 'src/jquery.easing.min.js', 'src/jquery-1.11.3.js', 'src/jquery-ui.min.js', 'src/login.js', 'src/personal.js', 'src/price-slide.js', 'src/public.js', 'src/search-flight.js', 'src/short-rent.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 默认任务
  grunt.registerTask('default', ['uglify']);
}