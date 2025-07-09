const fs = require('fs');


function get_result(data) {
    wasm = fs.readFileSync('./calc.wasm');
    e = {
        data: {
            "action": "calc",
            "data": {
                "data": data,
                "issue_id": ""
            },
            "wasm": wasm
        }
    }
    var result;
    var flag = false;
    WebAssembly.instantiate(e.data.wasm).then(function (t) {
        result = function (e) {
            return t.instance.exports.reset(),
                e.map(function (e) {
                    return t.instance.exports.arg(e)
                }),
                Array(t.instance.exports.calc()).fill(-1).map(function () {
                    return t.instance.exports.ret()
                })
        }(e.data.data.data);
        flag = true;
    }).catch(function (e) {
        console.log(e);
    })
    while (!flag) {
        require('deasync').sleep(100);
    }
    ;
    return result;
};

// 测试样例
// console.log(get_result([99, 35, 92, 48, 61, 31, 18, 43, 3, 54, 48, 22, 62, 50]));

