"use strict";

var request = require("request"),
    cheerio = require("cheerio"),
    $;


var scrapper = {
    obj:[],
  //  DoomTree: document.cloneNode(true),
    getEntity: function(frag, type){
        var all = $(frag).find("*"),
            context,
            count = all.length;
        for(var x=0;x<count;x++){
          var item = $(all[x]);
          if(item.attr(type)){
            $(item).remove();
            return item;
            break;
          }
        }
        return false;
    },
    getScopes: function(obj){
      var tree = [],
          node = true;
      while(node){
        node = this.getEntity(obj, "itemtype");
        if(node!== false){
          var itemType = this.getItemType(node),
              newNode = {};
          newNode.itemType = itemType;
         // newNode.htmlText = $.html(node);
          newNode = this.getProps(newNode, node);
          tree.push(newNode);
        }
      }
      return tree;
    },
    getProps: function(obj, props){
      var p = $(props).children(),
          x = p.length,
          find = "itemprop";
        //console.log($(props).attr())
        //console.log(x);
      while(x--){
        if(p[x]){

          var itemName = $(p[x]).attr(find);
          if(itemName){
            obj[itemName] = this.parseProps(p[x]);
          }
        }
      }
      return obj;
    },
    parseProps: function(props){
      var value = $(props).children().first().text(),
          tmp = {};

      value = (value.replace(/\s|%20/g, "") !== "")? value: false;

      var obj = {
       //   html : $(props).html() || false,
          value: value,
          itemprop : $(props).attr("itemprop") || false,
          href : $(props).attr("href") || false,
          content: $(props).text() || false,
          src: $(props).attr("src") || false
      };
      for (var x in obj){
        if(obj[x]){
          tmp[x] = obj[x];
        }
      }
      return tmp;
    },
    getItemType: function(obj){
      var objName = $(obj).attr("itemtype");
      return objName.substring((objName.lastIndexOf("/")+1), objName.length).toLowerCase();
    },
    findScope: function(){
        var scope = $("*"),
            c = scope.length;
        for (var x=0; x <c;x++){
            if(typeof scope[x].attribs.itemscope !=="undefined"){
                return scope[x];
            };
        };
        return false;
    },
    genereteTree: function(){
        var findScope = this.findScope(),
            tree = {};
        if(findScope){
            var scopename = this.getItemType(findScope);
                tree = {};
            tree[scopename] = this.getScopes(findScope);
            tree[scopename] = this.getProps(tree[scopename], findScope);
        }
       return tree;
    },

    get: function(body, url){
        $ = cheerio.load(body);
        var entity = {};
        entity[url] = this.genereteTree();
        entity[url].title =  $("title").text();
        entity[url].url =  url;
        return JSON.stringify(entity);
    }
};
var schemaParser = {
    parser: function(){
        var url,
            list = [
            "http://www.imdb.com/title/tt0096874/"
            ],
            count = list.length;
        //
        while(count--){
            url = list[count];
            request(url, function(err, resp, body) {
                if (err)
                    throw err;
                var d = scrapper.get(body, url);
            });
        }
    }
}

exports.parser = schemaParser.parser;
