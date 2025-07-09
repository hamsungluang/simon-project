package com.anjia.unidbgserver.web;

import com.anjia.unidbgserver.service.MfwServiceWorker;
import com.anjia.unidbgserver.service.TTEncryptServiceWorker;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 控制类
 *
 * @author AnJia
 * @since 2021-07-26 18:31
 */
@Slf4j
@RestController
@RequestMapping(path = "/api/mfw-encrypt", produces = MediaType.APPLICATION_JSON_VALUE)
public class MfwController {

    @Resource(name = "MfwWorker")
    private MfwServiceWorker mfwServiceWorker;

    /**
     * 获取ttEncrypt
     * <p>
     * public byte[] ttEncrypt(@RequestParam(required = false) String key1, @RequestBody String body)
     * // 这是接收一个url参数，名为key1,接收一个post或者put请求的body参数
     * key1是选填参数，不写也不报错，值为,body只有在请求方法是POST时才有，GET没有
     *
     * @return 结果
     */
    @SneakyThrows @RequestMapping(value = "encrypt", method = {RequestMethod.GET, RequestMethod.POST})
    public byte[] ttEncrypt() {
        String key1 = "GET&https%3A%2F%2Fmapi.mafengwo.cn%2Fdiscovery%2Fget_index%2Fv7&app_code%3Dcom.mfw.roadbook%26app_ver%3D11.0.2%26app_version_code%3D1052%26brand%3Dgoogle%26channel_id%3DMFW-WDJPPZS-1%26dev_ver%3DD2313.0%26device_id%3D82d917db80c8eae2%26device_mid%3D860000000000001%26device_type%3Dandroid%26hardware_model%3DPixel%25203%26has_notch%3D0%26jsondata%3D%257B%2522top_tab_id%2522%253A%252255%2522%252C%2522filter_id%2522%253A%2522all%2522%252C%2522top_refresh%2522%253A%25221%2522%252C%2522by_user%2522%253A%25221%2522%257D%26mfwsdk_ver%3D20140507%26o_coord%3Dwgs%26o_lat%3DMzAuNDg5NjIy%26o_lng%3DMTE0LjQyMDQ5MQ%253D%253D%26oauth_consumer_key%3D5%26oauth_nonce%3D536f6e42-bc4c-463f-acb5-ee145e63f10e%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1732784973%26oauth_token%3D0_0969044fd4edf59957f4a39bce9200c6%26oauth_version%3D1.0%26open_udid%3D82d917db80c8eae2%26screen_height%3D2028%26screen_scale%3D2.88%26screen_width%3D1080%26shumeng_id%3DDUx0wb9S3BzdWvrdsQ8G8T6MnVVJL6kbZPb2RFV4MHdiOVMzQnpkV3ZyZHNROEc4VDZNblZWSkw2a2JaUGIyc2h1%26sys_ver%3D11%26time_offset%3D480%26x_auth_mode%3Dclient_auth";
        String body = "com.mfw.roadbook";
        // 演示传参
        String result = mfwServiceWorker.ttEncrypt(key1, body).get();
        log.info("入参:key1:{},body:{},result:{}", key1, body, result);
        return result.getBytes();
    }
}
