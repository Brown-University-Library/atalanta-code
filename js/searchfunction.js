var ataIdx, keyWords, idxDocs;
var doSearch;

Promise.all([
    $.get('../data/json/searchindex.json', data => ataIdx = lunr.Index.load(data), 'json'),
    $.get('../data/json/byterm_enh_array.json', data => keyWords = data),
    $.get('../data/json/searchdocs.json', data => idxDocs = data),]).then(vals => {
        doSearch = function(searchTerm) {
            var outp = {
                'keywords': [],
                'emblems': [],
                'scholarship': [],
                'searchTerm': searchTerm,
                'sectionNames': sectionNames,
            };
            
            var kwMatches = [];
        
            searchTerm.split(' ').forEach(val => {
                newkw = keyWords.filter(kw => kw.searchTerm.toLowerCase().includes(val.toLowerCase()));
                kwMatches = kwMatches.concat(newkw);
            })
        
            outp['keywords'] = kwMatches;
            

            var results = ataIdx.search(searchTerm);
            
            //results.sort( (a, b) => { return a.ref > b.ref ? 1: -1; })
            
            //console.log('results', results)
            
            results.forEach((val, i) => {  //For each emblem/essay returned by the search engine.
                //Remove?:
                var resultcount = 0;
        
                var thisdoc = idxDocs.filter(doc => doc.id==val.ref)[0];        
                var allresults = {};
                for (term in val.matchData.metadata) {  //Each search term matched in this essay.
                    for ( section in val.matchData.metadata[term] ) { //Each section the term is found in.
                        if ( !(section in allresults) ) allresults[section] = [];
        
                        var positions = val.matchData.metadata[term][section]['position'];
                        resultcount += positions.length;
                        
                        var text = thisdoc[section];
                        //Remove?:
                        var contexts = [];
                        positions.forEach(val => {
                            pos = val[0];
                            matchword = text.substr(pos).split(' ')[0];
                            poststart = pos + (matchword.length);
                            
                            allresults[section].push({
                                term: term,
                                startpos: pos,
                                matchword: matchword,
                                endpos: poststart,
                            });
                        });
                    }
                }
                
                //Another temp array/intermediary step:
                var mergedresults = {};
                //Final result returned as part of our output:
                var searchcontexts = {};
                for (section in allresults) {
                    mergedresults[section] = [];
                    searchcontexts[section] = [];

                    //The original indexed text for the section where these search results live.
                    var text = thisdoc[section];
                    
                    //Sort each section in allresults by position.
                    allresults[section].sort( (a, b) => {
                        return a.startpos - b.startpos;
                    });
                    
                    //Put each set of closely-grouped hits together in an array.
                    allresults[section].forEach( (val, i, arr) => {
                        //Put the first entry in a new array in the output.
                        if ( 0 == i ) mergedresults[section].push([val]);
                        //If this hit is within MERGE_DISTANCE characters of the last one,
                        //put it in the same array.
                        else if ( (val.startpos - arr[i-1].startpos) < MERGE_DISTANCE ) {
                            mergedresults[section][mergedresults[section].length-1].push(val);
                        //Otherwise, create a new array containing just this hit.
                        } else {
                            mergedresults[section].push([val]);
                        }
                    });
                    //console.log(mergedresults[section])
                    //Cycle through mergedresults and insert context text for each hit.
                    mergedresults[section].forEach( (val) => {
                        //
                        var newctx = [];
                        

                        val.forEach( (mtch, i, mtchs) => {
                            var pos = mtch.startpos;
                            if ( 0 == i ) {
                                prefstart = Math.max(0, pos - SURROUNDING_CHARACTERS);
                                preflen = pos - prefstart;
                                prefix = text.substr(prefstart, preflen).split(' ');
                                if ( prefstart > 0 ) prefix.shift();
                                newctx.push(prefix.join(' '));
                            } else {
                                //Add everything from <last>.endpos to val.startpos.
                                var lastend = mtchs[i-1].endpos;
                                var dist = mtch.startpos - lastend;
                                newctx.push(text.substr(lastend, dist));
                            }
                            
                            newctx.push(mtch.matchword);
                            
                            //Is this the last element?
                            if ( mtchs.length == (i+1) ) {
                                //Also add the "suffix"
                                postend = Math.min(text.length, mtch.endpos+SURROUNDING_CHARACTERS);
                                postlen = postend - mtch.endpos;
                                suffix = text.substr(mtch.endpos, postlen).split(' ');
                                if ( text.length != postend ) suffix.pop();
                                suffix = suffix.join(' ');
        
                                newctx.push(suffix);
                            }
                        });
                        searchcontexts[section].push(newctx);
                        //console.log(searchcontexts[section]);
                    });
                }
        
                thisoutp = {
                    contexts: searchcontexts,
                    uri: '/'+val.ref,
                    title: thisdoc.doctitle,
                    type: thisdoc.type,
                    resultcount: resultcount,
                }
                
                if ( 'emblem' == thisoutp.type ) {
                    outp.emblems.push(thisoutp);
                } else {
                    outp.scholarship.push(thisoutp);
                }
            });
            console.log(outp);
            return outp;
        }

        var evt = new CustomEvent('atalantaSearchLoad', { detail: {state: 'ready' }});
        window.dispatchEvent(evt);
    }).catch(err => {
        //Fail.
        doSearch = function(searchTerm) { return false };
        var evt = new CustomEvent('atalantaSearchLoad', { detail: {state: 'fail', error: err }});
        window.dispatchEvent(evt);
    });