function hook_pthread_create() {
    var pthread_create_addr = Module.findExportByName("libc.so", "pthread_create");
    // var pthread_create_addr = Module.findExportByName(null, "pthread_create");
    console.log("pthread_create_addr: ", pthread_create_addr);
    Interceptor.attach(pthread_create_addr, {
        onEnter: function (args) {
            // 参数2 是调用函数
            // console.log(args[0], args[1], args[2], args[3]);
            var Module = Process.findModuleByAddress(args[2]);
            if (Module != null) {
                console.log("开启线程-->", Module.name, args[2].sub(Module.base));
            }
        }, onLeave: function (retval) {
        }
    })
}


Java.perform(function () {
})

function hook_android_dlopen_ext() {
    var linker64_base_addr = Module.getBaseAddress("linker64")
    var android_dlopen_ext_func_off = 0x0000000000031094
    var android_dlopen_ext_func_addr = linker64_base_addr.add(android_dlopen_ext_func_off)
    Interceptor.attach(android_dlopen_ext_func_addr, {
        onEnter: function (args) {
            // console.log("android_dlopen_ext -> enter : " + args[0].readCString())
            if (args[0].readCString() != null && args[0].readCString().indexOf("libmsaoaidsec.so") >= 0) {

                hook_call_constructors()
            }
        },
        onLeave: function (ret) {
            // console.log("android_dlopen_ext -> leave")
        }
    })
}

function hook_call_constructors() {

    var linker64_base_addr = Module.getBaseAddress("linker64")
    var call_constructors_func_off = 0x000000000004a174
    var call_constructors_func_addr = linker64_base_addr.add(call_constructors_func_off)
    var listener = Interceptor.attach(call_constructors_func_addr, {
        onEnter: function (args) {
            console.log("call_constructors -> enter")
            var module = Process.findModuleByName("libmsaoaidsec.so")
            if (module != null) {
                Interceptor.replace(module.base.add(0x000000000001B924), new NativeCallback(function () {
                    console.log("replace sub_1BEC4")
                }, "void", []))
                listener.detach()
            }
        },
    })
}

setImmediate(hook_android_dlopen_ext);

function showStacks() {
    Java.perform(function () {
        console.log("打印堆栈")
        console.log(Java.use("android.util.Log").getStackTraceString(
            Java.use("java.lang.Throwable").$new()
        ));
    })
}


function hook_Header() {
    var Builder = Java.use("okhttp3.Request$Builder");
    Builder["addHeader"].implementation = function (str, str2) {
        console.log("key: " + str)
        console.log("val: " + str2)
        // showStacks()
        if (str === "Authorization") {
            showStacks()
        }
        var result = this["addHeader"](str, str2);
        return result;
    };
}

function hook() {
    // let b = Java.use("a9.b");
    // b["b"].implementation = function (context, treeMap, str, str2) {
    //     console.log(`b.b is called: context=${context}, treeMap=${treeMap}, str=${str}, str2=${str2}`);
    //     let result = this["b"](context, treeMap, str, str2);
    //     console.log(`b.b result=${result}`);
    //     return result;
    // };
//     let VCSPSecurityConfig = Java.use("com.vip.vcsp.security.sign.VCSPSecurityConfig");
// VCSPSecurityConfig["getMapParamsSign"].implementation = function (context, treeMap, str, z10) {
//     console.log(`VCSPSecurityConfig.getMapParamsSign is called: context=${context}, treeMap=${treeMap}, str=${str}, z10=${z10}`);
//     let result = this["getMapParamsSign"](context, treeMap, str, z10);
//     console.log(`VCSPSecurityConfig.getMapParamsSign result=${result}`);
//     return result;
// };
//     let VCSPSecurityConfig = Java.use("com.vip.vcsp.security.sign.VCSPSecurityConfig");
// VCSPSecurityConfig["getSignHash"].implementation = function (context, map, str, z10) {
//     console.log(`VCSPSecurityConfig.getSignHash is called: context=${context}, map=${map}, str=${str}, z10=${z10}`);
//     let result = this["getSignHash"](context, map, str, z10);
//     console.log(`VCSPSecurityConfig.getSignHash result=${result}`);
//     return result;
// };
    let KeyInfo = Java.use("com.vip.vcsp.KeyInfo");
    KeyInfo["gs"].implementation = function (context, map, str, z10) {
        console.log(`KeyInfo.gs is called: context=${context}, map=${map}, str=${str}, z10=${z10}`);
        let result = this["gs"](context, map, str, z10);
        var tree = Java.use("java.util.TreeMap");
        console.log(Java.cast(map, tree));
        console.log(`KeyInfo.gs result=${result}`);
        return result;
    };
}

