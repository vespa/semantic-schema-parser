(function() {
    //Declaring variables  
    var fs, schema, filedata;

    //Requiring files
    fs = require('fs');
    schema = require ('./schemaParser');

    //Reading files
    schema.parser();
    /*
    fs.readFile(process.argv[2],'utf8',function(err,data){
      if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
     }

     //Calling replacement function
     filedata = schema.parser(data,process.argv[3],process.argv[4]);

     //Writing replaced text into a new file
    fs.writeFile("../out.txt", filedata, function(err){
            if(err) {
                console.error("Error saving file", err);
                process.exit(1);
            }
            console.log('out.txt file saved!');
        });

    });
    schema.drone();
    */

}).call(this)