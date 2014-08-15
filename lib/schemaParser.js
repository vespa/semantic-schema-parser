"use strict";

var request = require("request"),
    cheerio = require("cheerio"),
    $;


var scrapper = {
    obj:[],

    findAllEntities: function(){
        var all = $("*"),
            context,
            arr = [],
            count = all.length;
        for(var x=0;x<count;x++){
          var item = $(all[x]);
          if(item.attr("itemtype")){
            arr.push(item);
          }
        }
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
            text: $(props).text().replace(/[\n\t]|\s{2,}/g, "") || false,
            src: $(props).attr("src") || false,
         //   html: $.html(props).replace(/[\n\t]|\s{2,}/g, "")
        }
       // console.log(item.name)
        var temp = {}
        for (var x in obj) {
          if(obj[x]){
            temp[x] = obj[x];
          }
        }

        var objName = ($(props).attr("itemtype"))? $(props).attr("itemtype") : $(props).attr("itemprop");
        item[objName] = temp;
       // item[objName].name = objName;
      } 
      return item;
    },
    countObj: function(obj){
      var ct = 0;
      for(var x in obj){
        ct++;
      }
      return ct;

    },
    myObjects: [],
    generateElementsTree: function(obj){
      var children = $(obj).children(),
          arr = [],
          c = children.length;
      while(c--){
        var child = children[c];
        var item = {}
      if($(child).children().length!== 0){
        var elem = this.generateElementsTree(child);
            item = this.setElementValues(elem, child);
      }else{
        item = this.setElementValues(item, child);
      }
        if(Object.keys(item).length!=0 && item.length !=0){
          if(item.constructor === Object){
            this.myObjects.push(item)
          }
          arr.push(item);
        }
      }
    return arr;
    },
    generateTree: function(obj){
      var objName = this.getItemType(obj),
          tree = {};
      if($(obj).attr("itemprop")){
       objName = $(obj).attr("itemprop");
      }

      tree[objName] = this.generateElementsTree(obj);
      tree[objName] = this.myObjects.reverse();

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
      url = url || "object";          
      this.result[url] = {};
      this.result[url].title =  $("title").text();
      this.result[url].url =  url;
      this.result[url]["elems"]=[];
      while(c--){
        this.myObjects = [];
        var tree = this.generateTree(arr[c]);
        this.result[url]["elems"].push(tree);
      }
      return this.result;
    },
};

var schemaParser = {
    obj:{},
    parseContent: function(content, callback){
      schemaParser.obj = {};
      scrapper.result = {};
      console.log("searching for microdata");
      if(content.constructor === String){
        $ = cheerio.load(content);
      } else{
        $ = content;
      }
      var d = scrapper.parser();
      if(callback){
        var k =Object.keys(d)[0];
        callback(d[k]);
      }
      console.log("Done");
    },
    parseURLs: function(list, callback){
      var url,
          count = list.length;
      if(count > 0 ){
        var url = list[0];
        request(url, function(err, resp, body) {
            console.log("analyzing "+url);
            if (err)
                throw err;
            $ = cheerio.load(body);
            var d = scrapper.parser(url);
            schemaParser.obj = d;
            list.shift();
            schemaParser.parseURLs(list, callback);
            //callback(d);
        });
      }else{
        callback(schemaParser.obj);
        console.log("DONE!")
      }
    }
}
exports.parseURLs = schemaParser.parseURLs;
exports.parseContent = schemaParser.parseContent;
