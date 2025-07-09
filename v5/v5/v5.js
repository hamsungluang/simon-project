const cryptoJS = require('crypto-js');
const CryptoJS = require('crypto-js');
function generateRequestID() {
    var timestamp = Date.now();  // 获取当前时间戳（毫秒）
    return "Req_" + timestamp;   // 将时间戳添加到原始字符串中
}
function encryptData(e, t) {
    // 生成 16 字节的随机字符串（WordArray 格式）
    let n = cryptoJS.lib.WordArray.random(16);
    if (n.sigBytes !== 16) {
        throw new Error("wrong:" + n.toString());
    }

    // 将 t 转换为 Utf8 格式
    t = cryptoJS.enc.Utf8.parse(t);

    // 使用 AES 加密数据 e
    let encrypted = cryptoJS.AES.encrypt(e, t, {
        mode: cryptoJS.mode.CTR,
        padding: cryptoJS.pad.NoPadding,
        iv: n
    });

    // 将加密结果与随机生成的 iv 连接起来
    let result = n.concat(encrypted.ciphertext);

    // 返回 Base64 编码的结果
    return cryptoJS.enc.Base64.stringify(result);
}



f = function(e, n) {
                var a = [];
                n = n["charCodeAt"](n["length"] - 1) % 2;
                for (var r = e["length"]; n < r; n += 2) {
                    a["push"](e["charAt"](n));
                }
                return a.join("");
            };;;

function getParam(token){
    i=token;
o=token;
e = f(i, o)
reqid=generateRequestID()
n='{"requestId":'+reqid+',"command":"7051CA8BF3E64DEDAA9334620DA8F5F1","data":{"l":'+token+',"f":"8c66b0256498b0b2958897b32e2dba8d5f4839d2","m":"9ac54a83a201403b95d26592de7dd246","j":"ES5","tl":0,"o":{"spm":"9ac54a83a201403b95d26592de7dd246","v5lid":"2CkGS3SmiJliSxBiIXf1Gsfbv9Ghj7Vq","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36","language":"zh-CN","colorDepth":24,"deviceMemory":8,"pixelRatio":1.25,"hardwareConcurrency":8,"screenResolution":[1536,864],"availableScreenResolution":[824,1536],"timezoneOffset":-480,"timezone":"Asia/Shanghai","platform":"Win32","canvas":"e1547d5eeb5c650621b11823f5dc590dca96fa86","webgl":"164641c74782e7189d827eb0febbc3c517824b4b","touchSupport":[0,false,false],"audio":"124.04347527516074","j":"ES5"},"exfp":{"fpa":"902f0fe98719b779ea37f27528dfb0aa","fphc":"e1547d5eeb5c650621b11823f5dc590dca96fa86","fphg":"164641c74782e7189d827eb0febbc3c517824b4b","fphf":"8c66b0256498b0b2958897b32e2dba8d5f4839d2","fprt":"d5c759f51da85ada4d7da3ece23447fa24b283e6"},"aux":{"k":[],"m":[[3,1039,442,166120],[3,1040,441,166128],[3,1043,438,166135],[3,1044,437,166143],[3,1045,434,166150],[3,1045,433,166158],[3,1045,431,166173],[3,1045,430,166248],[3,1043,429,166256],[3,1042,429,166263],[3,1040,429,166278],[3,1038,429,166285],[3,1035,429,166292],[3,1032,429,166300],[3,1028,430,166308],[3,1025,433,166315],[3,1022,434,166323],[3,1020,436,166330],[1,1020,436,166436],[2,1020,436,166488]],"h":[[3,959,668,47],[3,946,649,53],[3,933,627,60],[3,904,584,80],[3,887,564,86],[3,874,547,91],[3,860,529,98],[3,848,515,106],[3,836,500,121],[3,821,483,121],[3,797,453,137],[3,788,442,146],[3,779,430,158],[3,772,419,165],[3,767,410,173],[3,761,401,180],[3,757,396,187],[3,756,391,195],[3,753,388,203],[3,752,385,210]]}}}'
 e= encryptData(n, e)
a = [];
a["push"]("7051CA8BF3E64DEDAA9334620DA8F5F1")
a["push"](token)
a["push"](e)

var c = a.join(""); // Join the array into a string
// console.log(c);

var C = 0;
var res = [];
while (c) {
    var e = null;
    // If the string is longer than 1024 characters, slice it
    if (c.length > 1024) {
        e = c.substr(0, 1024);
        c = c.substring(1024); // Update c by removing the first 1024 characters
    } else {
        e = c;
        c = null; // If remaining string is smaller than 1024, set c to null to exit the loop
    }
    // Format and push the chunk into the result array
    e = "0" + "|" + "3" + "|" + C + "|" + e;
    C++;
    res.push(e); // Add the chunk to the result array

}
 return res

}
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
function  decode(t,token,u){
    if (u===""){
        r = t.substring(0, 32)
        e = t.substring(32);
    }
    else {
        r=u
        e = t
    }
                        t = f(r, token);
                        e = aes_decrypt(e, t);
                        return e
}


