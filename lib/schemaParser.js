"use strict";

var request = require("request"),
    cheerio = require("cheerio"),
    $;


var scrapper = {
    obj:[],
    /*
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
          newNode.htmlText = $.html(node);
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
          html : $(props).html() || false,
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
    genereteTree: function(obj){
        var findScope = obj,
        //var findScope = this.findScope(),
            tree = {};
            console.log($(findScope).attr())
        if(findScope){
            var scopename = this.getItemType(findScope);
                tree = {};
            tree.name = scopename;
            tree[scopename] = this.getScopes(findScope);
            tree[scopename] = this.getProps(tree[scopename], findScope);
        }
       return tree;
    },
    get: function(){        
        var entity = this.genereteTree();
        return entity;
    },
    */
    findAllEntities: function(){
        var all = $("*"),
            context,
            arr = [],
            count = all.length;
        for(var x=0;x<count;x++){
          var item = $(all[x]);
          if(item.attr("itemtype")){
            arr.push(item);
            //$(item).remove();
          }
        }
        //console.log(arr.length)
        return arr.reverse();
    },
    setElementValues: function(item, props){
      if($(props).attr("itemprop") || $(props).attr("itemtype")||$(props).attr("itemscope")){
        var obj = {
            itemtype : $(props).attr("itemtype") || false,
            itemscope :  $(props).attr("itemscope") || false,
            itemprop : $(props).attr("itemprop") || false,
            href : $(props).attr("href") || false,
            content : $(props).attr("content") || false,
            text: $(props).text() || false,
            src: $(props).attr("src") || false
        }
        var objName = ($(props).attr("itemtype"))? $(props).attr("itemtype") : $(props).attr("itemprop");
        item[objName] = obj;
        item[objName].name = objName;
      }   
      return item;
    },
    generateElementsTree: function(obj){
      var children = $(obj).children(),
          arr = [],
          c = children.length;
      while(c--){
        var child = children[c];
       //   if($(child).attr("itemprop") || $(child).attr("itemtype") || $(child).attr("itemscope") ){
       // if(typeof $(child).attr("itemprop") !== "undefined" && typeof $(child).attr("itemscope") !== "undefined" && typeof $(child).attr("itemtype") !== "undefined" ){
          var item = {}
          if($(child).children().length!== 0){
            var elem = this.generateElementsTree(child);
            item = elem;
          }else{
            item = this.setElementValues(item, child);
          }
          arr.push(item);
       //}
      }
      return arr.reverse();
    },
    generateTree: function(obj){
      var objName = this.getItemType(obj),
          tree = {};

      tree[objName] = this.generateElementsTree(obj);
      return tree;

    },
    getItemType: function(obj){
      var objName = $(obj).attr("itemtype");
      if(typeof objName!== "undefined"){
        return objName.substring((objName.lastIndexOf("/")+1), objName.length).toLowerCase();
      } else{
        return $(obj).attr("itemprop");
      }
    },
    result:{},
    parser: function(url){
      var entity = {},
          arr = this.findAllEntities(),
          c = arr.length;
      this.result[url] = {};
      this.result[url].title =  $("title").text();
      this.result[url].url =  url;
      this.result[url]["elems"]=[];
      while(c--){
         var tree = this.generateTree(arr[c]);
        this.result[url]["elems"].push(tree);
      }
      return JSON.stringify(this.result);
    }
};
var schemaParser = {
    parser: function(list, callback){
        var url,
            count = list.length;
        //
        while(count--){
            url = list[count];
            request(url, function(err, resp, body) {
                if (err)
                    throw err;
                $ = cheerio.load(body);

                var d = scrapper.parser(url);
                callback(d);
            });
        }
    }
}
exports.parser = schemaParser.parser;