function hook_zhu() {
    Java.perform(function () {
        const KeyInfo = Java.use("com.vip.vcsp.KeyInfo");
        const TreeMap = Java.use("java.util.TreeMap");
        const String = Java.use('java.lang.String');
        // 构造 context（一般从现有上下文找）
        const currentApplication = Java.use("android.app.ActivityThread").currentApplication();
        const context = currentApplication.getApplicationContext();
        let map = TreeMap.$new();
        map.put(String.$new("api_key"), String.$new("23e7f28019e8407b98b84cd05b5aef2c"));
        map.put(String.$new("app_name"), String.$new("shop_android"));
        map.put(String.$new("app_version"), String.$new("9.42.8"));
        map.put(String.$new("bigSaleTagIds"), String.$new(""));
        map.put(String.$new("brandIds"), String.$new(""));
        map.put(String.$new("brandStoreSns"), String.$new(""));
        map.put(String.$new("categoryId"), String.$new(""));
        map.put(String.$new("channelId"), String.$new("1"));
        map.put(String.$new("channel_flag"), String.$new("0_1"));
        map.put(String.$new("clickFrom"), String.$new("list_userword"));
        map.put(String.$new("client"), String.$new("android"));
        map.put(String.$new("client_type"), String.$new("android"));
        map.put(String.$new("couponIds"), String.$new(""));
        map.put(String.$new("darkmode"), String.$new("0"));
        map.put(String.$new("deeplink_cps"), String.$new(""));
        map.put(String.$new("device_model"), String.$new("Google Pixel 3"));
        map.put(String.$new("did"), String.$new("0.0.488b303f75e2323522a8ed6c9da1d86f.2e28ab"));
        map.put(String.$new("elder"), String.$new("0"));
        map.put(String.$new("evgid"), String.$new("itg0e6C7desc9WOI7whauxkrce1Tnmectkj0f9gbLh7l8Yy8fZS8ASg24uPgOT1UB+J9Pn37EebSRw/foKbqomTNnj0y5EDKLAXFfooxVlQ="));
        map.put(String.$new("extParams"), String.$new("{\"priceVer\":\"2\",\"video_playable\":\"1\",\"mclabel\":\"1\",\"cmpStyle\":\"1\",\"statusVer\":\"2\",\"ic2label\":\"1\",\"video\":\"2\",\"uiVer\":\"2\",\"preheatTipsVer\":\"4\",\"floatwin\":\"1\",\"superHot\":\"1\",\"exclusivePrice\":\"1\",\"router\":\"1\",\"coupons\":\"5\",\"needVideoExplain\":\"1\",\"rank\":\"2\",\"needVideoGive\":\"1\",\"attr\":\"2\",\"bigBrand\":\"2\",\"couponVer\":\"v2\",\"videoExplainUrl\":\"1\",\"live\":\"1\",\"sellpoint\":\"1\",\"reco\":\"1\",\"vreimg\":\"1\",\"search_tag\":\"2\",\"tpl\":\"1\",\"ads\":\"2\",\"stdSizeVids\":\"\",\"labelVer\":\"2\",\"preheatView\":\"1\"}"));
        map.put(String.$new("fdc_area_id"), String.$new("104104"));
        map.put(String.$new("functions"), String.$new("RTRecomm,flagshipInfo,couponBarV2,lowPriceTabs,feedbackV2,otdAds,zoneCode,slotOp,survey,outfit,aiRealtime,floaterParams,tabGroupV2,bsAndSeason,propAndOpTag,parallelCall"));
        map.put(String.$new("harmony_app"), String.$new("0"));
        map.put(String.$new("harmony_os"), String.$new("0"));
        map.put(String.$new("height"), String.$new("2028"));
        map.put(String.$new("isMultiTab"), String.$new("0"));
        map.put(String.$new("is_default_area"), String.$new("1"));
        map.put(String.$new("keyword"), String.$new("纸"));
        map.put(String.$new("lastPageProperty"), String.$new("{\"isBgToFront\":\"0\",\"suggest_text\":\"纸\",\"scene_entry_id\":\"-99\",\"refer_page_id\":\"page_te_globle_classify_search_1749796272747\",\"isSimple\":\"0\",\"text\":\"纸\",\"tag\":\"1\",\"module_name\":\"com.achievo.vipshop.search\",\"type\":\"all\",\"typename\":\"全部\",\"is_back_page\":\"1\"}"));
        map.put(String.$new("maker"), String.$new("GOOGLE"));
        map.put(String.$new("mars_cid"), String.$new("2760c2a5-07c5-3a1c-a409-66e37ebaf574"));
        map.put(String.$new("mobile_channel"), String.$new("rjx5hknt:::"));
        map.put(String.$new("mobile_platform"), String.$new("3"));
        map.put(String.$new("net"), String.$new("WIFI"));
        map.put(String.$new("operator"), String.$new(""));
        map.put(String.$new("os"), String.$new("Android"));
        map.put(String.$new("osv"), String.$new("11"));
        map.put(String.$new("otddid"), String.$new(""));
        map.put(String.$new("other_cps"), String.$new(""));
        map.put(String.$new("page_id"), String.$new("page_te_commodity_search_1749796274004"));
        map.put(String.$new("page_init_ts"), String.$new("1749796253199"));
        map.put(String.$new("phone_brand"), String.$new("google"));
        map.put(String.$new("phone_model"), String.$new("pixel 3"));
        map.put(String.$new("priceMax"), String.$new(""));
        map.put(String.$new("priceMin"), String.$new(""));
        map.put(String.$new("props"), String.$new(""));
        map.put(String.$new("province_id"), String.$new("104104"));
        map.put(String.$new("referer"), String.$new("com.achievo.vipshop.search.activity.SearchActivity"));
        map.put(String.$new("rom"), String.$new("Dalvik/2.1.0 (Linux; U; Android 11; Pixel 3 Build/RQ1D.210205.004)"));
        map.put(String.$new("sd_tuijian"), String.$new("0"));
        map.put(String.$new("service_provider"), String.$new(""));
        map.put(String.$new("session_id"), String.$new("2760c2a5-07c5-3a1c-a409-66e37ebaf574_shop_android_1749796345730"));
        map.put(String.$new("skey"), String.$new("6692c461c3810ab150c9a980d0c275ec"));
        map.put(String.$new("sort"), String.$new("0"));
        map.put(String.$new("source"), String.$new("app"));
        map.put(String.$new("source_app"), String.$new("android"));
        map.put(String.$new("standby_id"), String.$new("rjx5hknt:::"));
        map.put(String.$new("sys_version"), String.$new("30"));
        map.put(String.$new("tabFields"), String.$new("gender,tabs,priceTabs,discountTabs,tabGroupV2"));
        map.put(String.$new("tfs_fp_token"), String.$new("Ba1bX4G5LVCvZX/keQ+jKakGAtkmcd5uF3mqx1MgFxED+ki6Tt8pN7kHPc01QhDUUEKPZujxXveye0E3jIKnUvA=="));
        map.put(String.$new("timestamp"), String.$new("1749796274"));
        map.put(String.$new("union_mark"), String.$new("blank&_&blank&_&rjx5hknt:::&_&blank&_&blank&_&blank"));
        map.put(String.$new("vipService"), String.$new(""));
        map.put(String.$new("warehouse"), String.$new("VIP_NH"));
        map.put(String.$new("width"), String.$new("1080"));

        let result = KeyInfo["gsNav"](context, map, null, false);
        console.log("java---->", result);
    })


}