function getParam_pic(u,token){
    o=token;
    e = f(u, o)
    reqid=generateRequestID()
    n='{"requestId":'+reqid+',"command":"E97CE473AE1A46A8BF4A88FD73636D7E","data":{"l":'+token+',"z":"c34cc3bb2870c5a463b89bd8bf7ef96aee87d057"}}'
    e= encryptData(n, e)
a = [];
a["push"]("E97CE473AE1A46A8BF4A88FD73636D7E")
//a["push"](token)
a["push"](e)

var c = a.join(""); // Join the array into a string
// console.log(c);

var C = 0;
var res = [];
while (c) {
    var e = null;
    // If the string is longer than 1024 characters, slice it
    if (c.length > 1024) {
        e = c.substr(0, 1024);
        c = c.substring(1024); // Update c by removing the first 1024 characters
    } else {
        e = c;
        c = null; // If remaining string is smaller than 1024, set c to null to exit the loop
    }
    // Format and push the chunk into the result array
    e = "1" + "|" + "1" + "|" + C + "|" + e;
    C++;
    res.push(e); // Add the chunk to the result array

}
 return res

}




function getParam_track(u,token,word){
    o=token;
    e = f(u, o)
    reqid=generateRequestID()
    // n={"requestId":reqid,"command":"53031DCA131946D78173670CE98E8812","data":{"s":track,"f":"c539ddb69c64cc6167f04f2b3339cfc9758884ac"}}
    // n=JSON.stringify(n)
    n=word
    e= encryptData(n, e)
a = [];
a["push"]("53031DCA131946D78173670CE98E8812")
a["push"](e)

var c = a.join(""); // Join the array into a string
// console.log(c);

var C = 0;
var res = [];
while (c) {
    var e = null;
    // If the string is longer than 1024 characters, slice it
    if (c.length > 1024) {
        e = c.substr(0, 1024);
        c = c.substring(1024); // Update c by removing the first 1024 characters
    } else {
        e = c;
        c = null; // If remaining string is smaller than 1024, set c to null to exit the loop
    }
    // Format and push the chunk into the result array
    e = "2" + "|" + "1" + "|" + C + "|" + e;
    C++;
    res.push(e); // Add the chunk to the result array

}
 return res

}

console.log(getParam_track("2sXECpGmgm00130100VbCcbmt6ef40ZZ","cd6a8e901655449ebfb75fe2c9fb42dc","1745895181133,0,50,0,50,1,50,2,50,3,50,5,50,8,50,10,50,13,50,17,50,20,50,24,50,28,50,33,50,38,50,43,50,48,50,53,50,58,50,64,50,69,50,74,50,80,50,85,50,90,50,95,50,100,50,105,50,110,50,114,50,118,50,121,50,125,50,128,50,130,50,133,50,135,50,136,50,137,50,138,50,138,50,1745895183133\n"))