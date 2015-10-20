var express = require("express");
var app = express();
var fs = require('fs');

/* serves all the static files */
app.use(express.static('../dist'));     // set the static files location /public/img will be /img for users

// Fun node-related responses happen on these routes
app.route('/getPerson')
  .get(function(req, res, next) {

    // get a list of file names (employee names)
    var filenames = fs.readdirSync('/repos/namerizer/dist/media/empPhotos');
    if(filenames[0] == '.DS_Store') {
      filenames.splice(0,1);
    }

    // now pull one out at random
    var index = Math.floor(Math.random() * filenames.length);

    // avoid index out of bounds
    if (index === filenames.length) {
      index = index - 1;
    }

    var filename = filenames[index];
    try {
      // split on underscore (second)
      var empName = filename.match(/(.*_.*)_/)[1].replace('_', ' ');
    } catch(e) {
      empName = filename.match(/(.*_.*)\.jpg/)[1].replace('_', ' ');  // split on .jpg
    }

    console.log(empName);
    console.log(filename);


    // now write out an object with the name and picture location.
    res.write('{"name": "' + empName + '", "photo": "' + filename + '"}');
    res.end();
  })

app.route('/getChoices')
  .get(function(req, res, next) {
    // get a list of file names (employee names)
    var filenames = fs.readdirSync('/repos/namerizer/dist/media/empPhotos');
    if(filenames[0] == '.DS_Store') {
      filenames.splice(0,1);
    }

    var employees = [];
    for (var i = 0; i < 3; i++) {
      // now pull one out at random
      var index = Math.floor(Math.random() * filenames.length);

      // avoid index out of bounds
      if (index === filenames.length) {
        index = index - 1;
      }

      var filename = filenames[index];
      console.log(filename);
      var empName;
      try {
        empName = filename.match(/(.*_.*)_/)[1].replace('_', ' ');  // split on underscore (second)
      } catch(e) {
        empName = filename.match(/(.*_.*)\.jpg/)[1].replace('_', ' ');  // split on .jpg
      }
      console.log(empName);
      console.log(filename);

      var emp = {name: empName, photo: filename};
      employees.push(emp);
    }

    // now write out an object with the name and picture location.
    res.write(JSON.stringify(employees));
    res.end();
  });

// This route deals enables HTML5Mode by forwarding missing files to the index.html
  // app.all('/*', function(req, res) {
  //   res.sendFile('/repos/visualCafe/dist/index.html');
  // });

var port = process.env.PORT || 5003;
app.listen(port, function() {
console.log("Listening on " + port);

});