function main() {
    Java.perform(function () {
        // hook_hashMap()
        //     hook_Header()
        hook()
    })
}

setImmediate(main)

function hook_so_byhash() {
    var addr = Module.findBaseAddress('libkeyinfo.so');
    var func = addr.add(0xF2260)
    // console.log(func)
    let number = 0;
    Interceptor.attach(func, {
        onEnter: function (args) {
            number += 1;
            console.log(`\x1b[31m第${number} 次 hook getByteHash-----------------------------------------------\x1b[0m`);
            this.arg5 = args[4]
            console.log(hexdump(args[2]))
            console.log(args[2].readCString())
        },
        onLeave: function (retval) {
            console.log("this.arg5",hexdump(this.arg5));
        }
    })
}

setImmediate(hook_so_byhash)


function hook_so_SHA1Input() {
    var addr = Module.findBaseAddress('libkeyinfo.so');
    var func = addr.add(0xF250C)
    // console.log(func)
    let number = 0;
    Interceptor.attach(func, {
        onEnter: function (args) {
            number += 1;
            console.log(`第${number} 次 hook SHA1Input-----------------------------------------------`)
            this.arg1 = args[1]
            console.log(hexdump(args[0]))
            console.log(hexdump(args[1]))

        },
        onLeave: function (retval) {
            // console.log("this.arg5",hexdump(this.arg5));
            // console.log("返回值为-->", retval)
        }
    })
}

