function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function navbarTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (category, i, subcategory, termdata) {pug_html = pug_html + "\u003Cul class=\"image-search__categories\"\u003E";
for ( category in termdata )
{
var catid = category.toLowerCase().replace(/[^\w]+/g, '-');
pug_html = pug_html + "\u003Cli" + (" class=\"category__item category--actions\""+pug_attr("id", catid, true, false)) + "\u003E\u003Ca href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003E" + (pug_escape(null == (pug_interp = category) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cul class=\"image-search__subcategories\"\u003E";
for ( subcategory in termdata[category] )
{
pug_html = pug_html + "\u003Cli class=\"subcategory__item\"\u003E\u003Cdiv class=\"subcategory__label\"\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = subcategory) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cul class=\"subcategory__terms\"\u003E";
for ( i in termdata[category][subcategory] )
{
var sterm = termdata[category][subcategory][i]
pug_html = pug_html + "\u003Cli" + (" class=\"subcategory__term-item\""+pug_attr("data-id", sterm.id, true, false)+pug_attr("data-emblems", sterm.emblems.join(','), true, false)) + "\u003E\u003Ca" + (" href=\"#\""+pug_attr("data-id", sterm.id, true, false)+pug_attr("data-emblems", sterm.emblems.join(','), true, false)) + "\u003E\u003Cspan class=\"image-term\"\u003E" + (pug_escape(null == (pug_interp = sterm.term) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"image-term__number\"\u003E(" + (pug_escape(null == (pug_interp = sterm.emblems.length) ? "" : pug_interp)) + ")\u003C\u002Fspan\u003E\u003Cspan class=\"image-term__icon\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cdiv class=\"faceting--help\"\u003E(Add to your search criteria by selecting facets within a single subcategory or limit your search criteria by selecting facets across multiple subcategories)\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"category" in locals_for_with?locals_for_with.category:typeof category!=="undefined"?category:undefined,"i" in locals_for_with?locals_for_with.i:typeof i!=="undefined"?i:undefined,"subcategory" in locals_for_with?locals_for_with.subcategory:typeof subcategory!=="undefined"?subcategory:undefined,"termdata" in locals_for_with?locals_for_with.termdata:typeof termdata!=="undefined"?termdata:undefined));;return pug_html;}