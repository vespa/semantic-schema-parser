# Semantic Schema Parser

A Nodejs module to extract http://schema.org micro-data from HTML and convert it in a JSON object. 
## Install 
    npm install semantic-schema-parser

## How use it

    //set a list of URLs
    var schema = require("semantic-schema-parser");
    var urls  = [
        "http://www.imdb.com/title/tt0096874/",
        "http://www.imdb.com/title/tt0087469/"
        ];
        
    //Be happy
   
    schema.parseURLs(urls, 
      // set a callback
      function(msg){
       // returns a JSON;
       msg = JSON.stringify(msg);
       // do something
    });

You also can send the content you want to parse as a string using the parseContent function:

      var schema = require("semantic-schema-parser");
      var myString = "<html><head></head><body>...etc...</body></html>"
      schema.parseContent(myString, function(msg){
          // returns a JSON;
          msg = JSON.stringify(msg);
          // do something
      });
      
## Example
Get in the example folder and run the command
  node main.js

The example will create a file named result.json based in a URLs list. That file have a text example of the generated JSON object. 

Probably , It'll be something like that:

    {

      "http://www.ebay.com/itm/Doctor-Who-3D-TARDIS-Police-Box-Pewter-Tall-PENDANT-20-Long-Chain-Necklace-/331098975095?pt=LH_DefaultDomain_0&hash=item4d17096b77": {
          "title": " Doctor Who 3D Tardis Police Box Pewter Tall Pendant 20\" Long Chain Necklace | eBay ",
          "url": "http://www.ebay.com/itm/Doctor-Who-3D-TARDIS-Police-Box-Pewter-Tall-PENDANT-20-Long-Chain-Necklace-/331098975095?pt=LH_DefaultDomain_0&hash=item4d17096b77",
          "elems": [
              {
                  "product": [
                      {
                          "image": {
                              "itemprop": "image",
                              "src": "http://i.ebayimg.com/00/s/MTMzNVgxNjAw/z/GJAAAOxy63FSxgzz/$_35.JPG"
                          }
                      },
                      {
                          "image": {
                              "itemprop": "image",
                              "src": "http://i.ebayimg.com/00/s/MTMzNVgxNjAw/z/GJAAAOxy63FSxgzz/$_35.JPG"
                          }
                      },
                      {
                          "price": {
                              "itemprop": "price",
                              "text": "US $2.99"
                          }
                      },
                      {
                          "availability": {
                              "itemprop": "availability",
                              "content": "http://schema.org/InStock"
                          }
                      },
                      {
                          "priceCurrency": {
                              "itemprop": "priceCurrency",
                              "content": "USD"
                          }
                      },
                      {
                          "name": {
                              "itemprop": "name",
                              "text": "Doctor Who 3DTARDIS Police Box Pewter"
                          }
                      },
                      {
                          "name": {
                              "itemprop": "name",
                              "text": " Tall PENDANT 20\" LongChain Necklace "
                          }
                      }
                  ]
              },
              {
                  "offers": [
                      {
                          "price": {
                              "itemprop": "price",
                              "text": "US $2.99"
                          }
                      },
                      {
                          "availability": {
                              "itemprop": "availability",
                              "content": "http://schema.org/InStock"
                          }
                      },
                      {
                          "priceCurrency": {
                              "itemprop": "priceCurrency",
                              "content": "USD"
                          }
                      }
                  ]
              }
          ]
      }
    }



