function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function filterselectionTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (category, filterData, i, j, k, subcat, term) {pug_html = pug_html + "\u003C!--This is ugly and should be broken up into 2-3 files.--\u003E\u003Cli class=\"para\"\u003E(\u003C\u002Fli\u003E";
for ( i in filterData )
{
category = filterData[i];
for ( j in category['subcategories'] )
{
subcat = category['subcategories'][j]
for ( k in subcat['terms'] )
{
term = subcat['terms'][k]
pug_html = pug_html + "\u003Cli class=\"term\"\u003E\u003Ca href=\"#\"\u003E\u003Cspan" + (" class=\"selected-filter\""+pug_attr("data-id", term.id, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = category.name) ? "" : pug_interp)) + " &rarr; " + (pug_escape(null == (pug_interp = subcat.name) ? "" : pug_interp)) + " &rarr; " + (pug_escape(null == (pug_interp = term.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
if ( k < (subcat['terms'].length - 1) )
{
pug_html = pug_html + "\u003Cli class=\"bool\"\u003Eor\u003C\u002Fli\u003E";
}
}
if ( j < (category['subcategories'].length - 1) )
{
pug_html = pug_html + "\u003Cli class=\"para\"\u003E)\u003C\u002Fli\u003E\u003Cli class=\"bool\"\u003Eand\u003C\u002Fli\u003E\u003Cli class=\"para\"\u003E(\u003C\u002Fli\u003E";
}
}
if ( i < (filterData.length - 1) )
{
pug_html = pug_html + "\u003Cli class=\"para\"\u003E)\u003C\u002Fli\u003E\u003Cli class=\"bool\"\u003Eand\u003C\u002Fli\u003E\u003Cli class=\"para\"\u003E(\u003C\u002Fli\u003E";
}
}
pug_html = pug_html + "\u003Cli class=\"para\"\u003E)\u003C\u002Fli\u003E\u003Cli class=\"reset-button\"\u003E\u003Cbutton type=\"button\" id=\"reset-button\"\u003EReset Filters\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";}.call(this,"category" in locals_for_with?locals_for_with.category:typeof category!=="undefined"?category:undefined,"filterData" in locals_for_with?locals_for_with.filterData:typeof filterData!=="undefined"?filterData:undefined,"i" in locals_for_with?locals_for_with.i:typeof i!=="undefined"?i:undefined,"j" in locals_for_with?locals_for_with.j:typeof j!=="undefined"?j:undefined,"k" in locals_for_with?locals_for_with.k:typeof k!=="undefined"?k:undefined,"subcat" in locals_for_with?locals_for_with.subcat:typeof subcat!=="undefined"?subcat:undefined,"term" in locals_for_with?locals_for_with.term:typeof term!=="undefined"?term:undefined));;return pug_html;}