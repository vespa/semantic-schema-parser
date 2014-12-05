(function() {
    //Declaring variables  
    var fs, schema, filedata;

    //Requiring files
    fs = require('fs');
    schema = require ('../lib/schemaParser');


    var urls  = [
       // "http://www.imdb.com/title/tt0096874/",
        //"https://www.baby.com.br/produtos/tenis-xadrez-grafite-com-velcro-converse-all-star",
        //"http://www.walmart.com.br/produto/Telefonia/iPhone/Apple/413770-Apple-iPhone-4S-8GB-Preto-Desbloqueado",
        //"http://www.foodnetwork.com/recipes/ree-drummond/cajun-chicken-pasta-recipe.html",
        "https://www.iba.com.br/livro-digital-ebook/O-Andar-do-B%C3%AAbado-93b053a9949ea2616a8b7457507a874d",
        //"http://www.ebay.com/itm/Unique-Doctor-Who-3D-TARDIS-Police-Box-Pewter-Tall-PENDANT-Long-Chian-Necklace-/161350182697?pt=Fashion_Jewelry&hash=item2591386729"
        ];


    //Reading files
    schema.parseURLs(urls, function(msg){
       fs.writeFile("../result.json", JSON.stringify(msg), function(err){
          if(err){
            console.log("report: something gones wrong:" +err);
          }else{
            console.log("report generated!");
          }
       });
    });

}).call(this)