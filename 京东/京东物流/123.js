const e = require('jsencrypt');
// const e = require('JSEncrypt')
// e = r(775).JSEncrypt
const t = require('crypto-js')

var n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   function o() {
            for (var e = "", i = 16; i > 0; --i)
                e += n[Math.floor(62 * Math.random())];
            return e
        }
s = {
    "requestData": [
        {
            "queryType": 1,
            "volume": "1",
            "weight": 1,
            "sendTime": 1702283304071,
            "sendDetailAddress": "111",
            "receiveDetailAddress": "科学园南里西街与南沙滩东路交叉口西120米",
            "sendProvinceId": 1,
            "sendCityId": 72,
            "sendCountyId": 2819,
            "sendTownId": null,
            "receiveProvinceId": 1,
            "receiveCityId": 72,
            "receiveCountyId": 2819,
            "receiveTownId": null
        },
        {
            "client": "4",
            "entrance": "JDWL-GW"
        }
    ],
    "pubKey": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSp5eYB2FfHSXhzaUuHHbMfeOJp2dJ/oew7EKwzhLYfRa29d2pXm+rtN4c2HdhR+NGwm/5fY8T3entKq/7qrNBagG8R8tGl604vqteU+8Tjl4SRbQRpm0Il64ruz+xjE4NWJFtr8CWW0U6mA8yjSffSDbvqm87bsxTpHIn2frr/QIDAQAB"
}
getWgEncryptData = function(r) {
                    var n = r.requestData
                      , c = r.pubKey
                      , l = ""
                      , d = ""
                      , m = ""
                      , f = "";
                    try {
                        var h = o()
                          , v = o()
                          , w = new e;
                        w.setPublicKey(c),
                        l = w.encrypt("".concat(h).concat(v)),
                        m = t.enc.Utf8.parse(h),
                        f = t.enc.Utf8.parse(v),
                        d = t.AES.encrypt(JSON.stringify(n), m, {
                            iv: f,
                            mode: t.mode.CBC,
                            padding: t.pad.Pkcs7
                        })
                    } catch (e) {
                        console.log("e", e)
                    }
                    return {
                        ciphertext: l,
                        encryptedData: d,
                        key: m,
                        iv: f
                    }
                }

d = getWgEncryptData(s)

params = {
       ciphertext : d.ciphertext,
        data:d.encryptedData.toString()
}

console.log(params)

