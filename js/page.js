function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function pageTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (console, emblems, essaySectionNames, keywords, scholarship, searchTerm, sectionNames, str) {pug_html = pug_html + ("\u003Cdiv class=\"search-results\"\u003E\u003Cp class=\"lead\"\u003ESearch results for \"" + (pug_escape(null == (pug_interp = searchTerm) ? "" : pug_interp)) + "\"\u003C\u002Fp\u003E\u003Cdiv class=\"results\"\u003E" + (pug_escape(null == (pug_interp = console.log('keywords', keywords)) ? "" : pug_interp)) + (pug_escape(null == (pug_interp = console.log('emblems', emblems)) ? "" : pug_interp)) + (pug_escape(null == (pug_interp = console.log('scholarship', scholarship)) ? "" : pug_interp)));
if ( keywords.length )
{
pug_html = pug_html + "\u003Cdiv class=\"results__section\"\u003E\u003Ch2\u003E \u003CEmblem\u003EImages\u003C\u002FEmblem\u003E\u003C\u002Fh2\u003E\u003Cdiv class=\"results__item--image-terms\"\u003E";
// iterate keywords
;(function(){
  var $$obj = keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var kw = $$obj[pug_index0];
pug_html = pug_html + "\u003Ch3\u003E\u003Ca" + (pug_attr("data-facetid", kw.id, true, false)) + "\u003E\u003Cspan class=\"cat-subcat\"\u003E" + (pug_escape(null == (pug_interp = kw.category) ? "" : pug_interp)) + " &#62; " + (pug_escape(null == (pug_interp = kw.subcategory) ? "" : pug_interp)) + " \u003C\u002Fspan\u003E\u003Cspan class=\"term\"\u003E" + (pug_escape(null == (pug_interp = kw.searchTerm) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"num-terms\"\u003E" + (pug_escape(null == (pug_interp = kw.emblems.length) ? "" : pug_interp)) + " emblem images\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fh3\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var kw = $$obj[pug_index0];
pug_html = pug_html + "\u003Ch3\u003E\u003Ca" + (pug_attr("data-facetid", kw.id, true, false)) + "\u003E\u003Cspan class=\"cat-subcat\"\u003E" + (pug_escape(null == (pug_interp = kw.category) ? "" : pug_interp)) + " &#62; " + (pug_escape(null == (pug_interp = kw.subcategory) ? "" : pug_interp)) + " \u003C\u002Fspan\u003E\u003Cspan class=\"term\"\u003E" + (pug_escape(null == (pug_interp = kw.searchTerm) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"num-terms\"\u003E" + (pug_escape(null == (pug_interp = kw.emblems.length) ? "" : pug_interp)) + " emblem images\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fh3\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
if ( emblems.length ) 
{
pug_html = pug_html + "\u003Cdiv class=\"results__section\"\u003E\u003Ch2\u003E\u003Ccite\u003EAtalanta fugiens\u003C\u002Fcite\u003E\u003C\u002Fh2\u003E";
// iterate emblems
;(function(){
  var $$obj = emblems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var emb = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv class=\"results__item\"\u003E\u003Ch3\u003E\u003Ca" + (pug_attr("href", emb.uri, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = emb.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fh3\u003E\u003Cspan class=\"results__num\"\u003E" + (pug_escape(null == (pug_interp = emb.resultcount) ? "" : pug_interp)) + " search hits\u003C\u002Fspan\u003E";
// iterate sectionNames
;(function(){
  var $$obj = sectionNames;
  if ('number' == typeof $$obj.length) {
      for (var sec = 0, $$l = $$obj.length; sec < $$l; sec++) {
        var secname = $$obj[sec];
if ( sec in emb.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
// iterate emb.contexts[sec]
;(function(){
  var $$obj = emb.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var cxt = $$obj[pug_index3];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index3];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var sec in $$obj) {
      $$l++;
      var secname = $$obj[sec];
if ( sec in emb.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
// iterate emb.contexts[sec]
;(function(){
  var $$obj = emb.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var cxt = $$obj[pug_index4];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index4];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var emb = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv class=\"results__item\"\u003E\u003Ch3\u003E\u003Ca" + (pug_attr("href", emb.uri, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = emb.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fh3\u003E\u003Cspan class=\"results__num\"\u003E" + (pug_escape(null == (pug_interp = emb.resultcount) ? "" : pug_interp)) + " search hits\u003C\u002Fspan\u003E";
// iterate sectionNames
;(function(){
  var $$obj = sectionNames;
  if ('number' == typeof $$obj.length) {
      for (var sec = 0, $$l = $$obj.length; sec < $$l; sec++) {
        var secname = $$obj[sec];
if ( sec in emb.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
// iterate emb.contexts[sec]
;(function(){
  var $$obj = emb.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var cxt = $$obj[pug_index6];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index6];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var sec in $$obj) {
      $$l++;
      var secname = $$obj[sec];
if ( sec in emb.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
// iterate emb.contexts[sec]
;(function(){
  var $$obj = emb.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var cxt = $$obj[pug_index7];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index7];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
if ( scholarship.length )
{
pug_html = pug_html + (pug_escape(null == (pug_interp = console.log("Scholarship", scholarship)) ? "" : pug_interp)) + "\u003Cdiv class=\"results__section\"\u003E\u003Ch2\u003E\u003CScholarly\u003EEssays\u003C\u002FScholarly\u003E\u003C\u002Fh2\u003E";
// iterate scholarship
;(function(){
  var $$obj = scholarship;
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var essay = $$obj[pug_index8];
pug_html = pug_html + "\u003Cdiv class=\"results__item\"\u003E" + (pug_escape(null == (pug_interp = console.log('essay', essay)) ? "" : pug_interp)) + "\u003Ch3\u003E\u003Ca" + (pug_attr("href", essay.uri, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = essay.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fh3\u003E\u003Cspan class=\"results__num\"\u003E" + (pug_escape(null == (pug_interp = essay.resultcount) ? "" : pug_interp)) + " search hits\u003C\u002Fspan\u003E";
// iterate essaySectionNames
;(function(){
  var $$obj = essaySectionNames;
  if ('number' == typeof $$obj.length) {
      for (var sec = 0, $$l = $$obj.length; sec < $$l; sec++) {
        var secname = $$obj[sec];
if ( sec in essay.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
if (( 'subtitle' == sec )) {
pug_html = pug_html + "\u003Ci\u003E" + (pug_escape(null == (pug_interp = essay.title +':') ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
}
// iterate essay.contexts[sec]
;(function(){
  var $$obj = essay.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index10 = 0, $$l = $$obj.length; pug_index10 < $$l; pug_index10++) {
        var cxt = $$obj[pug_index10];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index10 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index10];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var sec in $$obj) {
      $$l++;
      var secname = $$obj[sec];
if ( sec in essay.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
if (( 'subtitle' == sec )) {
pug_html = pug_html + "\u003Ci\u003E" + (pug_escape(null == (pug_interp = essay.title +':') ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
}
// iterate essay.contexts[sec]
;(function(){
  var $$obj = essay.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index11 = 0, $$l = $$obj.length; pug_index11 < $$l; pug_index11++) {
        var cxt = $$obj[pug_index11];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index11 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index11];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var essay = $$obj[pug_index8];
pug_html = pug_html + "\u003Cdiv class=\"results__item\"\u003E" + (pug_escape(null == (pug_interp = console.log('essay', essay)) ? "" : pug_interp)) + "\u003Ch3\u003E\u003Ca" + (pug_attr("href", essay.uri, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = essay.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fh3\u003E\u003Cspan class=\"results__num\"\u003E" + (pug_escape(null == (pug_interp = essay.resultcount) ? "" : pug_interp)) + " search hits\u003C\u002Fspan\u003E";
// iterate essaySectionNames
;(function(){
  var $$obj = essaySectionNames;
  if ('number' == typeof $$obj.length) {
      for (var sec = 0, $$l = $$obj.length; sec < $$l; sec++) {
        var secname = $$obj[sec];
if ( sec in essay.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
if (( 'subtitle' == sec )) {
pug_html = pug_html + "\u003Ci\u003E" + (pug_escape(null == (pug_interp = essay.title +':') ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
}
// iterate essay.contexts[sec]
;(function(){
  var $$obj = essay.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index13 = 0, $$l = $$obj.length; pug_index13 < $$l; pug_index13++) {
        var cxt = $$obj[pug_index13];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index13 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index13];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var sec in $$obj) {
      $$l++;
      var secname = $$obj[sec];
if ( sec in essay.contexts )
{
pug_html = pug_html + "\u003Ch4\u003E" + (pug_escape(null == (pug_interp = secname) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cul\u003E";
if (( 'subtitle' == sec )) {
pug_html = pug_html + "\u003Ci\u003E" + (pug_escape(null == (pug_interp = essay.title +':') ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
}
// iterate essay.contexts[sec]
;(function(){
  var $$obj = essay.contexts[sec];
  if ('number' == typeof $$obj.length) {
      for (var pug_index14 = 0, $$l = $$obj.length; pug_index14 < $$l; pug_index14++) {
        var cxt = $$obj[pug_index14];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index14 in $$obj) {
      $$l++;
      var cxt = $$obj[pug_index14];
pug_html = pug_html + "\u003Cli\u003E";
var i = 0
while (i < cxt.length) {
str = cxt[i]
if ( i % 2 )
{
pug_html = pug_html + "\u003Cb\u003E" + (pug_escape(null == (pug_interp = str) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
}
else
{
pug_html = pug_html + (pug_escape(null == (pug_interp = str) ? "" : pug_interp));
}
i++
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"console" in locals_for_with?locals_for_with.console:typeof console!=="undefined"?console:undefined,"emblems" in locals_for_with?locals_for_with.emblems:typeof emblems!=="undefined"?emblems:undefined,"essaySectionNames" in locals_for_with?locals_for_with.essaySectionNames:typeof essaySectionNames!=="undefined"?essaySectionNames:undefined,"keywords" in locals_for_with?locals_for_with.keywords:typeof keywords!=="undefined"?keywords:undefined,"scholarship" in locals_for_with?locals_for_with.scholarship:typeof scholarship!=="undefined"?scholarship:undefined,"searchTerm" in locals_for_with?locals_for_with.searchTerm:typeof searchTerm!=="undefined"?searchTerm:undefined,"sectionNames" in locals_for_with?locals_for_with.sectionNames:typeof sectionNames!=="undefined"?sectionNames:undefined,"str" in locals_for_with?locals_for_with.str:typeof str!=="undefined"?str:undefined));;return pug_html;}