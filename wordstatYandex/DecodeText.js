function decode(userAgent, d, k) {
    var key = userAgent.substr(0, 25) + (null || "") + eval(k);
    var edata = "";
    for (var i = 0; i < d.length; i++) {
        edata = edata + String.fromCharCode(d.charCodeAt(i) ^ key.charCodeAt(i % key.length))
    }
    var bemJson = {
        content: ""
    };
   return edata
    if (edata.match("^%7B.*%7D$")) {
        try {
            edata = decodeURIComponent(edata);
            console.log(edata)
            return edata
        } catch (e) {
            return e
        }
    }
}



