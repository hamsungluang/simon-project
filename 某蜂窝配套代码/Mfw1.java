package com.xxx.mafengwo;

import com.github.unidbg.AndroidEmulator;
import com.github.unidbg.Module;
import com.github.unidbg.linux.android.AndroidEmulatorBuilder;
import com.github.unidbg.linux.android.AndroidResolver;
import com.github.unidbg.linux.android.dvm.*;
import com.github.unidbg.memory.Memory;

import java.io.File;
import java.io.IOException;

public class Mfw1 extends AbstractJni {

    private final AndroidEmulator emulator;
    private final VM vm;
    private final Module module;

    private final DvmClass AuthorizeHelper;

    private final boolean logging;

    Mfw1(boolean logging) {
        this.logging = logging;

        emulator = AndroidEmulatorBuilder.for64Bit().setProcessName("com.mfw.roadbook").build(); // 创建模拟器实例，要模拟32位或者64位，在这里区分
        final Memory memory = emulator.getMemory(); // 模拟器的内存操作接口
        memory.setLibraryResolver(new AndroidResolver(23)); // 设置系统类库解析

        vm = emulator.createDalvikVM(new File("unidbg-android/src/test/java/com/xxx/mafengwo/com.mfw.roadbook.apk")); // 创建Android虚拟机
        vm.setJni(this);
        vm.setVerbose(logging); // 设置是否打印Jni调用细节
        DalvikModule dm = vm.loadLibrary(new File("unidbg-android/src/test/java/com/xxx/mafengwo/libmfw.so"), false); // 加载libttEncrypt.so到unicorn虚拟内存，加载成功以后会默认调用init_array等函数
        dm.callJNI_OnLoad(emulator); // 手动执行JNI_OnLoad函数
        module = dm.getModule(); // 加载好的libttEncrypt.so对应为一个模块
        AuthorizeHelper = vm.resolveClass("com/mfw/tnative/AuthorizeHelper");
    }

    void destroy() throws IOException {
        emulator.close();
        if (logging) {
            System.out.println("destroy");
        }
    }

    public static void main(String[] args) throws Exception {
        Mfw1 test = new Mfw1(true);
        test.callFunc();
        test.destroy();
    }

    void callFunc() {

        String data = "GET&https%3A%2F%2Fmapi.mafengwo.cn%2Fdiscovery%2Fget_index%2Fv7&app_code%3Dcom.mfw.roadbook%26app_ver%3D11.0.2%26app_version_code%3D1052%26brand%3Dgoogle%26channel_id%3DMFW-WDJPPZS-1%26dev_ver%3DD2313.0%26device_id%3D82d917db80c8eae2%26device_mid%3D860000000000001%26device_type%3Dandroid%26hardware_model%3DPixel%25203%26has_notch%3D0%26jsondata%3D%257B%2522top_tab_id%2522%253A%252255%2522%252C%2522filter_id%2522%253A%2522all%2522%252C%2522top_refresh%2522%253A%25221%2522%252C%2522by_user%2522%253A%25221%2522%257D%26mfwsdk_ver%3D20140507%26o_coord%3Dwgs%26o_lat%3DMzAuNDg5NjIy%26o_lng%3DMTE0LjQyMDQ5MQ%253D%253D%26oauth_consumer_key%3D5%26oauth_nonce%3D536f6e42-bc4c-463f-acb5-ee145e63f10e%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1732784973%26oauth_token%3D0_0969044fd4edf59957f4a39bce9200c6%26oauth_version%3D1.0%26open_udid%3D82d917db80c8eae2%26screen_height%3D2028%26screen_scale%3D2.88%26screen_width%3D1080%26shumeng_id%3DDUx0wb9S3BzdWvrdsQ8G8T6MnVVJL6kbZPb2RFV4MHdiOVMzQnpkV3ZyZHNROEc4VDZNblZWSkw2a2JaUGIyc2h1%26sys_ver%3D11%26time_offset%3D480%26x_auth_mode%3Dclient_auth";
        StringObject strResult = AuthorizeHelper.callStaticJniMethodObject(
                emulator,
                "xPreAuthencode(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
                vm.addLocalObject(vm.resolveClass("android/content/Context").newObject(null)),
                new StringObject(vm, data),
                new StringObject(vm, "com.mfw.roadbook")
        ); // 执行Jni方法
        System.out.println(strResult);
    }

}
