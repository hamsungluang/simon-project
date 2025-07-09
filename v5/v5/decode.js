const CryptoJS = require('crypto-js');

function aes_decrypt(a, b) {
    b = CryptoJS.enc.Utf8.parse(b);
    var c = CryptoJS.enc.Base64.parse(a).toString(CryptoJS.enc.Hex);
    a = CryptoJS.enc.Hex.parse(c.slice(0, 32));
    c = CryptoJS.enc.Hex.parse(c.slice(32));
    a = {
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding,
        iv: a
    };
    b = CryptoJS.AES.decrypt(c.toString(CryptoJS.enc.Base64), b, a);
    try {
        return b.toString(CryptoJS.enc.Utf8)
    } catch (e) {
        throw "Token is wrong or expired.";
    }
}
f = function(e, n) {
                var a = [];
                n = n["charCodeAt"](n["length"] - 1) % 2;
                for (var r = e["length"]; n < r; n += 2) {
                    a["push"](e["charAt"](n));
                }
                return a.join("");
            };;;
function  decode(t,token){
    r = t.substring(0, 32), e = t.substring(32);
                        t = f(r, token);
                        e = aes_decrypt(e, t);
                        return e
}


console.log(decode("LRen77g62a/+bxcTnWDrN61DAGkvF1VHxMvRwfMgZl/jh7sZB85Kf+I+w7iNaQ7P6pBqRN86UeOaLD4BeKw43cMRXfiTwMWsSvY1yVhlr8Jr+CnL9HePf0qnrs6T67Q6Uc55GjggcoopdMxb/MOzHXYzQC/cs9KT+1k0nvL7iYeqQa2NYY5Qwl2OKabF+LBUo1kGe+AOwLvfflMq3kNhSOX48W1zpcVi0a7C6ji/8cpQCMPE0G9Uqvn8wQEkK7L3JUU2Nx+/6WJdJFb76qhCQJPKskGSTFtVQT11P0XviucR7oX31jWNnZ54BUk4GGazrBC4KBnEnOlj5S07518PgWq/DpFFa6Zadh2XgtK6U1BJfjmceaiCs0dQhDjIXw==","2b6bc66514cf4ed89f872aa6c6c56b83"))