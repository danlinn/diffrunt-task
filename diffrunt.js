/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    exec: {
      diff: {
        command: function() {
          var email = this.option('e') || 'your@address.com'; // Email flag
          var url = this.option('u') || 'diffux.yourserver.com'; // Diffux server URL flag
          var pid = this.option('p') || '1'; // Diffux project ID flag
          var title = this.option('t') || 'DC Diffux report'; // Title flag
          var delay = this.option('d') || '2'; // Delay is seconds flag
          out = "curl  --header \"Accept: application/json\"";
          out += "--header \"Content-Type: application/json\" --data '{\"title\":\"";
          out += title + "\", \"description\": \"Diffux report\",\"delay_seconds\":";
          out += delay;
          if (email !== '') {
            out += ",\"email\": \"" + email + "\"";
          }
          out += "}' " + url + "/en/projects/" + pid + "/sweeps/trigger";
          return  out;
        },
        callback: function showURL(err, stdout, stderr) {
          if(typeof stderr !== 'undefined' && stderr !== "") {
            console.log("\n\nThere was an error: " + stderr + "\n");
          }
          data = JSON.parse(stdout);
          console.log("\n\nYou can View your Diffux report here:\n" + data.url + "\n");
        },
        stdout: false,
      },
    }
  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('drupal', ['exec:coder']);
};