// setImmediate(hook_so_SHA1Input)
// "https://www.wandoujia.com/apps/31583/history_v94208"


/*
第一次调用返回

1ed562e1e90b23ae3f9a40f8b2a65382b95a4752

第二次
aee4c425dbb2288b80c71347cc37d04bapi_key=23e7f28019e8407b98b84cd05b5aef2c&app_name=shop_android&app_version=9.42.8&bigSaleTagIds=&brandIds=&brandStoreSns=&categoryId=&channelId=1&channel_flag=0_1&clickFrom=list_userword&client=android&client_type=android&couponIds=&darkmode=0&deeplink_cps=&device_model=Google Pixel 3&did=0.0.488b303f75e2323522a8ed6c9da1d86f.2e28ab&elder=0&evgid=itg0e6C7desc9WOI7whauxkrce1Tnmectkj0f9gbLh7l8Yy8fZS8ASg24uPgOT1UB+J9Pn37EebSRw/foKbqomTNnj0y5EDKLAXFfooxVlQ=&extParams={"priceVer":"2","video_playable":"1","mclabel":"1","cmpStyle":"1","statusVer":"2","ic2label":"1","video":"2","uiVer":"2","preheatTipsVer":"4","floatwin":"1","superHot":"1","exclusivePrice":"1","router":"1","coupons":"5","needVideoExplain":"1","rank":"2","needVideoGive":"1","attr":"2","bigBrand":"2","couponVer":"v2","videoExplainUrl":"1","live":"1","sellpoint":"1","reco":"1","vreimg":"1","search_tag":"2","tpl":"1","ads":"2","stdSizeVids":"","labelVer":"2","preheatView":"1"}&fdc_area_id=104104&functions=RTRecomm,flagshipInfo,couponBarV2,lowPriceTabs,feedbackV2,otdAds,zoneCode,slotOp,survey,outfit,aiRealtime,floaterParams,tabGroupV2,bsAndSeason,propAndOpTag,parallelCall&harmony_app=0&harmony_os=0&height=2028&isMultiTab=0&is_default_area=1&keyword=纸&lastPageProperty={"isBgToFront":"0","suggest_text":"纸","scene_entry_id":"-99","refer_page_id":"page_te_globle_classify_search_1749796272747","isSimple":"0","text":"纸","tag":"1","module_name":"com.achievo.vipshop.search","type":"all","typename":"全部","is_back_page":"1"}&maker=GOOGLE&mars_cid=2760c2a5-07c5-3a1c-a409-66e37ebaf574&mobile_channel=rjx5hknt:::&mobile_platform=3&net=WIFI&operator=&os=Android&osv=11&otddid=&other_cps=&page_id=page_te_commodity_search_1749796274004&page_init_ts=1749796253199&phone_brand=google&phone_model=pixel 3&priceMax=&priceMin=&props=&province_id=104104&referer=com.achievo.vipshop.search.activity.SearchActivity&rom=Dalvik/2.1.0 (Linux; U; Android 11; Pixel 3 Build/RQ1D.210205.004)&sd_tuijian=0&service_provider=&session_id=2760c2a5-07c5-3a1c-a409-66e37ebaf574_shop_android_1749796345730&skey=6692c461c3810ab150c9a980d0c275ec&sort=0&source=app&source_app=android&standby_id=rjx5hknt:::&sys_version=30&tabFields=gender,tabs,priceTabs,discountTabs,tabGroupV2&tfs_fp_token=Ba1bX4G5LVCvZX/keQ+jKakGAtkmcd5uF3mqx1MgFxED+ki6Tt8pN7kHPc01QhDUUEKPZujxXveye0E3jIKnUvA==&timestamp=1749796274&union_mark=blank&_&blank&_&rjx5hknt:::&_&blank&_&blank&_&blank&vipService=&warehouse=VIP_NH&width=1080

d98aee7e972029d163709d41538d5bdcb2fe290f

aee4c425dbb2288b80c71347cc37d04bd98aee7e972029d163709d41538d5bdcb2fe290f
0ae492780a1e7aefafa23efae2357faafc98af51


* */