require('./env');
require('./a_bogus10119');
XMLHttpRequest.prototype.send(null)


console.log('window.a_bogus >>>>>>> ', window.a_bogus);

function main() {
    XMLHttpRequest.bdmsInvokeList = [
    {
        "args": [
            "GET",
            "/aweme/v1/web/mix/listcollection/?device_platform=webapp&aid=6383&channel=channel_pc_web&cursor=0&count=20&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=8&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=135.0.0.0&browser_online=true&engine_name=Blink&engine_version=135.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7493790376601454116&uifid=1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65",
            true
        ],
        "func":function(t, n) {
                try {
                    var o = "string" == typeof n ? n : n.toString();
                    if (!e(o))
                        return r.apply(this, arguments);
                    this._vc_status = 1,
                    this._vc_actionList = [],
                    this._vc_actionList.push({
                        origin: r,
                        fnName: "open",
                        arguments: arguments
                    })
                } catch (e) {
                    return r.apply(this, arguments)
                }
            }
    },
    {
        "args": [
            "Accept",
            "application/json, text/plain, */*"
        ],
        "func": function() {
                if (1 !== this._vc_status)
                    return o.apply(this, arguments);
                this._vc_actionList.push({
                    origin: o,
                    fnName: "setRequestHeader",
                    arguments: arguments
                })
            }
    },
    {
        "args": [
            "uifid",
            "1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65"
        ],
        "func": function() {
                if (1 !== this._vc_status)
                    return o.apply(this, arguments);
                this._vc_actionList.push({
                    origin: o,
                    fnName: "setRequestHeader",
                    arguments: arguments
                })
            }
    }
]
}

main()