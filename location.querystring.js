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
            
            var seperatorIndex = pair.indexOf("=");
            
            // No = value?
            
            if (seperatorIndex === -1) {
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