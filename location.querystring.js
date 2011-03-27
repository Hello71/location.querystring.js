/*
    Original script title: location.querystring.js, v1.0
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/location.querystring.js
    
    LICENSE: Permission is hereby granted for unrestricted use,
    modification, and redistribution of this script, ONLY under
    the condition that this code comment is kept wholly complete,
    appearing above the script's code body--in all original or
    modified implementations of this script, except those that
    are minified.
*/ 

(function() {

    // If a key appears in the querystring more than once, its value in the resulting collection is an array

    function setValue(instance, key, value) {
        if (!instance.hasOwnProperty(key)) {
            instance[key] = value;
        }
        else if (Object.prototype.toString.call(instance[key]) === '[object Array]') {
            instance[key].push(value);
        }
        else {
            instance[key] = [instance[key], value];
        }
    }
    
    location.$querystring = function(search) {

        var querystring = search || location.search;
        
        if (!querystring) {
            return;
        }
        
        var querystring = decodeURIComponent(querystring),
            pairs = querystring.substring(1).split("&"),
            result = {};
        
        // No pairs
        
        if (!pairs) {
            pairs = [querystring];
        }
        
        for (var i = 0, l = pairs.length; i < l; i++) {
        
            var pair = pairs[i];
        
            // Two consecutive '&' chars
            
            if (!pair) {
                continue;
            }
            
            var separatorIndex = pair.indexOf("=");
            
            // No = value?
            
            if (separatorIndex === -1) {
                setValue(result, pair, undefined);
                continue;
            }
            
            // Note that a key's value may have '=' in it 
            
            var pairSplit = pair.split("=");
            setValue(result, pairSplit[0], pairSplit.splice(1).join("="));
        
        };
        
        return result;

    };
    
})();
