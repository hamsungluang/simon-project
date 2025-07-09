function f(e) {
    for (var t = 1, n = e.reduce(function (e, t) {
        return e + t
    }, 0), r = (6 + e.length + n) % 6 + 6; r--;)
        t *= 6;
    t < 6666 && (t *= e.length),
    t > 0x3f940aa && (t = Math.floor(t / e.length));
    for (var o = 0; o < e.length; o++)
        t += Math.pow(e[o], 3),
            t ^= o,
            t ^= e[o] + o;
    for (var f = []; t > 0;)
        f.unshift(63 & t),
            t >>= 6;
    return f
};

// 测试样例
// console.log(f([99, 35, 92, 48, 61, 31, 18, 43, 3, 54, 48, 22, 62, 50]));



