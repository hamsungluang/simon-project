

function hook1(){
    let TreUtil = Java.use("com.maihan.tredian.util.TreUtil");
    TreUtil["sign"].implementation = function (str) {
        console.log('sign is called' + ', ' + 'str: ' + str);
        let ret = this.sign(str);
        console.log('sign ret value is ' + ret);
        return ret;
    };
}

// sign
function call_taozui(){
    let TreUtil = Java.use("com.maihan.tredian.util.TreUtil");
    // 主动调用sign方法
    let str = "android_id=9a8493c270cc2270&app_ver=87&channel=aliapp&device_id=5e9bdbbc3bc779c18511c1bb26351dad&device_udid=8f6e2b8cf3b2e3c36db8dea8368d7305&first_time=1706003627&from=app&last_time=1695744000&limit=8&mac=0E:D8:C1:64:25:37&nonce=4vlwb71740715028559&os_ver_code=30&system=1&timestamp=1740715028&with_super=0&with_video=1";  // 假设你需要传递的字符串
    console.log('Before calling sign, str: ' + str);
    // 调用sign方法
    let result = TreUtil.sign(str);
    console.log('After calling sign, result: ' + result);
}

Java.perform(function () {
    hook1();
})

var soAddr = Module.findBaseAddress("libtre.so");

var base64_encode_new = soAddr.add(0x13B4+1);
Interceptor.attach(base64_encode_new,{
    onEnter:function (args){
        console.log("参数1",args[0].readCString());
        console.log("参数2",hexdump(args[1]));
        console.log("参数3",args[2].toInt32());
    },
    onLeave:function (retval){
        console.log("返回值为:",retval.readCString())
    }
});


