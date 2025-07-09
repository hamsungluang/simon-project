function hook_java(){

//     let SecurityTools = Java.use("com.mfw.core.login.util.SecurityTools");
// SecurityTools["ghostSigh"].implementation = function (str) {
//     console.log('ghostSigh is called' + ', ' + 'str: ' + str);
//     console.log('ghostSigh is called' + ', ' + 'str: ' + decodeURIComponent(str));
//     let ret = this.ghostSigh(str);
//     console.log('ghostSigh ret value is ' + ret);
//     return ret;
// };
//     let AuthorizeHelper = Java.use("com.mfw.tnative.AuthorizeHelper");
// AuthorizeHelper["xPreAuthencode"].implementation = function (context, str, str2) {
//     console.log('xPreAuthencode is called' + ', ' + 'context: ' + context + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
//     let ret = this.xPreAuthencode(context, str, str2);
//     console.log('xPreAuthencode ret value is ' + ret);
//     return ret;
// };
    let AuthorizeHelper = Java.use("com.mfw.tnative.AuthorizeHelper");
AuthorizeHelper["xPreAuthencode"].implementation = function (context, str, str2) {
    console.log('xPreAuthencode is called' + ', ' + 'context: ' + context + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
    let ret = this.xPreAuthencode(context, str, str2);
    console.log('xPreAuthencode ret value is ' + ret);
    return ret;
};
}
// xPreAuthencode
function call_mfw(){
    let AuthorizeHelper = Java.use("com.mfw.tnative.AuthorizeHelper");
    var current_application = Java.use('android.app.ActivityThread').currentApplication();
    var context = current_application.getApplicationContext();
    let str = "GET&https%3A%2F%2Fmapi.mafengwo.cn%2Fdiscovery%2Fget_index%2Fv7&app_code%3Dcom.mfw.roadbook%26app_ver%3D11.0.2%26app_version_code%3D1052%26brand%3Dgoogle%26channel_id%3DMFW-WDJPPZS-1%26dev_ver%3DD2313.0%26device_id%3D82d917db80c8eae2%26device_mid%3D860000000000001%26device_type%3Dandroid%26hardware_model%3DPixel%25203%26has_notch%3D0%26jsondata%3D%257B%2522top_tab_id%2522%253A%252255%2522%252C%2522filter_id%2522%253A%2522all%2522%252C%2522top_refresh%2522%253A%25221%2522%252C%2522by_user%2522%253A%25221%2522%257D%26mfwsdk_ver%3D20140507%26o_coord%3Dwgs%26o_lat%3DMzAuNDg5NjIy%26o_lng%3DMTE0LjQyMDQ5MQ%253D%253D%26oauth_consumer_key%3D5%26oauth_nonce%3D536f6e42-bc4c-463f-acb5-ee145e63f10e%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1732784973%26oauth_token%3D0_0969044fd4edf59957f4a39bce9200c6%26oauth_version%3D1.0%26open_udid%3D82d917db80c8eae2%26screen_height%3D2028%26screen_scale%3D2.88%26screen_width%3D1080%26shumeng_id%3DDUx0wb9S3BzdWvrdsQ8G8T6MnVVJL6kbZPb2RFV4MHdiOVMzQnpkV3ZyZHNROEc4VDZNblZWSkw2a2JaUGIyc2h1%26sys_ver%3D11%26time_offset%3D480%26x_auth_mode%3Dclient_auth"
    let str2 = "com.mfw.roadbook"
    let ret = AuthorizeHelper.$new("com.mfw.roadbook").xPreAuthencode(context, str, str2);
    console.log('主动调用 ret value is ' + ret);
}
function hook_sha1(){
    var addr = Module.findBaseAddress("libmfw.so");
    // console.log(addr)
    var func_addr = addr.add(0x3DEC4);
    // console.log(func_addr);
    Interceptor.attach(func_addr,{
        onEnter:function (args){
            console.log(args[0].readCString())
            console.log(hexdump(args[1]))
            console.log(args[2].toInt32())
        },
        onLeave:function (retval){
            // console.log(retval)
        }
    })
}
// hook_sha1()
Java.perform(function (){
    hook_java()

})