/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    exec: {
      config: {
        report: "yes",
        coder: "yes"
      },
      diff: {
        command: function() {
          if(this.config('exec.config.report') === "yes") {
            var email = this.option('e') || 'your@email.com';
            var url = this.option('u') || 'http://url.to.diffux/';
            var pid = this.option('p') || ''; // Diffux Project ID
            var title = this.option('t') || 'Diffux report';
            var delay = this.option('d') || '5';
            out = "curl  --header \"Accept: application/json\"";
            out += " --header \"Content-Type: application/json\" --data '{\"title\":\"";
            out += title + "\", \"description\": \"Diffux report\",\"delay_seconds\":";
            out += delay;
            if (email !== '') {
              out += ",\"email\": \"" + email + "\"";
            }
            out += "}' " + url + "/en/projects/" + pid + "/sweeps/trigger";
            return  out;
          } else {
            return "echo";
          }
        },
        callback: function showURL(err, stdout, stderr) {
          if(typeof stderr !== 'undefined' && stderr !== "") {
            console.log("\n\nThere was an error: " + stderr + "\n");
          } else if(stdout === "\n") {
            console.log("no report generated");
          } else {
            data = JSON.parse(stdout);
            console.log("\n\nYou can View your Diffux report here:\n" + data.url + "\n");
          }
        },
        stdout: false,
      },
      prompt: {
        reports: {
          options: {
            questions: [
              {
                config: 'exec.config.report',
                type: 'boolean',
                message: 'Would you like a Diffux report?',
                default: 'no',
                choices: ['yes', 'no'],
              }
            ]
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('report', ['prompt:reports','exec:diff']);
};
