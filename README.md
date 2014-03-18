# Semantic Schema Parser

A Nodejs modulo who extracts from HTML the http://schema.org micro-data and convert it to a JSON object.

## Install 
npm install semantic-schema-parser

## How use it

set a list of URLs

    var urls  = [
        "http://www.imdb.com/title/tt0096874/",
        "http://www.imdb.com/title/tt0087469/"
        ];
        
Be happy
   
    schema.parseURLs(urls, 
      // set a callback
      function(msg){
       // returns a JSON;
       msg = JSON.stringify(msg);
       // do something
    });







