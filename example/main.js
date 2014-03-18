(function() {
    //Declaring variables  
    var fs, schema, filedata;

    //Requiring files
    fs = require('fs');
    schema = require ('../lib/schemaParser');


    var urls  = [
        "http://www.imdb.com/title/tt0096874/",
        "https://www.baby.com.br/produtos/tenis-xadrez-grafite-com-velcro-converse-all-star",
        "http://www.walmart.com.br/produto/Telefonia/iPhone/Apple/413770-Apple-iPhone-4S-8GB-Preto-Desbloqueado",
        "http://www.foodnetwork.com/recipes/ree-drummond/cajun-chicken-pasta-recipe.html",
        "https://www.iba.com.br/revista-digital/Computer-Arts-Brasil-Mar%C3%A7o-2014-79-f574542cc39d3cb876bacca97bb39689",
        "http://www.ebay.com/itm/Doctor-Who-3D-TARDIS-Police-Box-Pewter-Tall-PENDANT-20-Long-Chain-Necklace-/331098975095?pt=LH_DefaultDomain_0&hash=item4d17096b77"
        ];



    //Reading files
    schema.parseURLs(urls, function(msg){
       fs.writeFile("../result.json", msg, function(err){
          if(err){
            console.log("report: something gones wrong:" +err);
          }else{
            console.log("report generated!");
          }
       });
    });

}).call(this)