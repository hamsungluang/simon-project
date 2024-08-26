// var t = "743D313730313133363735393B703D343633626462652D39336162663532392D396232343136372D64626230666162373B633D31353B643D43304235443436353645423841354641383438394434303230303546383837323B"
var simon;
!function () {
    var t = {
        285: function (t, r) {
            "use strict";
            r.byteLength = function (t) {
                var r = s(t)
                    , e = r[0]
                    , n = r[1];
                return 3 * (e + n) / 4 - n
            }
                ,
                r.toByteArray = function (t) {
                    var r, e, i = s(t), f = i[0], u = i[1], h = new o(function (t, r, e) {
                        return 3 * (r + e) / 4 - e
                    }(0, f, u)), a = 0, c = u > 0 ? f - 4 : f;
                    for (e = 0; e < c; e += 4)
                        r = n[t.charCodeAt(e)] << 18 | n[t.charCodeAt(e + 1)] << 12 | n[t.charCodeAt(e + 2)] << 6 | n[t.charCodeAt(e + 3)],
                            h[a++] = r >> 16 & 255,
                            h[a++] = r >> 8 & 255,
                            h[a++] = 255 & r;
                    2 === u && (r = n[t.charCodeAt(e)] << 2 | n[t.charCodeAt(e + 1)] >> 4,
                        h[a++] = 255 & r);
                    1 === u && (r = n[t.charCodeAt(e)] << 10 | n[t.charCodeAt(e + 1)] << 4 | n[t.charCodeAt(e + 2)] >> 2,
                        h[a++] = r >> 8 & 255,
                        h[a++] = 255 & r);
                    return h
                }
                ,
                r.fromByteArray = function (t) {
                    for (var r, n = t.length, o = n % 3, i = [], f = 16383, u = 0, s = n - o; u < s; u += f)
                        i.push(h(t, u, u + f > s ? s : u + f));
                    1 === o ? (r = t[n - 1],
                        i.push(e[r >> 2] + e[r << 4 & 63] + "==")) : 2 === o && (r = (t[n - 2] << 8) + t[n - 1],
                        i.push(e[r >> 10] + e[r >> 4 & 63] + e[r << 2 & 63] + "="));
                    return i.join("")
                }
            ;
            for (var e = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = 0, u = i.length; f < u; ++f)
                e[f] = i[f],
                    n[i.charCodeAt(f)] = f;

            function s(t) {
                var r = t.length;
                if (r % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                var e = t.indexOf("=");
                return -1 === e && (e = r),
                    [e, e === r ? 0 : 4 - e % 4]
            }

            function h(t, r, n) {
                for (var o, i, f = [], u = r; u < n; u += 3)
                    o = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]),
                        f.push(e[(i = o) >> 18 & 63] + e[i >> 12 & 63] + e[i >> 6 & 63] + e[63 & i]);
                return f.join("")
            }

            n["-".charCodeAt(0)] = 62,
                n["_".charCodeAt(0)] = 63
        },
        423: function (t, r, e) {
            "use strict";

            function n(t, r) {
                if (!(t instanceof r))
                    throw new TypeError("Cannot call a class as a function")
            }

            function o(t, r) {
                for (var e = 0; e < r.length; e++) {
                    var n = r[e];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                    "value" in n && (n.writable = !0),
                        Object.defineProperty(t, n.key, n)
                }
            }

            function i(t, r) {
                return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, r) {
                    return t.__proto__ = r,
                        t
                }
                    ,
                    i(t, r)
            }

            function f(t) {
                var r = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1;
                    if (Reflect.construct.sham)
                        return !1;
                    if ("function" == typeof Proxy)
                        return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
                            }
                        ))),
                            !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var e, n = h(t);
                    if (r) {
                        var o = h(this).constructor;
                        e = Reflect.construct(n, arguments, o)
                    } else
                        e = n.apply(this, arguments);
                    return u(this, e)
                }
            }

            function u(t, r) {
                if (r && ("object" === a(r) || "function" == typeof r))
                    return r;
                if (void 0 !== r)
                    throw new TypeError("Derived constructors may only return object or undefined");
                return s(t)
            }

            function s(t) {
                if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function h(t) {
                return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }
                    ,
                    h(t)
            }

            function a(t) {
                return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    }
                    : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }
                    ,
                    a(t)
            }

            var c = e(285)
                , p = e(429)
                ,
                l = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
            r.lW = d,
                r.h2 = 50;
            var g = 2147483647;

            function y(t) {
                if (t > g)
                    throw new RangeError('The value "' + t + '" is invalid for option "size"');
                var r = new Uint8Array(t);
                return Object.setPrototypeOf(r, d.prototype),
                    r
            }

            function d(t, r, e) {
                if ("number" == typeof t) {
                    if ("string" == typeof r)
                        throw new TypeError('The "string" argument must be of type string. Received type number');
                    return b(t)
                }
                return v(t, r, e)
            }

            function v(t, r, e) {
                if ("string" == typeof t)
                    return function (t, r) {
                        "string" == typeof r && "" !== r || (r = "utf8");
                        if (!d.isEncoding(r))
                            throw new TypeError("Unknown encoding: " + r);
                        var e = 0 | A(t, r)
                            , n = y(e)
                            , o = n.write(t, r);
                        o !== e && (n = n.slice(0, o));
                        return n
                    }(t, r);
                if (ArrayBuffer.isView(t))
                    return function (t) {
                        if (nt(t, Uint8Array)) {
                            var r = new Uint8Array(t);
                            return B(r.buffer, r.byteOffset, r.byteLength)
                        }
                        return m(t)
                    }(t);
                if (null == t)
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + a(t));
                if (nt(t, ArrayBuffer) || t && nt(t.buffer, ArrayBuffer))
                    return B(t, r, e);
                if ("undefined" != typeof SharedArrayBuffer && (nt(t, SharedArrayBuffer) || t && nt(t.buffer, SharedArrayBuffer)))
                    return B(t, r, e);
                if ("number" == typeof t)
                    throw new TypeError('The "value" argument must not be of type number. Received type number');
                var n = t.valueOf && t.valueOf();
                if (null != n && n !== t)
                    return d.from(n, r, e);
                var o = function (t) {
                    if (d.isBuffer(t)) {
                        var r = 0 | E(t.length)
                            , e = y(r);
                        return 0 === e.length || t.copy(e, 0, 0, r),
                            e
                    }
                    if (void 0 !== t.length)
                        return "number" != typeof t.length || ot(t.length) ? y(0) : m(t);
                    if ("Buffer" === t.type && Array.isArray(t.data))
                        return m(t.data)
                }(t);
                if (o)
                    return o;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
                    return d.from(t[Symbol.toPrimitive]("string"), r, e);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + a(t))
            }

            function w(t) {
                if ("number" != typeof t)
                    throw new TypeError('"size" argument must be of type number');
                if (t < 0)
                    throw new RangeError('The value "' + t + '" is invalid for option "size"')
            }

            function b(t) {
                return w(t),
                    y(t < 0 ? 0 : 0 | E(t))
            }

            function m(t) {
                for (var r = t.length < 0 ? 0 : 0 | E(t.length), e = y(r), n = 0; n < r; n += 1)
                    e[n] = 255 & t[n];
                return e
            }

            function B(t, r, e) {
                if (r < 0 || t.byteLength < r)
                    throw new RangeError('"offset" is outside of buffer bounds');
                if (t.byteLength < r + (e || 0))
                    throw new RangeError('"length" is outside of buffer bounds');
                var n;
                return n = void 0 === r && void 0 === e ? new Uint8Array(t) : void 0 === e ? new Uint8Array(t, r) : new Uint8Array(t, r, e),
                    Object.setPrototypeOf(n, d.prototype),
                    n
            }

            function E(t) {
                if (t >= g)
                    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + g.toString(16) + " bytes");
                return 0 | t
            }

            function A(t, r) {
                if (d.isBuffer(t))
                    return t.length;
                if (ArrayBuffer.isView(t) || nt(t, ArrayBuffer))
                    return t.byteLength;
                if ("string" != typeof t)
                    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + a(t));
                var e = t.length
                    , n = arguments.length > 2 && !0 === arguments[2];
                if (!n && 0 === e)
                    return 0;
                for (var o = !1; ;)
                    switch (r) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return e;
                        case "utf8":
                        case "utf-8":
                            return tt(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * e;
                        case "hex":
                            return e >>> 1;
                        case "base64":
                            return rt(t).length;
                        default:
                            if (o)
                                return n ? -1 : tt(t).length;
                            r = ("" + r).toLowerCase(),
                                o = !0
                    }
            }

            function _(t, r, e) {
                var n = !1;
                if ((void 0 === r || r < 0) && (r = 0),
                r > this.length)
                    return "";
                if ((void 0 === e || e > this.length) && (e = this.length),
                e <= 0)
                    return "";
                if ((e >>>= 0) <= (r >>>= 0))
                    return "";
                for (t || (t = "utf8"); ;)
                    switch (t) {
                        case "hex":
                            return N(this, r, e);
                        case "utf8":
                        case "utf-8":
                            return C(this, r, e);
                        case "ascii":
                            return P(this, r, e);
                        case "latin1":
                        case "binary":
                            return j(this, r, e);
                        case "base64":
                            return L(this, r, e);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return z(this, r, e);
                        default:
                            if (n)
                                throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(),
                                n = !0
                    }
            }

            function I(t, r, e) {
                var n = t[r];
                t[r] = t[e],
                    t[e] = n
            }

            function U(t, r, e, n, o) {
                if (0 === t.length)
                    return -1;
                if ("string" == typeof e ? (n = e,
                    e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648),
                ot(e = +e) && (e = o ? 0 : t.length - 1),
                e < 0 && (e = t.length + e),
                e >= t.length) {
                    if (o)
                        return -1;
                    e = t.length - 1
                } else if (e < 0) {
                    if (!o)
                        return -1;
                    e = 0
                }
                if ("string" == typeof r && (r = d.from(r, n)),
                    d.isBuffer(r))
                    return 0 === r.length ? -1 : R(t, r, e, n, o);
                if ("number" == typeof r)
                    return r &= 255,
                        "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : R(t, [r], e, n, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function R(t, r, e, n, o) {
                var i, f = 1, u = t.length, s = r.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || r.length < 2)
                        return -1;
                    f = 2,
                        u /= 2,
                        s /= 2,
                        e /= 2
                }

                function h(t, r) {
                    return 1 === f ? t[r] : t.readUInt16BE(r * f)
                }

                if (o) {
                    var a = -1;
                    for (i = e; i < u; i++)
                        if (h(t, i) === h(r, -1 === a ? 0 : i - a)) {
                            if (-1 === a && (a = i),
                            i - a + 1 === s)
                                return a * f
                        } else
                            -1 !== a && (i -= i - a),
                                a = -1
                } else
                    for (e + s > u && (e = u - s),
                             i = e; i >= 0; i--) {
                        for (var c = !0, p = 0; p < s; p++)
                            if (h(t, i + p) !== h(r, p)) {
                                c = !1;
                                break
                            }
                        if (c)
                            return i
                    }
                return -1
            }

            function O(t, r, e, n) {
                e = Number(e) || 0;
                var o = t.length - e;
                n ? (n = Number(n)) > o && (n = o) : n = o;
                var i, f = r.length;
                for (n > f / 2 && (n = f / 2),
                         i = 0; i < n; ++i) {
                    var u = parseInt(r.substr(2 * i, 2), 16);
                    if (ot(u))
                        return i;
                    t[e + i] = u
                }
                return i
            }

            function x(t, r, e, n) {
                return et(tt(r, t.length - e), t, e, n)
            }

            function M(t, r, e, n) {
                return et(function (t) {
                    for (var r = [], e = 0; e < t.length; ++e)
                        r.push(255 & t.charCodeAt(e));
                    return r
                }(r), t, e, n)
            }

            function T(t, r, e, n) {
                return et(rt(r), t, e, n)
            }

            function S(t, r, e, n) {
                return et(function (t, r) {
                    for (var e, n, o, i = [], f = 0; f < t.length && !((r -= 2) < 0); ++f)
                        n = (e = t.charCodeAt(f)) >> 8,
                            o = e % 256,
                            i.push(o),
                            i.push(n);
                    return i
                }(r, t.length - e), t, e, n)
            }

            function L(t, r, e) {
                return 0 === r && e === t.length ? c.fromByteArray(t) : c.fromByteArray(t.slice(r, e))
            }

            function C(t, r, e) {
                e = Math.min(t.length, e);
                for (var n = [], o = r; o < e;) {
                    var i = t[o]
                        , f = null
                        , u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                    if (o + u <= e) {
                        var s = void 0
                            , h = void 0
                            , a = void 0
                            , c = void 0;
                        switch (u) {
                            case 1:
                                i < 128 && (f = i);
                                break;
                            case 2:
                                128 == (192 & (s = t[o + 1])) && (c = (31 & i) << 6 | 63 & s) > 127 && (f = c);
                                break;
                            case 3:
                                s = t[o + 1],
                                    h = t[o + 2],
                                128 == (192 & s) && 128 == (192 & h) && (c = (15 & i) << 12 | (63 & s) << 6 | 63 & h) > 2047 && (c < 55296 || c > 57343) && (f = c);
                                break;
                            case 4:
                                s = t[o + 1],
                                    h = t[o + 2],
                                    a = t[o + 3],
                                128 == (192 & s) && 128 == (192 & h) && 128 == (192 & a) && (c = (15 & i) << 18 | (63 & s) << 12 | (63 & h) << 6 | 63 & a) > 65535 && c < 1114112 && (f = c)
                        }
                    }
                    null === f ? (f = 65533,
                        u = 1) : f > 65535 && (f -= 65536,
                        n.push(f >>> 10 & 1023 | 55296),
                        f = 56320 | 1023 & f),
                        n.push(f),
                        o += u
                }
                return function (t) {
                    var r = t.length;
                    if (r <= k)
                        return String.fromCharCode.apply(String, t);
                    var e = ""
                        , n = 0;
                    for (; n < r;)
                        e += String.fromCharCode.apply(String, t.slice(n, n += k));
                    return e
                }(n)
            }

            d.TYPED_ARRAY_SUPPORT = function () {
                try {
                    var t = new Uint8Array(1)
                        , r = {
                        foo: function () {
                            return 42
                        }
                    };
                    return Object.setPrototypeOf(r, Uint8Array.prototype),
                        Object.setPrototypeOf(t, r),
                    42 === t.foo()
                } catch (t) {
                    return !1
                }
            }(),
            d.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
                Object.defineProperty(d.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (d.isBuffer(this))
                            return this.buffer
                    }
                }),
                Object.defineProperty(d.prototype, "offset", {
                    enumerable: !0,
                    get: function () {
                        if (d.isBuffer(this))
                            return this.byteOffset
                    }
                }),
                d.poolSize = 8192,
                d.from = function (t, r, e) {
                    return v(t, r, e)
                }
                ,
                Object.setPrototypeOf(d.prototype, Uint8Array.prototype),
                Object.setPrototypeOf(d, Uint8Array),
                d.alloc = function (t, r, e) {
                    return function (t, r, e) {
                        return w(t),
                            t <= 0 ? y(t) : void 0 !== r ? "string" == typeof e ? y(t).fill(r, e) : y(t).fill(r) : y(t)
                    }(t, r, e)
                }
                ,
                d.allocUnsafe = function (t) {
                    return b(t)
                }
                ,
                d.allocUnsafeSlow = function (t) {
                    return b(t)
                }
                ,
                d.isBuffer = function (t) {
                    return null != t && !0 === t._isBuffer && t !== d.prototype
                }
                ,
                d.compare = function (t, r) {
                    if (nt(t, Uint8Array) && (t = d.from(t, t.offset, t.byteLength)),
                    nt(r, Uint8Array) && (r = d.from(r, r.offset, r.byteLength)),
                    !d.isBuffer(t) || !d.isBuffer(r))
                        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === r)
                        return 0;
                    for (var e = t.length, n = r.length, o = 0, i = Math.min(e, n); o < i; ++o)
                        if (t[o] !== r[o]) {
                            e = t[o],
                                n = r[o];
                            break
                        }
                    return e < n ? -1 : n < e ? 1 : 0
                }
                ,
                d.isEncoding = function (t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }
                ,
                d.concat = function (t, r) {
                    if (!Array.isArray(t))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length)
                        return d.alloc(0);
                    var e;
                    if (void 0 === r)
                        for (r = 0,
                                 e = 0; e < t.length; ++e)
                            r += t[e].length;
                    var n = d.allocUnsafe(r)
                        , o = 0;
                    for (e = 0; e < t.length; ++e) {
                        var i = t[e];
                        if (nt(i, Uint8Array))
                            o + i.length > n.length ? (d.isBuffer(i) || (i = d.from(i)),
                                i.copy(n, o)) : Uint8Array.prototype.set.call(n, i, o);
                        else {
                            if (!d.isBuffer(i))
                                throw new TypeError('"list" argument must be an Array of Buffers');
                            i.copy(n, o)
                        }
                        o += i.length
                    }
                    return n
                }
                ,
                d.byteLength = A,
                d.prototype._isBuffer = !0,
                d.prototype.swap16 = function () {
                    var t = this.length;
                    if (t % 2 != 0)
                        throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var r = 0; r < t; r += 2)
                        I(this, r, r + 1);
                    return this
                }
                ,
                d.prototype.swap32 = function () {
                    var t = this.length;
                    if (t % 4 != 0)
                        throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var r = 0; r < t; r += 4)
                        I(this, r, r + 3),
                            I(this, r + 1, r + 2);
                    return this
                }
                ,
                d.prototype.swap64 = function () {
                    var t = this.length;
                    if (t % 8 != 0)
                        throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var r = 0; r < t; r += 8)
                        I(this, r, r + 7),
                            I(this, r + 1, r + 6),
                            I(this, r + 2, r + 5),
                            I(this, r + 3, r + 4);
                    return this
                }
                ,
                d.prototype.toString = function () {
                    var t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? C(this, 0, t) : _.apply(this, arguments)
                }
                ,
                d.prototype.toLocaleString = d.prototype.toString,
                d.prototype.equals = function (t) {
                    if (!d.isBuffer(t))
                        throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === d.compare(this, t)
                }
                ,
                d.prototype.inspect = function () {
                    var t = ""
                        , e = r.h2;
                    return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(),
                    this.length > e && (t += " ... "),
                    "<Buffer " + t + ">"
                }
                ,
            l && (d.prototype[l] = d.prototype.inspect),
                d.prototype.compare = function (t, r, e, n, o) {
                    if (nt(t, Uint8Array) && (t = d.from(t, t.offset, t.byteLength)),
                        !d.isBuffer(t))
                        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + a(t));
                    if (void 0 === r && (r = 0),
                    void 0 === e && (e = t ? t.length : 0),
                    void 0 === n && (n = 0),
                    void 0 === o && (o = this.length),
                    r < 0 || e > t.length || n < 0 || o > this.length)
                        throw new RangeError("out of range index");
                    if (n >= o && r >= e)
                        return 0;
                    if (n >= o)
                        return -1;
                    if (r >= e)
                        return 1;
                    if (this === t)
                        return 0;
                    for (var i = (o >>>= 0) - (n >>>= 0), f = (e >>>= 0) - (r >>>= 0), u = Math.min(i, f), s = this.slice(n, o), h = t.slice(r, e), c = 0; c < u; ++c)
                        if (s[c] !== h[c]) {
                            i = s[c],
                                f = h[c];
                            break
                        }
                    return i < f ? -1 : f < i ? 1 : 0
                }
                ,
                d.prototype.includes = function (t, r, e) {
                    return -1 !== this.indexOf(t, r, e)
                }
                ,
                d.prototype.indexOf = function (t, r, e) {
                    return U(this, t, r, e, !0)
                }
                ,
                d.prototype.lastIndexOf = function (t, r, e) {
                    return U(this, t, r, e, !1)
                }
                ,
                d.prototype.write = function (t, r, e, n) {
                    if (void 0 === r)
                        n = "utf8",
                            e = this.length,
                            r = 0;
                    else if (void 0 === e && "string" == typeof r)
                        n = r,
                            e = this.length,
                            r = 0;
                    else {
                        if (!isFinite(r))
                            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        r >>>= 0,
                            isFinite(e) ? (e >>>= 0,
                            void 0 === n && (n = "utf8")) : (n = e,
                                e = void 0)
                    }
                    var o = this.length - r;
                    if ((void 0 === e || e > o) && (e = o),
                    t.length > 0 && (e < 0 || r < 0) || r > this.length)
                        throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var i = !1; ;)
                        switch (n) {
                            case "hex":
                                return O(this, t, r, e);
                            case "utf8":
                            case "utf-8":
                                return x(this, t, r, e);
                            case "ascii":
                            case "latin1":
                            case "binary":
                                return M(this, t, r, e);
                            case "base64":
                                return T(this, t, r, e);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return S(this, t, r, e);
                            default:
                                if (i)
                                    throw new TypeError("Unknown encoding: " + n);
                                n = ("" + n).toLowerCase(),
                                    i = !0
                        }
                }
                ,
                d.prototype.toJSON = function () {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                }
            ;
            var k = 4096;

            function P(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for (var o = r; o < e; ++o)
                    n += String.fromCharCode(127 & t[o]);
                return n
            }

            function j(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for (var o = r; o < e; ++o)
                    n += String.fromCharCode(t[o]);
                return n
            }

            function N(t, r, e) {
                var n = t.length;
                (!r || r < 0) && (r = 0),
                (!e || e < 0 || e > n) && (e = n);
                for (var o = "", i = r; i < e; ++i)
                    o += it[t[i]];
                return o
            }

            function z(t, r, e) {
                for (var n = t.slice(r, e), o = "", i = 0; i < n.length - 1; i += 2)
                    o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return o
            }

            function F(t, r, e) {
                if (t % 1 != 0 || t < 0)
                    throw new RangeError("offset is not uint");
                if (t + r > e)
                    throw new RangeError("Trying to access beyond buffer length")
            }

            function D(t, r, e, n, o, i) {
                if (!d.isBuffer(t))
                    throw new TypeError('"buffer" argument must be a Buffer instance');
                if (r > o || r < i)
                    throw new RangeError('"value" argument is out of bounds');
                if (e + n > t.length)
                    throw new RangeError("Index out of range")
            }

            function Y(t, r, e, n, o) {
                K(r, n, o, t, e, 7);
                var i = Number(r & BigInt(4294967295));
                t[e++] = i,
                    i >>= 8,
                    t[e++] = i,
                    i >>= 8,
                    t[e++] = i,
                    i >>= 8,
                    t[e++] = i;
                var f = Number(r >> BigInt(32) & BigInt(4294967295));
                return t[e++] = f,
                    f >>= 8,
                    t[e++] = f,
                    f >>= 8,
                    t[e++] = f,
                    f >>= 8,
                    t[e++] = f,
                    e
            }

            function W(t, r, e, n, o) {
                K(r, n, o, t, e, 7);
                var i = Number(r & BigInt(4294967295));
                t[e + 7] = i,
                    i >>= 8,
                    t[e + 6] = i,
                    i >>= 8,
                    t[e + 5] = i,
                    i >>= 8,
                    t[e + 4] = i;
                var f = Number(r >> BigInt(32) & BigInt(4294967295));
                return t[e + 3] = f,
                    f >>= 8,
                    t[e + 2] = f,
                    f >>= 8,
                    t[e + 1] = f,
                    f >>= 8,
                    t[e] = f,
                e + 8
            }

            function G(t, r, e, n, o, i) {
                if (e + n > t.length)
                    throw new RangeError("Index out of range");
                if (e < 0)
                    throw new RangeError("Index out of range")
            }

            function H(t, r, e, n, o) {
                return r = +r,
                    e >>>= 0,
                o || G(t, 0, e, 4),
                    p.write(t, r, e, n, 23, 4),
                e + 4
            }

            function V(t, r, e, n, o) {
                return r = +r,
                    e >>>= 0,
                o || G(t, 0, e, 8),
                    p.write(t, r, e, n, 52, 8),
                e + 8
            }

            d.prototype.slice = function (t, r) {
                var e = this.length;
                (t = ~~t) < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e),
                    (r = void 0 === r ? e : ~~r) < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e),
                r < t && (r = t);
                var n = this.subarray(t, r);
                return Object.setPrototypeOf(n, d.prototype),
                    n
            }
                ,
                d.prototype.readUintLE = d.prototype.readUIntLE = function (t, r, e) {
                    t >>>= 0,
                        r >>>= 0,
                    e || F(t, r, this.length);
                    for (var n = this[t], o = 1, i = 0; ++i < r && (o *= 256);)
                        n += this[t + i] * o;
                    return n
                }
                ,
                d.prototype.readUintBE = d.prototype.readUIntBE = function (t, r, e) {
                    t >>>= 0,
                        r >>>= 0,
                    e || F(t, r, this.length);
                    for (var n = this[t + --r], o = 1; r > 0 && (o *= 256);)
                        n += this[t + --r] * o;
                    return n
                }
                ,
                d.prototype.readUint8 = d.prototype.readUInt8 = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 1, this.length),
                        this[t]
                }
                ,
                d.prototype.readUint16LE = d.prototype.readUInt16LE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 2, this.length),
                    this[t] | this[t + 1] << 8
                }
                ,
                d.prototype.readUint16BE = d.prototype.readUInt16BE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 2, this.length),
                    this[t] << 8 | this[t + 1]
                }
                ,
                d.prototype.readUint32LE = d.prototype.readUInt32LE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 4, this.length),
                    (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }
                ,
                d.prototype.readUint32BE = d.prototype.readUInt32BE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 4, this.length),
                    16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }
                ,
                d.prototype.readBigUInt64LE = ft((function (t) {
                        Q(t >>>= 0, "offset");
                        var r = this[t]
                            , e = this[t + 7];
                        void 0 !== r && void 0 !== e || X(t, this.length - 8);
                        var n = r + this[++t] * Math.pow(2, 8) + this[++t] * Math.pow(2, 16) + this[++t] * Math.pow(2, 24)
                            ,
                            o = this[++t] + this[++t] * Math.pow(2, 8) + this[++t] * Math.pow(2, 16) + e * Math.pow(2, 24);
                        return BigInt(n) + (BigInt(o) << BigInt(32))
                    }
                )),
                d.prototype.readBigUInt64BE = ft((function (t) {
                        Q(t >>>= 0, "offset");
                        var r = this[t]
                            , e = this[t + 7];
                        void 0 !== r && void 0 !== e || X(t, this.length - 8);
                        var n = r * Math.pow(2, 24) + this[++t] * Math.pow(2, 16) + this[++t] * Math.pow(2, 8) + this[++t]
                            ,
                            o = this[++t] * Math.pow(2, 24) + this[++t] * Math.pow(2, 16) + this[++t] * Math.pow(2, 8) + e;
                        return (BigInt(n) << BigInt(32)) + BigInt(o)
                    }
                )),
                d.prototype.readIntLE = function (t, r, e) {
                    t >>>= 0,
                        r >>>= 0,
                    e || F(t, r, this.length);
                    for (var n = this[t], o = 1, i = 0; ++i < r && (o *= 256);)
                        n += this[t + i] * o;
                    return n >= (o *= 128) && (n -= Math.pow(2, 8 * r)),
                        n
                }
                ,
                d.prototype.readIntBE = function (t, r, e) {
                    t >>>= 0,
                        r >>>= 0,
                    e || F(t, r, this.length);
                    for (var n = r, o = 1, i = this[t + --n]; n > 0 && (o *= 256);)
                        i += this[t + --n] * o;
                    return i >= (o *= 128) && (i -= Math.pow(2, 8 * r)),
                        i
                }
                ,
                d.prototype.readInt8 = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 1, this.length),
                        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }
                ,
                d.prototype.readInt16LE = function (t, r) {
                    t >>>= 0,
                    r || F(t, 2, this.length);
                    var e = this[t] | this[t + 1] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }
                ,
                d.prototype.readInt16BE = function (t, r) {
                    t >>>= 0,
                    r || F(t, 2, this.length);
                    var e = this[t + 1] | this[t] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }
                ,
                d.prototype.readInt32LE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 4, this.length),
                    this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }
                ,
                d.prototype.readInt32BE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 4, this.length),
                    this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }
                ,
                d.prototype.readBigInt64LE = ft((function (t) {
                        Q(t >>>= 0, "offset");
                        var r = this[t]
                            , e = this[t + 7];
                        void 0 !== r && void 0 !== e || X(t, this.length - 8);
                        var n = this[t + 4] + this[t + 5] * Math.pow(2, 8) + this[t + 6] * Math.pow(2, 16) + (e << 24);
                        return (BigInt(n) << BigInt(32)) + BigInt(r + this[++t] * Math.pow(2, 8) + this[++t] * Math.pow(2, 16) + this[++t] * Math.pow(2, 24))
                    }
                )),
                d.prototype.readBigInt64BE = ft((function (t) {
                        Q(t >>>= 0, "offset");
                        var r = this[t]
                            , e = this[t + 7];
                        void 0 !== r && void 0 !== e || X(t, this.length - 8);
                        var n = (r << 24) + this[++t] * Math.pow(2, 16) + this[++t] * Math.pow(2, 8) + this[++t];
                        return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * Math.pow(2, 24) + this[++t] * Math.pow(2, 16) + this[++t] * Math.pow(2, 8) + e)
                    }
                )),
                d.prototype.readFloatLE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 4, this.length),
                        p.read(this, t, !0, 23, 4)
                }
                ,
                d.prototype.readFloatBE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 4, this.length),
                        p.read(this, t, !1, 23, 4)
                }
                ,
                d.prototype.readDoubleLE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 8, this.length),
                        p.read(this, t, !0, 52, 8)
                }
                ,
                d.prototype.readDoubleBE = function (t, r) {
                    return t >>>= 0,
                    r || F(t, 8, this.length),
                        p.read(this, t, !1, 52, 8)
                }
                ,
                d.prototype.writeUintLE = d.prototype.writeUIntLE = function (t, r, e, n) {
                    (t = +t,
                        r >>>= 0,
                        e >>>= 0,
                        n) || D(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                    var o = 1
                        , i = 0;
                    for (this[r] = 255 & t; ++i < e && (o *= 256);)
                        this[r + i] = t / o & 255;
                    return r + e
                }
                ,
                d.prototype.writeUintBE = d.prototype.writeUIntBE = function (t, r, e, n) {
                    (t = +t,
                        r >>>= 0,
                        e >>>= 0,
                        n) || D(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                    var o = e - 1
                        , i = 1;
                    for (this[r + o] = 255 & t; --o >= 0 && (i *= 256);)
                        this[r + o] = t / i & 255;
                    return r + e
                }
                ,
                d.prototype.writeUint8 = d.prototype.writeUInt8 = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 1, 255, 0),
                        this[r] = 255 & t,
                    r + 1
                }
                ,
                d.prototype.writeUint16LE = d.prototype.writeUInt16LE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 2, 65535, 0),
                        this[r] = 255 & t,
                        this[r + 1] = t >>> 8,
                    r + 2
                }
                ,
                d.prototype.writeUint16BE = d.prototype.writeUInt16BE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 2, 65535, 0),
                        this[r] = t >>> 8,
                        this[r + 1] = 255 & t,
                    r + 2
                }
                ,
                d.prototype.writeUint32LE = d.prototype.writeUInt32LE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 4, 4294967295, 0),
                        this[r + 3] = t >>> 24,
                        this[r + 2] = t >>> 16,
                        this[r + 1] = t >>> 8,
                        this[r] = 255 & t,
                    r + 4
                }
                ,
                d.prototype.writeUint32BE = d.prototype.writeUInt32BE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 4, 4294967295, 0),
                        this[r] = t >>> 24,
                        this[r + 1] = t >>> 16,
                        this[r + 2] = t >>> 8,
                        this[r + 3] = 255 & t,
                    r + 4
                }
                ,
                d.prototype.writeBigUInt64LE = ft((function (t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                        return Y(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"))
                    }
                )),
                d.prototype.writeBigUInt64BE = ft((function (t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                        return W(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"))
                    }
                )),
                d.prototype.writeIntLE = function (t, r, e, n) {
                    if (t = +t,
                        r >>>= 0,
                        !n) {
                        var o = Math.pow(2, 8 * e - 1);
                        D(this, t, r, e, o - 1, -o)
                    }
                    var i = 0
                        , f = 1
                        , u = 0;
                    for (this[r] = 255 & t; ++i < e && (f *= 256);)
                        t < 0 && 0 === u && 0 !== this[r + i - 1] && (u = 1),
                            this[r + i] = (t / f >> 0) - u & 255;
                    return r + e
                }
                ,
                d.prototype.writeIntBE = function (t, r, e, n) {
                    if (t = +t,
                        r >>>= 0,
                        !n) {
                        var o = Math.pow(2, 8 * e - 1);
                        D(this, t, r, e, o - 1, -o)
                    }
                    var i = e - 1
                        , f = 1
                        , u = 0;
                    for (this[r + i] = 255 & t; --i >= 0 && (f *= 256);)
                        t < 0 && 0 === u && 0 !== this[r + i + 1] && (u = 1),
                            this[r + i] = (t / f >> 0) - u & 255;
                    return r + e
                }
                ,
                d.prototype.writeInt8 = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 1, 127, -128),
                    t < 0 && (t = 255 + t + 1),
                        this[r] = 255 & t,
                    r + 1
                }
                ,
                d.prototype.writeInt16LE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 2, 32767, -32768),
                        this[r] = 255 & t,
                        this[r + 1] = t >>> 8,
                    r + 2
                }
                ,
                d.prototype.writeInt16BE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 2, 32767, -32768),
                        this[r] = t >>> 8,
                        this[r + 1] = 255 & t,
                    r + 2
                }
                ,
                d.prototype.writeInt32LE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 4, 2147483647, -2147483648),
                        this[r] = 255 & t,
                        this[r + 1] = t >>> 8,
                        this[r + 2] = t >>> 16,
                        this[r + 3] = t >>> 24,
                    r + 4
                }
                ,
                d.prototype.writeInt32BE = function (t, r, e) {
                    return t = +t,
                        r >>>= 0,
                    e || D(this, t, r, 4, 2147483647, -2147483648),
                    t < 0 && (t = 4294967295 + t + 1),
                        this[r] = t >>> 24,
                        this[r + 1] = t >>> 16,
                        this[r + 2] = t >>> 8,
                        this[r + 3] = 255 & t,
                    r + 4
                }
                ,
                d.prototype.writeBigInt64LE = ft((function (t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                        return Y(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                    }
                )),
                d.prototype.writeBigInt64BE = ft((function (t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                        return W(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                    }
                )),
                d.prototype.writeFloatLE = function (t, r, e) {
                    return H(this, t, r, !0, e)
                }
                ,
                d.prototype.writeFloatBE = function (t, r, e) {
                    return H(this, t, r, !1, e)
                }
                ,
                d.prototype.writeDoubleLE = function (t, r, e) {
                    return V(this, t, r, !0, e)
                }
                ,
                d.prototype.writeDoubleBE = function (t, r, e) {
                    return V(this, t, r, !1, e)
                }
                ,
                d.prototype.copy = function (t, r, e, n) {
                    if (!d.isBuffer(t))
                        throw new TypeError("argument should be a Buffer");
                    if (e || (e = 0),
                    n || 0 === n || (n = this.length),
                    r >= t.length && (r = t.length),
                    r || (r = 0),
                    n > 0 && n < e && (n = e),
                    n === e)
                        return 0;
                    if (0 === t.length || 0 === this.length)
                        return 0;
                    if (r < 0)
                        throw new RangeError("targetStart out of bounds");
                    if (e < 0 || e >= this.length)
                        throw new RangeError("Index out of range");
                    if (n < 0)
                        throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length),
                    t.length - r < n - e && (n = t.length - r + e);
                    var o = n - e;
                    return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(r, e, n) : Uint8Array.prototype.set.call(t, this.subarray(e, n), r),
                        o
                }
                ,
                d.prototype.fill = function (t, r, e, n) {
                    if ("string" == typeof t) {
                        if ("string" == typeof r ? (n = r,
                            r = 0,
                            e = this.length) : "string" == typeof e && (n = e,
                            e = this.length),
                        void 0 !== n && "string" != typeof n)
                            throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !d.isEncoding(n))
                            throw new TypeError("Unknown encoding: " + n);
                        if (1 === t.length) {
                            var o = t.charCodeAt(0);
                            ("utf8" === n && o < 128 || "latin1" === n) && (t = o)
                        }
                    } else
                        "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                    if (r < 0 || this.length < r || this.length < e)
                        throw new RangeError("Out of range index");
                    if (e <= r)
                        return this;
                    var i;
                    if (r >>>= 0,
                        e = void 0 === e ? this.length : e >>> 0,
                    t || (t = 0),
                    "number" == typeof t)
                        for (i = r; i < e; ++i)
                            this[i] = t;
                    else {
                        var f = d.isBuffer(t) ? t : d.from(t, n)
                            , u = f.length;
                        if (0 === u)
                            throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (i = 0; i < e - r; ++i)
                            this[i + r] = f[i % u]
                    }
                    return this
                }
            ;
            var q = {};

            function J(t, r, e) {
                q[t] = function (e) {
                    !function (t, r) {
                        if ("function" != typeof r && null !== r)
                            throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(r && r.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                            Object.defineProperty(t, "prototype", {
                                writable: !1
                            }),
                        r && i(t, r)
                    }(p, e);
                    var u, h, a, c = f(p);

                    function p() {
                        var e;
                        return n(this, p),
                            e = c.call(this),
                            Object.defineProperty(s(e), "message", {
                                value: r.apply(s(e), arguments),
                                writable: !0,
                                configurable: !0
                            }),
                            e.name = "".concat(e.name, " [").concat(t, "]"),
                            e.stack,
                            delete e.name,
                            e
                    }

                    return u = p,
                    (h = [{
                        key: "code",
                        get: function () {
                            return t
                        },
                        set: function (t) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: t,
                                writable: !0
                            })
                        }
                    }, {
                        key: "toString",
                        value: function () {
                            return "".concat(this.name, " [").concat(t, "]: ").concat(this.message)
                        }
                    }]) && o(u.prototype, h),
                    a && o(u, a),
                        Object.defineProperty(u, "prototype", {
                            writable: !1
                        }),
                        p
                }(e)
            }

            function Z(t) {
                for (var r = "", e = t.length, n = "-" === t[0] ? 1 : 0; e >= n + 4; e -= 3)
                    r = "_".concat(t.slice(e - 3, e)).concat(r);
                return "".concat(t.slice(0, e)).concat(r)
            }

            function K(t, r, e, n, o, i) {
                if (t > e || t < r) {
                    var f, u = "bigint" == typeof r ? "n" : "";
                    throw f = i > 3 ? 0 === r || r === BigInt(0) ? ">= 0".concat(u, " and < 2").concat(u, " ** ").concat(8 * (i + 1)).concat(u) : ">= -(2".concat(u, " ** ").concat(8 * (i + 1) - 1).concat(u, ") and < 2 ** ") + "".concat(8 * (i + 1) - 1).concat(u) : ">= ".concat(r).concat(u, " and <= ").concat(e).concat(u),
                        new q.ERR_OUT_OF_RANGE("value", f, t)
                }
                !function (t, r, e) {
                    Q(r, "offset"),
                    void 0 !== t[r] && void 0 !== t[r + e] || X(r, t.length - (e + 1))
                }(n, o, i)
            }

            function Q(t, r) {
                if ("number" != typeof t)
                    throw new q.ERR_INVALID_ARG_TYPE(r, "number", t)
            }

            function X(t, r, e) {
                if (Math.floor(t) !== t)
                    throw Q(t, e),
                        new q.ERR_OUT_OF_RANGE(e || "offset", "an integer", t);
                if (r < 0)
                    throw new q.ERR_BUFFER_OUT_OF_BOUNDS;
                throw new q.ERR_OUT_OF_RANGE(e || "offset", ">= ".concat(e ? 1 : 0, " and <= ").concat(r), t)
            }

            J("ERR_BUFFER_OUT_OF_BOUNDS", (function (t) {
                    return t ? "".concat(t, " is outside of buffer bounds") : "Attempt to access memory outside buffer bounds"
                }
            ), RangeError),
                J("ERR_INVALID_ARG_TYPE", (function (t, r) {
                        return 'The "'.concat(t, '" argument must be of type number. Received type ').concat(a(r))
                    }
                ), TypeError),
                J("ERR_OUT_OF_RANGE", (function (t, r, e) {
                        var n = 'The value of "'.concat(t, '" is out of range.')
                            , o = e;
                        return Number.isInteger(e) && Math.abs(e) > Math.pow(2, 32) ? o = Z(String(e)) : "bigint" == typeof e && (o = String(e),
                        (e > Math.pow(BigInt(2), BigInt(32)) || e < -Math.pow(BigInt(2), BigInt(32))) && (o = Z(o)),
                            o += "n"),
                            n += " It must be ".concat(r, ". Received ").concat(o)
                    }
                ), RangeError);
            var $ = /[^+/0-9A-Za-z-_]/g;

            function tt(t, r) {
                var e;
                r = r || 1 / 0;
                for (var n = t.length, o = null, i = [], f = 0; f < n; ++f) {
                    if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                        if (!o) {
                            if (e > 56319) {
                                (r -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (f + 1 === n) {
                                (r -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            o = e;
                            continue
                        }
                        if (e < 56320) {
                            (r -= 3) > -1 && i.push(239, 191, 189),
                                o = e;
                            continue
                        }
                        e = 65536 + (o - 55296 << 10 | e - 56320)
                    } else
                        o && (r -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null,
                    e < 128) {
                        if ((r -= 1) < 0)
                            break;
                        i.push(e)
                    } else if (e < 2048) {
                        if ((r -= 2) < 0)
                            break;
                        i.push(e >> 6 | 192, 63 & e | 128)
                    } else if (e < 65536) {
                        if ((r -= 3) < 0)
                            break;
                        i.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                    } else {
                        if (!(e < 1114112))
                            throw new Error("Invalid code point");
                        if ((r -= 4) < 0)
                            break;
                        i.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                    }
                }
                return i
            }

            function rt(t) {
                return c.toByteArray(function (t) {
                    if ((t = (t = t.split("=")[0]).trim().replace($, "")).length < 2)
                        return "";
                    for (; t.length % 4 != 0;)
                        t += "=";
                    return t
                }(t))
            }

            function et(t, r, e, n) {
                var o;
                for (o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
                    r[o + e] = t[o];
                return o
            }

            function nt(t, r) {
                return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
            }

            function ot(t) {
                return t != t
            }

            var it = function () {
                for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
                    for (var n = 16 * e, o = 0; o < 16; ++o)
                        r[n + o] = t[e] + t[o];
                return r
            }();

            function ft(t) {
                return "undefined" == typeof BigInt ? ut : t
            }

            function ut() {
                throw new Error("BigInt not supported")
            }
        },
        429: function (t, r) {
            r.read = function (t, r, e, n, o) {
                var i, f, u = 8 * o - n - 1, s = (1 << u) - 1, h = s >> 1, a = -7, c = e ? o - 1 : 0, p = e ? -1 : 1,
                    l = t[r + c];
                for (c += p,
                         i = l & (1 << -a) - 1,
                         l >>= -a,
                         a += u; a > 0; i = 256 * i + t[r + c],
                         c += p,
                         a -= 8)
                    ;
                for (f = i & (1 << -a) - 1,
                         i >>= -a,
                         a += n; a > 0; f = 256 * f + t[r + c],
                         c += p,
                         a -= 8)
                    ;
                if (0 === i)
                    i = 1 - h;
                else {
                    if (i === s)
                        return f ? NaN : 1 / 0 * (l ? -1 : 1);
                    f += Math.pow(2, n),
                        i -= h
                }
                return (l ? -1 : 1) * f * Math.pow(2, i - n)
            }
                ,
                r.write = function (t, r, e, n, o, i) {
                    var f, u, s, h = 8 * i - o - 1, a = (1 << h) - 1, c = a >> 1,
                        p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : i - 1, g = n ? 1 : -1,
                        y = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
                    for (r = Math.abs(r),
                             isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0,
                                 f = a) : (f = Math.floor(Math.log(r) / Math.LN2),
                             r * (s = Math.pow(2, -f)) < 1 && (f--,
                                 s *= 2),
                             (r += f + c >= 1 ? p / s : p * Math.pow(2, 1 - c)) * s >= 2 && (f++,
                                 s /= 2),
                                 f + c >= a ? (u = 0,
                                     f = a) : f + c >= 1 ? (u = (r * s - 1) * Math.pow(2, o),
                                     f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, o),
                                     f = 0)); o >= 8; t[e + l] = 255 & u,
                             l += g,
                             u /= 256,
                             o -= 8)
                        ;
                    for (f = f << o | u,
                             h += o; h > 0; t[e + l] = 255 & f,
                             l += g,
                             f /= 256,
                             h -= 8)
                        ;
                    t[e + l - g] |= 128 * y
                }
        },
        474: function (t, r, e) {
            "use strict";
            var n = e(957)
                , o = e(158);

            function i() {
                this.pending = null,
                    this.pendingTotal = 0,
                    this.blockSize = this.constructor.blockSize,
                    this.outSize = this.constructor.outSize,
                    this.hmacStrength = this.constructor.hmacStrength,
                    this.padLength = this.constructor.padLength / 8,
                    this.endian = "big",
                    this._delta8 = this.blockSize / 8,
                    this._delta32 = this.blockSize / 32
            }

            r.BlockHash = i,
                i.prototype.update = function (t, r) {
                    if (t = n.toArray(t, r),
                        this.pending ? this.pending = this.pending.concat(t) : this.pending = t,
                        this.pendingTotal += t.length,
                    this.pending.length >= this._delta8) {
                        var e = (t = this.pending).length % this._delta8;
                        this.pending = t.slice(t.length - e, t.length),
                        0 === this.pending.length && (this.pending = null),
                            t = n.join32(t, 0, t.length - e, this.endian);
                        for (var o = 0; o < t.length; o += this._delta32)
                            this._update(t, o, o + this._delta32)
                    }
                    return this
                }
                ,
                i.prototype.digest = function (t) {
                    return this.update(this._pad()),
                        o(null === this.pending),
                        this._digest(t)
                }
                ,
                i.prototype._pad = function () {
                    var t = this.pendingTotal
                        , r = this._delta8
                        , e = r - (t + this.padLength) % r
                        , n = new Array(e + this.padLength);
                    n[0] = 128;
                    for (var o = 1; o < e; o++)
                        n[o] = 0;
                    if (t <<= 3,
                    "big" === this.endian) {
                        for (var i = 8; i < this.padLength; i++)
                            n[o++] = 0;
                        n[o++] = 0,
                            n[o++] = 0,
                            n[o++] = 0,
                            n[o++] = 0,
                            n[o++] = t >>> 24 & 255,
                            n[o++] = t >>> 16 & 255,
                            n[o++] = t >>> 8 & 255,
                            n[o++] = 255 & t
                    } else
                        for (n[o++] = 255 & t,
                                 n[o++] = t >>> 8 & 255,
                                 n[o++] = t >>> 16 & 255,
                                 n[o++] = t >>> 24 & 255,
                                 n[o++] = 0,
                                 n[o++] = 0,
                                 n[o++] = 0,
                                 n[o++] = 0,
                                 i = 8; i < this.padLength; i++)
                            n[o++] = 0;
                    return n
                }
        },
        670: function (t, r, e) {
            "use strict";
            var n = e(957)
                , o = e(474)
                , i = e(255)
                , f = e(158)
                , u = n.sum32
                , s = n.sum32_4
                , h = n.sum32_5
                , a = i.ch32
                , c = i.maj32
                , p = i.s0_256
                , l = i.s1_256
                , g = i.g0_256
                , y = i.g1_256
                , d = o.BlockHash
                ,
                v = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

            function w() {
                if (!(this instanceof w))
                    return new w;
                d.call(this),
                    this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                    this.k = v,
                    this.W = new Array(64)
            }

            n.inherits(w, d),
                t.exports = w,
                w.blockSize = 512,
                w.outSize = 256,
                w.hmacStrength = 192,
                w.padLength = 64,
                w.prototype._update = function (t, r) {
                    for (var e = this.W, n = 0; n < 16; n++)
                        e[n] = t[r + n];
                    for (; n < e.length; n++)
                        e[n] = s(y(e[n - 2]), e[n - 7], g(e[n - 15]), e[n - 16]);
                    var o = this.h[0]
                        , i = this.h[1]
                        , d = this.h[2]
                        , v = this.h[3]
                        , w = this.h[4]
                        , b = this.h[5]
                        , m = this.h[6]
                        , B = this.h[7];
                    for (f(this.k.length === e.length),
                             n = 0; n < e.length; n++) {
                        var E = h(B, l(w), a(w, b, m), this.k[n], e[n])
                            , A = u(p(o), c(o, i, d));
                        B = m,
                            m = b,
                            b = w,
                            w = u(v, E),
                            v = d,
                            d = i,
                            i = o,
                            o = u(E, A)
                    }
                    this.h[0] = u(this.h[0], o),
                        this.h[1] = u(this.h[1], i),
                        this.h[2] = u(this.h[2], d),
                        this.h[3] = u(this.h[3], v),
                        this.h[4] = u(this.h[4], w),
                        this.h[5] = u(this.h[5], b),
                        this.h[6] = u(this.h[6], m),
                        this.h[7] = u(this.h[7], B)
                }
                ,
                w.prototype._digest = function (t) {
                    return "hex" === t ? n.toHex32(this.h, "big") : n.split32(this.h, "big")
                }
        },
        255: function (t, r, e) {
            "use strict";
            var n = e(957).rotr32;

            function o(t, r, e) {
                return t & r ^ ~t & e
            }

            function i(t, r, e) {
                return t & r ^ t & e ^ r & e
            }

            function f(t, r, e) {
                return t ^ r ^ e
            }

            r.ft_1 = function (t, r, e, n) {
                return 0 === t ? o(r, e, n) : 1 === t || 3 === t ? f(r, e, n) : 2 === t ? i(r, e, n) : void 0
            }
                ,
                r.ch32 = o,
                r.maj32 = i,
                r.p32 = f,
                r.s0_256 = function (t) {
                    return n(t, 2) ^ n(t, 13) ^ n(t, 22)
                }
                ,
                r.s1_256 = function (t) {
                    return n(t, 6) ^ n(t, 11) ^ n(t, 25)
                }
                ,
                r.g0_256 = function (t) {
                    return n(t, 7) ^ n(t, 18) ^ t >>> 3
                }
                ,
                r.g1_256 = function (t) {
                    return n(t, 17) ^ n(t, 19) ^ t >>> 10
                }
        },
        957: function (t, r, e) {
            "use strict";
            var n = e(158)
                , o = e(842);

            function i(t, r) {
                return 55296 == (64512 & t.charCodeAt(r)) && (!(r < 0 || r + 1 >= t.length) && 56320 == (64512 & t.charCodeAt(r + 1)))
            }

            function f(t) {
                return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
            }

            function u(t) {
                return 1 === t.length ? "0" + t : t
            }

            function s(t) {
                return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
            }

            r.inherits = o,
                r.toArray = function (t, r) {
                    if (Array.isArray(t))
                        return t.slice();
                    if (!t)
                        return [];
                    var e = [];
                    if ("string" == typeof t)
                        if (r) {
                            if ("hex" === r)
                                for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t),
                                         o = 0; o < t.length; o += 2)
                                    e.push(parseInt(t[o] + t[o + 1], 16))
                        } else
                            for (var n = 0, o = 0; o < t.length; o++) {
                                var f = t.charCodeAt(o);
                                f < 128 ? e[n++] = f : f < 2048 ? (e[n++] = f >> 6 | 192,
                                    e[n++] = 63 & f | 128) : i(t, o) ? (f = 65536 + ((1023 & f) << 10) + (1023 & t.charCodeAt(++o)),
                                    e[n++] = f >> 18 | 240,
                                    e[n++] = f >> 12 & 63 | 128,
                                    e[n++] = f >> 6 & 63 | 128,
                                    e[n++] = 63 & f | 128) : (e[n++] = f >> 12 | 224,
                                    e[n++] = f >> 6 & 63 | 128,
                                    e[n++] = 63 & f | 128)
                            }
                    else
                        for (o = 0; o < t.length; o++)
                            e[o] = 0 | t[o];
                    return e
                }
                ,
                r.toHex = function (t) {
                    for (var r = "", e = 0; e < t.length; e++)
                        r += u(t[e].toString(16));
                    return r
                }
                ,
                r.htonl = f,
                r.toHex32 = function (t, r) {
                    for (var e = "", n = 0; n < t.length; n++) {
                        var o = t[n];
                        "little" === r && (o = f(o)),
                            e += s(o.toString(16))
                    }
                    return e
                }
                ,
                r.zero2 = u,
                r.zero8 = s,
                r.join32 = function (t, r, e, o) {
                    var i = e - r;
                    n(i % 4 == 0);
                    for (var f = new Array(i / 4), u = 0, s = r; u < f.length; u++,
                        s += 4) {
                        var h;
                        h = "big" === o ? t[s] << 24 | t[s + 1] << 16 | t[s + 2] << 8 | t[s + 3] : t[s + 3] << 24 | t[s + 2] << 16 | t[s + 1] << 8 | t[s],
                            f[u] = h >>> 0
                    }
                    return f
                }
                ,
                r.split32 = function (t, r) {
                    for (var e = new Array(4 * t.length), n = 0, o = 0; n < t.length; n++,
                        o += 4) {
                        var i = t[n];
                        "big" === r ? (e[o] = i >>> 24,
                            e[o + 1] = i >>> 16 & 255,
                            e[o + 2] = i >>> 8 & 255,
                            e[o + 3] = 255 & i) : (e[o + 3] = i >>> 24,
                            e[o + 2] = i >>> 16 & 255,
                            e[o + 1] = i >>> 8 & 255,
                            e[o] = 255 & i)
                    }
                    return e
                }
                ,
                r.rotr32 = function (t, r) {
                    return t >>> r | t << 32 - r
                }
                ,
                r.rotl32 = function (t, r) {
                    return t << r | t >>> 32 - r
                }
                ,
                r.sum32 = function (t, r) {
                    return t + r >>> 0
                }
                ,
                r.sum32_3 = function (t, r, e) {
                    return t + r + e >>> 0
                }
                ,
                r.sum32_4 = function (t, r, e, n) {
                    return t + r + e + n >>> 0
                }
                ,
                r.sum32_5 = function (t, r, e, n, o) {
                    return t + r + e + n + o >>> 0
                }
                ,
                r.sum64 = function (t, r, e, n) {
                    var o = t[r]
                        , i = n + t[r + 1] >>> 0
                        , f = (i < n ? 1 : 0) + e + o;
                    t[r] = f >>> 0,
                        t[r + 1] = i
                }
                ,
                r.sum64_hi = function (t, r, e, n) {
                    return (r + n >>> 0 < r ? 1 : 0) + t + e >>> 0
                }
                ,
                r.sum64_lo = function (t, r, e, n) {
                    return r + n >>> 0
                }
                ,
                r.sum64_4_hi = function (t, r, e, n, o, i, f, u) {
                    var s = 0
                        , h = r;
                    return s += (h = h + n >>> 0) < r ? 1 : 0,
                        s += (h = h + i >>> 0) < i ? 1 : 0,
                    t + e + o + f + (s += (h = h + u >>> 0) < u ? 1 : 0) >>> 0
                }
                ,
                r.sum64_4_lo = function (t, r, e, n, o, i, f, u) {
                    return r + n + i + u >>> 0
                }
                ,
                r.sum64_5_hi = function (t, r, e, n, o, i, f, u, s, h) {
                    var a = 0
                        , c = r;
                    return a += (c = c + n >>> 0) < r ? 1 : 0,
                        a += (c = c + i >>> 0) < i ? 1 : 0,
                        a += (c = c + u >>> 0) < u ? 1 : 0,
                    t + e + o + f + s + (a += (c = c + h >>> 0) < h ? 1 : 0) >>> 0
                }
                ,
                r.sum64_5_lo = function (t, r, e, n, o, i, f, u, s, h) {
                    return r + n + i + u + h >>> 0
                }
                ,
                r.rotr64_hi = function (t, r, e) {
                    return (r << 32 - e | t >>> e) >>> 0
                }
                ,
                r.rotr64_lo = function (t, r, e) {
                    return (t << 32 - e | r >>> e) >>> 0
                }
                ,
                r.shr64_hi = function (t, r, e) {
                    return t >>> e
                }
                ,
                r.shr64_lo = function (t, r, e) {
                    return (t << 32 - e | r >>> e) >>> 0
                }
        },
        842: function (t) {
            "function" == typeof Object.create ? t.exports = function (t, r) {
                    r && (t.super_ = r,
                        t.prototype = Object.create(r.prototype, {
                            constructor: {
                                value: t,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }))
                }
                : t.exports = function (t, r) {
                    if (r) {
                        t.super_ = r;
                        var e = function () {
                        };
                        e.prototype = r.prototype,
                            t.prototype = new e,
                            t.prototype.constructor = t
                    }
                }
        },
        158: function (t) {
            function r(t, r) {
                if (!t)
                    throw new Error(r || "Assertion failed")
            }

            t.exports = r,
                r.equal = function (t, r, e) {
                    if (t != r)
                        throw new Error(e || "Assertion failed: " + t + " != " + r)
                }
        },
        1: function (t, r, e) {
            "use strict";
            r.utils = e(897),
                r.Bloom = e(492),
                r.Solver = e(634),
                r.Verifier = e(865)
        },
        492: function (t) {
            "use strict";

            function r(t, r, e) {
                this.filter = new Uint32Array(Math.ceil(t / 32)),
                    this.size = t,
                    this.n = r,
                    this.tweak = e
            }

            function e(t, r) {
                var e, n, o, i = 65535 & t, f = 65535 & r;
                return o = (t >>> 16) * f + (r >>> 16) * i & 65535,
                (e = (o += (n = i * f) >>> 16) << 16 | (n &= 65535)) < 0 && (e += 4294967296),
                    e
            }

            function n(t, r) {
                var e = t + r & 4294967295;
                return e < 0 && (e += 4294967296),
                    e
            }

            function o(t, r) {
                return t << r | t >>> 32 - r
            }

            t.exports = r,
                r.prototype.hash = function (t, r) {
                    return function (t, r) {
                        var i, f, u, s, h = 3432918353, a = 461845907, c = 15, p = 13, l = 5, g = 3864292196, y = r;
                        for (i = 0; i + 4 <= t.length; i += 4)
                            f = e(f = t[i] | t[i + 1] << 8 | t[i + 2] << 16 | t[i + 3] << 24, h),
                                f = e(f = o(f, c), a),
                                y = n(y = e(y = o(y ^= f, p), l), g);
                        if (i !== t.length) {
                            for (u = 0,
                                     s = t.length - 1; s >= i; s--)
                                u = u << 8 | t[s];
                            (u = o(u = e(u, h), c)) < 0 && (u += 4294967296),
                                y ^= u = e(u, a)
                        }
                        y ^= t.length,
                            y = e(y ^= y >>> 16, 2246822507),
                            y = e(y ^= y >>> 13, 3266489909),
                        (y ^= y >>> 16) < 0 && (y += 4294967296);
                        return y
                    }(t, n(e(r, 4221880213), this.tweak)) % this.size
                }
                ,
                r.prototype.reset = function () {
                    this.filter.fill(0)
                }
                ,
                r.prototype.add = function (t) {
                    for (var r = 0; r < this.n; r++) {
                        var e = this.hash(t, r)
                            , n = 1 << (31 & e)
                            , o = e >> 5;
                        this.filter[o] |= n
                    }
                }
                ,
                r.prototype.test = function (t) {
                    for (var r = 0; r < this.n; r++) {
                        var e = this.hash(t, r)
                            , n = 1 << (31 & e)
                            , o = e >> 5;
                        if (0 == (this.filter[o] & n))
                            return !1
                    }
                    return !0
                }
        },
        634: function (t, r, e) {
            "use strict";
            var n = e(897);

            function o() {
            }

            t.exports = o,
                o.prototype._genNonce = function (t) {
                    for (var r = Date.now(), e = n.writeTimestamp(t, r, 0), o = e + 4 * ((t.length - e) / 4 | 0); e < o; e += 4)
                        n.writeUInt32(t, 4294967296 * Math.random() >>> 0, e);
                    for (; e < t.length; e++)
                        t[e] = 256 * Math.random() >>> 0
                }
                ,
                o.prototype.solve = function (t, r) {
                    for (var e = n.allocBuffer(16); ;) {
                        this._genNonce(e);
                        var o = n.hash(e, r);
                        if (n.checkComplexity(o, t))
                            return e
                    }
                }
        },
        897: function (t, r, e) {
            "use strict";
            var n = e(670);

            function o(t, r) {
                return (t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]) >>> 0
            }

            function i(t, r, e) {
                return t[e] = r >>> 24 & 255,
                    t[e + 1] = r >>> 16 & 255,
                    t[e + 2] = r >>> 8 & 255,
                    t[e + 3] = 255 & r,
                e + 4
            }

            r.EMPTY_BUFFER = [],
                r.allocBuffer = function (t) {
                    for (var r = new Array(t), e = 0; e < r.length; e++)
                        r[e] = 0;
                    return r
                }
                ,
                r.readUInt32 = o,
                r.writeUInt32 = i,
                r.writeTimestamp = function (t, r, e) {
                    var n = (4294967295 & r) >>> 0;
                    return e = i(t, r / 4294967296 >>> 0, e),
                        i(t, n, e)
                }
                ,
                r.readTimestamp = function (t, r) {
                    return 4294967296 * o(t, r) + o(t, r + 4)
                }
                ,
                r.hash = function (t, r) {
                    var e = n();
                    return r && e.update(r),
                        e.update(t),
                        e.digest()
                }
                ,
                r.checkComplexity = e(591).checkComplexity
        },
        591: function (t, r, e) {
            "use strict";
            var n = e(158);
            r.checkComplexity = function (t, r) {
                n(r < 8 * t.length, "Complexity is too high");
                var e, o = 0;
                for (e = 0; e <= r - 8; e += 8,
                    o++)
                    if (0 !== t[o])
                        return !1;
                var i = 255 << 8 + e - r;
                return 0 == (t[o] & i)
            }
        },
        865: function (t, r, e) {
            "use strict";
            var n = e(1)
                , o = n.utils
                , i = n.Bloom;

            function f(t) {
                var r = function () {
                    return new i(t.size, t.n, 4294967296 * Math.random() >>> 0)
                };
                this.blooms = [r(), r()],
                    this.complexity = t.complexity,
                    this.validity = t.validity || 6e4,
                    this.prefix = t.prefix || o.EMPTY_BUFFER
            }

            t.exports = f,
                f.prototype.check = function (t, r) {
                    var e = this.prefix;
                    if (t.length < 8)
                        return !1;
                    if (t.length > 32)
                        return !1;
                    var n = o.readTimestamp(t, 0)
                        , i = Date.now();
                    if (Math.abs(n - i) > this.validity)
                        return !1;
                    for (var f = 0; f < this.blooms.length; f++)
                        if (this.blooms[f].test(t))
                            return !1;
                    var u = o.hash(t, e);
                    return !!o.checkComplexity(u, r || this.complexity) && (this.blooms[0].add(t),
                        !0)
                }
                ,
                f.prototype.reset = function () {
                    this.blooms[1].reset();
                    var t = this.blooms[0];
                    this.blooms[0] = this.blooms[1],
                        this.blooms[1] = t
                }
        }
    }
        , r = {};

    function e(n) {
        var o = r[n];
        if (void 0 !== o)
            return o.exports;
        var i = r[n] = {
            exports: {}
        };
        return t[n](i, i.exports, e),
            i.exports
    }

    e.d = function (t, r) {
        for (var n in r)
            e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: r[n]
            })
    }
        ,
        e.o = function (t, r) {
            return Object.prototype.hasOwnProperty.call(t, r)
        }
    ;
    var n = {};
    !function () {
        "use strict";
        e.d(n, {
            solve: function () {
                return o
            }
        });
        var t = e(1)
            , r = e(423);

        function o(e) {
            try {
                var n = Date.now()
                    , o = new t.Solver
                    , i = r.lW.from(e.prefix, "hex")
                    , f = o.solve(e.complexity, i)
                    , u = Date.now() - n;
                return {
                    status: "ok",
                    id: e.id,
                    nonce: r.lW.from(f).toString("hex"),
                    calctime: u
                }
            } catch (t) {
                return {
                    status: "error",
                    id: e.id,
                    error: t
                }
            }
        }

        simon = o

    }()
}();

function get_params(powPrefix, powComplexity) {
    var _0x39a516 = 100;
    var _0x47e7b5 = {
        "a1": "O+T3OVVgxMaVrg==;0",
        "a2": "rkJubN6GKRdwayZh9SJW6tlFAczCIg==;1",
        "a3": "fJuKSlFDEs8qHLAWiYVJyw==;2",
        "a4": "tXhoIjZqWUrGqA==;3",
        "a5": "igCpofGFC7ucBw==;4",
        "a6": "yyA=;5",
        "a7": "ox1sHY0Ee8vpMg==;6",
        "a8": "6P/PsszKlSO/dQ==;7",
        "a9": "2eMJ7xkfT58Bhg==;8",
        "b1": "1ZuiKgmVc1w=;9",
        "b2": "fF+EGiJRHYSJFA==;10",
        "b3": "EgpS7NeRtxdZMg==;11",
        "b4": "BekNU2PsFbs=;12",
        "b5": "3oDunQJHR3bAtg==;13",
        "b6": "qDrM/3O/k+Hsdg==;14",
        "b7": "Fezri+sTSDX1Jg==;15",
        "b8": "jRIJl5rq5T31EQ==;16",
        "b9": "hlHcofkfmwMu+A==;17",
        "c1": "zibKFw==;18",
        "c2": "w09xn8K/XtS74XID/ytGPA==;19",
        "c3": "wDPTeydNGE8k1yNhdxD3TA==;20",
        "c4": "Vs6hOVzO7ho=;21",
        "c5": "Ip4DwwCzYwI=;22",
        "c6": "UF1xiQ==;23",
        "c7": "dMDWMa/8Q+s=;24",
        "c8": "oxA=;25",
        "c9": "Cgceo1kq+3U=;26",
        "d1": "zlX2LRdcvM4=;27",
        "d2": "ewCZBg==;28",
        "d3": "8Ok8iqkFF5UFSw==;29",
        "d4": "g8bWaFXdzec=;30",
        "d5": "kvtc3r/pie64jw==;31",
        "d7": "wAWPn5hJcRA=;32",
        "d8": "/Y7QJpgsk1l2Q/GMVp3rK7Iyjd+LkkK0OKw=;33",
        "d9": "WpDmcd6VCaM=;34",
        "e1": "DMnbrkIvsUpZQg==;35",
        "e2": "6gB3q6FV5os=;36",
        "e3": "uK0YuBwIm5o=;37",
        "e4": "3OdOLky7Vxw=;38",
        "e5": "XS0y8azaonikmg==;39",
        "e6": "BMfLY988YGg=;40",
        "e7": "4OjAcWX3mfE=;41",
        "e8": "KfQ/RuRcCaI=;42",
        "e9": "lI1YNmdtakg=;43",
        "f1": "IZ8Gs3VjqnZFYw==;44",
        "f2": "FSuCn0cNyJo=;45",
        "f3": "BFQsOmH42uKLPw==;46",
        "f4": "vo99WxtAQjI=;47",
        "f5": "s6ylCyKP3KtNIA==;48",
        "f6": "tEhlgd3YnELU0A==;49",
        "f7": "pOG7dFQpUDbCCw==;50",
        "f8": "uzI2/qJBCPKDRQ==;51",
        "f9": "XYkRj2oGn+A=;52",
        "g1": "BtRkVmVJdbEbaQ==;53",
        "g2": "orLAPw86pwVH/w==;54",
        "g3": "BnVbNjQs+Og=;55",
        "g4": "SUN9L1xq1Z3wzA==;56",
        "g5": "neEbMD3T9hs=;57",
        "g6": "2Uf0N7Pbwzk=;58",
        "g7": "BVQunx7W8K4=;59",
        "g8": "WdbFRmLIY3Y=;60",
        "g9": "CzVVHUbTqxg=;61",
        "h1": "hobqnKfUGm2+9Q==;62",
        "h2": "jCaV/0jO7aHRUA==;63",
        "h3": "NPFijCp2ix/NEw==;64",
        "h4": "RmRroRG1lih/2A==;65",
        "h5": "uVBp9jHxtF0=;66",
        "h6": "WKwj7HlDS4BCuA==;67",
        "h7": "T9tGc0cF2OBGq/PBAG1c7kUjuwX39gtz6kbxncZqvnSZmM1L;68",
        "h8": "Kmj06j7S0caBCg==;69",
        "h9": "p9YPDmre2W1F3A==;70",
        "i1": "d93Kp8luthg=;71",
        "i2": "TV7yYVXDSHrjCA==;72",
        "i3": "q5vXxFIyv7oLGw==;73",
        "i4": "BEBroOlw3l1bLQ==;74",
        "i5": "dd3j8K21TRSnMQ==;75",
        "z1": "gFyzOxZgJ/IgimqzTAVDil8diThnTRIYXFvwkqbuDENovEzKPtUf06L/Nc3iLM8g4udy27xRR/Ag4zfbITBdhQ==;76",
        "z2": "h2tLQj5Wvx6hvcnrBUz6WpiYFTXqTq/f9eO2U4z2HzWH3Ptw3C8Z0ySPf2UakINNUuID2GXjqxe6bTK8iU16VQ==;77",
        "y2": "kyfgt/VKZVQTyw==;78",
        "y3": "73IEhX1ygY3J9w==;79",
        "y6": "RrXkLuhg3HH6Pw==;80",
        "y8": "xihP0KMk4b0M0A==;81",
        "x4": "n+l3VHhvNBx38w==;82",
        "z5": "H+nxEyJqZHE=;83",
        "z4": "SC3DrjxpAfc0Yw==;84",
        "z6": "Uqu6ldJHWVF4KeLy;85",
        "z7": "erx+AOeeFi2BP4gt;86",
        "z8": "FiP2lSLvNQQf7GK0uYU=;87",
        "z9": "OyKoDXwVgIc9hXkZ;88",
        "y1": "oGODN73lkJRVLh8s;89",
        "y4": "UxSiIZ85cqwxnQDqt7o=;90",
        "y5": "HICo493otjr09UDJs5o=;91",
        "y7": "zYDHLrB05sczEWqP;92",
        "y9": "mpObF3TJTP28b7WQ1mE=;93",
        "y10": "8eEesT4mg5Zz8PQw37Y=;94",
        "x1": "6bn7h04tKmhHOX2D;95",
        "x2": "uTp3QDjj6Y7P1F0ZMUw=;96",
        "x3": "dpRUer9vrhYoBfSF;97",
        "x5": "tBu1+ChehRsJ5SKd;98",
        "z3": "ZNHGnHoEtIOQZZ8IX9xwrHP3xdGTkvF2HxyLa7RjT2Q=;99",
        "v": "6.3.1",
        "pgrdt": function (_0x188612) {
            var _0x34e662 = [];
            _0x34e662[0] = 1868719733;
            _0x34e662[1] = 1935892852;
            _0x34e662[2] = 1696622450;
            _0x34e662[3] = 1701143585;
            _0x34e662[4] = 23896887;
            _0x34e662[5] = 1762589871;
            _0x34e662[6] = 3121846497;
            _0x34e662[7] = 3751349340;
            _0x34e662[8] = 2141223791;
            _0x34e662[9] = 2853414200;
            _0x34e662[10] = 2806448483;
            _0x34e662[11] = 2373688783;
            _0x34e662[12] = _0x39a516;
            _0x34e662[13] = 2165170484;
            _0x34e662[14] = 3402173825;
            _0x34e662[15] = 3571331399;

            for (var _0xfc6183 = 0; _0xfc6183 < 8; _0xfc6183++) {
                _0x34e662[0] += _0x34e662[4];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[0]) << 16 | (_0x34e662[12] ^ _0x34e662[0]) >>> 16) >>> 0;
                _0x34e662[8] += _0x34e662[12];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[8]) << 12 | (_0x34e662[4] ^ _0x34e662[8]) >>> 20) >>> 0;
                _0x34e662[0] += _0x34e662[4];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[0]) << 8 | (_0x34e662[12] ^ _0x34e662[0]) >>> 24) >>> 0;
                _0x34e662[8] += _0x34e662[12];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[8]) << 7 | (_0x34e662[4] ^ _0x34e662[8]) >>> 25) >>> 0;
                _0x34e662[0] >>>= 0;
                _0x34e662[4] >>>= 0;
                _0x34e662[8] >>>= 0;
                _0x34e662[12] >>>= 0;
                _0x34e662[1] += _0x34e662[5];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[1]) << 16 | (_0x34e662[13] ^ _0x34e662[1]) >>> 16) >>> 0;
                _0x34e662[9] += _0x34e662[13];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[9]) << 12 | (_0x34e662[5] ^ _0x34e662[9]) >>> 20) >>> 0;
                _0x34e662[1] += _0x34e662[5];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[1]) << 8 | (_0x34e662[13] ^ _0x34e662[1]) >>> 24) >>> 0;
                _0x34e662[9] += _0x34e662[13];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[9]) << 7 | (_0x34e662[5] ^ _0x34e662[9]) >>> 25) >>> 0;
                _0x34e662[1] >>>= 0;
                _0x34e662[5] >>>= 0;
                _0x34e662[9] >>>= 0;
                _0x34e662[13] >>>= 0;
                _0x34e662[2] += _0x34e662[6];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[2]) << 16 | (_0x34e662[14] ^ _0x34e662[2]) >>> 16) >>> 0;
                _0x34e662[10] += _0x34e662[14];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[10]) << 12 | (_0x34e662[6] ^ _0x34e662[10]) >>> 20) >>> 0;
                _0x34e662[2] += _0x34e662[6];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[2]) << 8 | (_0x34e662[14] ^ _0x34e662[2]) >>> 24) >>> 0;
                _0x34e662[10] += _0x34e662[14];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[10]) << 7 | (_0x34e662[6] ^ _0x34e662[10]) >>> 25) >>> 0;
                _0x34e662[2] >>>= 0;
                _0x34e662[6] >>>= 0;
                _0x34e662[10] >>>= 0;
                _0x34e662[14] >>>= 0;
                _0x34e662[3] += _0x34e662[7];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[3]) << 16 | (_0x34e662[15] ^ _0x34e662[3]) >>> 16) >>> 0;
                _0x34e662[11] += _0x34e662[15];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[11]) << 12 | (_0x34e662[7] ^ _0x34e662[11]) >>> 20) >>> 0;
                _0x34e662[3] += _0x34e662[7];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[3]) << 8 | (_0x34e662[15] ^ _0x34e662[3]) >>> 24) >>> 0;
                _0x34e662[11] += _0x34e662[15];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[11]) << 7 | (_0x34e662[7] ^ _0x34e662[11]) >>> 25) >>> 0;
                _0x34e662[3] >>>= 0;
                _0x34e662[7] >>>= 0;
                _0x34e662[11] >>>= 0;
                _0x34e662[15] >>>= 0;
                _0x34e662[0] += _0x34e662[5];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[0]) << 16 | (_0x34e662[15] ^ _0x34e662[0]) >>> 16) >>> 0;
                _0x34e662[10] += _0x34e662[15];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[10]) << 12 | (_0x34e662[5] ^ _0x34e662[10]) >>> 20) >>> 0;
                _0x34e662[0] += _0x34e662[5];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[0]) << 8 | (_0x34e662[15] ^ _0x34e662[0]) >>> 24) >>> 0;
                _0x34e662[10] += _0x34e662[15];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[10]) << 7 | (_0x34e662[5] ^ _0x34e662[10]) >>> 25) >>> 0;
                _0x34e662[0] >>>= 0;
                _0x34e662[5] >>>= 0;
                _0x34e662[10] >>>= 0;
                _0x34e662[15] >>>= 0;
                _0x34e662[1] += _0x34e662[6];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[1]) << 16 | (_0x34e662[12] ^ _0x34e662[1]) >>> 16) >>> 0;
                _0x34e662[11] += _0x34e662[12];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[11]) << 12 | (_0x34e662[6] ^ _0x34e662[11]) >>> 20) >>> 0;
                _0x34e662[1] += _0x34e662[6];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[1]) << 8 | (_0x34e662[12] ^ _0x34e662[1]) >>> 24) >>> 0;
                _0x34e662[11] += _0x34e662[12];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[11]) << 7 | (_0x34e662[6] ^ _0x34e662[11]) >>> 25) >>> 0;
                _0x34e662[1] >>>= 0;
                _0x34e662[6] >>>= 0;
                _0x34e662[11] >>>= 0;
                _0x34e662[12] >>>= 0;
                _0x34e662[2] += _0x34e662[7];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[2]) << 16 | (_0x34e662[13] ^ _0x34e662[2]) >>> 16) >>> 0;
                _0x34e662[8] += _0x34e662[13];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[8]) << 12 | (_0x34e662[7] ^ _0x34e662[8]) >>> 20) >>> 0;
                _0x34e662[2] += _0x34e662[7];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[2]) << 8 | (_0x34e662[13] ^ _0x34e662[2]) >>> 24) >>> 0;
                _0x34e662[8] += _0x34e662[13];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[8]) << 7 | (_0x34e662[7] ^ _0x34e662[8]) >>> 25) >>> 0;
                _0x34e662[2] >>>= 0;
                _0x34e662[7] >>>= 0;
                _0x34e662[8] >>>= 0;
                _0x34e662[13] >>>= 0;
                _0x34e662[3] += _0x34e662[4];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[3]) << 16 | (_0x34e662[14] ^ _0x34e662[3]) >>> 16) >>> 0;
                _0x34e662[9] += _0x34e662[14];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[9]) << 12 | (_0x34e662[4] ^ _0x34e662[9]) >>> 20) >>> 0;
                _0x34e662[3] += _0x34e662[4];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[3]) << 8 | (_0x34e662[14] ^ _0x34e662[3]) >>> 24) >>> 0;
                _0x34e662[9] += _0x34e662[14];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[9]) << 7 | (_0x34e662[4] ^ _0x34e662[9]) >>> 25) >>> 0;
                _0x34e662[3] >>>= 0;
                _0x34e662[4] >>>= 0;
                _0x34e662[9] >>>= 0;
                _0x34e662[14] >>>= 0;
            }

            for (var _0xfc6183 = 0; _0xfc6183 < 6; ++_0xfc6183) {
                _0x34e662[0] += _0x34e662[4];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[0]) << 16 | (_0x34e662[12] ^ _0x34e662[0]) >>> 16) >>> 0;
                _0x34e662[8] += _0x34e662[12];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[8]) << 12 | (_0x34e662[4] ^ _0x34e662[8]) >>> 20) >>> 0;
                _0x34e662[0] += _0x34e662[4];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[0]) << 8 | (_0x34e662[12] ^ _0x34e662[0]) >>> 24) >>> 0;
                _0x34e662[8] += _0x34e662[12];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[8]) << 7 | (_0x34e662[4] ^ _0x34e662[8]) >>> 25) >>> 0;
                _0x34e662[0] >>>= 0;
                _0x34e662[4] >>>= 0;
                _0x34e662[8] >>>= 0;
                _0x34e662[12] >>>= 0;
                _0x34e662[1] += _0x34e662[5];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[1]) << 16 | (_0x34e662[13] ^ _0x34e662[1]) >>> 16) >>> 0;
                _0x34e662[9] += _0x34e662[13];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[9]) << 12 | (_0x34e662[5] ^ _0x34e662[9]) >>> 20) >>> 0;
                _0x34e662[1] += _0x34e662[5];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[1]) << 8 | (_0x34e662[13] ^ _0x34e662[1]) >>> 24) >>> 0;
                _0x34e662[9] += _0x34e662[13];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[9]) << 7 | (_0x34e662[5] ^ _0x34e662[9]) >>> 25) >>> 0;
                _0x34e662[1] >>>= 0;
                _0x34e662[5] >>>= 0;
                _0x34e662[9] >>>= 0;
                _0x34e662[13] >>>= 0;
                _0x34e662[2] += _0x34e662[6];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[2]) << 16 | (_0x34e662[14] ^ _0x34e662[2]) >>> 16) >>> 0;
                _0x34e662[10] += _0x34e662[14];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[10]) << 12 | (_0x34e662[6] ^ _0x34e662[10]) >>> 20) >>> 0;
                _0x34e662[2] += _0x34e662[6];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[2]) << 8 | (_0x34e662[14] ^ _0x34e662[2]) >>> 24) >>> 0;
                _0x34e662[10] += _0x34e662[14];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[10]) << 7 | (_0x34e662[6] ^ _0x34e662[10]) >>> 25) >>> 0;
                _0x34e662[2] >>>= 0;
                _0x34e662[6] >>>= 0;
                _0x34e662[10] >>>= 0;
                _0x34e662[14] >>>= 0;
                _0x34e662[3] += _0x34e662[7];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[3]) << 16 | (_0x34e662[15] ^ _0x34e662[3]) >>> 16) >>> 0;
                _0x34e662[11] += _0x34e662[15];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[11]) << 12 | (_0x34e662[7] ^ _0x34e662[11]) >>> 20) >>> 0;
                _0x34e662[3] += _0x34e662[7];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[3]) << 8 | (_0x34e662[15] ^ _0x34e662[3]) >>> 24) >>> 0;
                _0x34e662[11] += _0x34e662[15];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[11]) << 7 | (_0x34e662[7] ^ _0x34e662[11]) >>> 25) >>> 0;
                _0x34e662[3] >>>= 0;
                _0x34e662[7] >>>= 0;
                _0x34e662[11] >>>= 0;
                _0x34e662[15] >>>= 0;
                _0x34e662[0] += _0x34e662[5];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[0]) << 16 | (_0x34e662[15] ^ _0x34e662[0]) >>> 16) >>> 0;
                _0x34e662[10] += _0x34e662[15];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[10]) << 12 | (_0x34e662[5] ^ _0x34e662[10]) >>> 20) >>> 0;
                _0x34e662[0] += _0x34e662[5];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[0]) << 8 | (_0x34e662[15] ^ _0x34e662[0]) >>> 24) >>> 0;
                _0x34e662[10] += _0x34e662[15];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[10]) << 7 | (_0x34e662[5] ^ _0x34e662[10]) >>> 25) >>> 0;
                _0x34e662[0] >>>= 0;
                _0x34e662[5] >>>= 0;
                _0x34e662[10] >>>= 0;
                _0x34e662[15] >>>= 0;
                _0x34e662[1] += _0x34e662[6];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[1]) << 16 | (_0x34e662[12] ^ _0x34e662[1]) >>> 16) >>> 0;
                _0x34e662[11] += _0x34e662[12];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[11]) << 12 | (_0x34e662[6] ^ _0x34e662[11]) >>> 20) >>> 0;
                _0x34e662[1] += _0x34e662[6];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[1]) << 8 | (_0x34e662[12] ^ _0x34e662[1]) >>> 24) >>> 0;
                _0x34e662[11] += _0x34e662[12];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[11]) << 7 | (_0x34e662[6] ^ _0x34e662[11]) >>> 25) >>> 0;
                _0x34e662[1] >>>= 0;
                _0x34e662[6] >>>= 0;
                _0x34e662[11] >>>= 0;
                _0x34e662[12] >>>= 0;
                _0x34e662[2] += _0x34e662[7];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[2]) << 16 | (_0x34e662[13] ^ _0x34e662[2]) >>> 16) >>> 0;
                _0x34e662[8] += _0x34e662[13];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[8]) << 12 | (_0x34e662[7] ^ _0x34e662[8]) >>> 20) >>> 0;
                _0x34e662[2] += _0x34e662[7];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[2]) << 8 | (_0x34e662[13] ^ _0x34e662[2]) >>> 24) >>> 0;
                _0x34e662[8] += _0x34e662[13];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[8]) << 7 | (_0x34e662[7] ^ _0x34e662[8]) >>> 25) >>> 0;
                _0x34e662[2] >>>= 0;
                _0x34e662[7] >>>= 0;
                _0x34e662[8] >>>= 0;
                _0x34e662[13] >>>= 0;
                _0x34e662[3] += _0x34e662[4];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[3]) << 16 | (_0x34e662[14] ^ _0x34e662[3]) >>> 16) >>> 0;
                _0x34e662[9] += _0x34e662[14];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[9]) << 12 | (_0x34e662[4] ^ _0x34e662[9]) >>> 20) >>> 0;
                _0x34e662[3] += _0x34e662[4];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[3]) << 8 | (_0x34e662[14] ^ _0x34e662[3]) >>> 24) >>> 0;
                _0x34e662[9] += _0x34e662[14];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[9]) << 7 | (_0x34e662[4] ^ _0x34e662[9]) >>> 25) >>> 0;
                _0x34e662[3] >>>= 0;
                _0x34e662[4] >>>= 0;
                _0x34e662[9] >>>= 0;
                _0x34e662[14] >>>= 0;
            }

            for (var _0xfc6183 = 0; _0xfc6183 < 3; ++_0xfc6183) {
                _0x34e662[0] += _0x34e662[4];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[0]) << 16 | (_0x34e662[12] ^ _0x34e662[0]) >>> 16) >>> 0;
                _0x34e662[8] += _0x34e662[12];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[8]) << 12 | (_0x34e662[4] ^ _0x34e662[8]) >>> 20) >>> 0;
                _0x34e662[0] += _0x34e662[4];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[0]) << 8 | (_0x34e662[12] ^ _0x34e662[0]) >>> 24) >>> 0;
                _0x34e662[8] += _0x34e662[12];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[8]) << 7 | (_0x34e662[4] ^ _0x34e662[8]) >>> 25) >>> 0;
                _0x34e662[0] >>>= 0;
                _0x34e662[4] >>>= 0;
                _0x34e662[8] >>>= 0;
                _0x34e662[12] >>>= 0;
                _0x34e662[1] += _0x34e662[5];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[1]) << 16 | (_0x34e662[13] ^ _0x34e662[1]) >>> 16) >>> 0;
                _0x34e662[9] += _0x34e662[13];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[9]) << 12 | (_0x34e662[5] ^ _0x34e662[9]) >>> 20) >>> 0;
                _0x34e662[1] += _0x34e662[5];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[1]) << 8 | (_0x34e662[13] ^ _0x34e662[1]) >>> 24) >>> 0;
                _0x34e662[9] += _0x34e662[13];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[9]) << 7 | (_0x34e662[5] ^ _0x34e662[9]) >>> 25) >>> 0;
                _0x34e662[1] >>>= 0;
                _0x34e662[5] >>>= 0;
                _0x34e662[9] >>>= 0;
                _0x34e662[13] >>>= 0;
                _0x34e662[2] += _0x34e662[6];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[2]) << 16 | (_0x34e662[14] ^ _0x34e662[2]) >>> 16) >>> 0;
                _0x34e662[10] += _0x34e662[14];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[10]) << 12 | (_0x34e662[6] ^ _0x34e662[10]) >>> 20) >>> 0;
                _0x34e662[2] += _0x34e662[6];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[2]) << 8 | (_0x34e662[14] ^ _0x34e662[2]) >>> 24) >>> 0;
                _0x34e662[10] += _0x34e662[14];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[10]) << 7 | (_0x34e662[6] ^ _0x34e662[10]) >>> 25) >>> 0;
                _0x34e662[2] >>>= 0;
                _0x34e662[6] >>>= 0;
                _0x34e662[10] >>>= 0;
                _0x34e662[14] >>>= 0;
                _0x34e662[3] += _0x34e662[7];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[3]) << 16 | (_0x34e662[15] ^ _0x34e662[3]) >>> 16) >>> 0;
                _0x34e662[11] += _0x34e662[15];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[11]) << 12 | (_0x34e662[7] ^ _0x34e662[11]) >>> 20) >>> 0;
                _0x34e662[3] += _0x34e662[7];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[3]) << 8 | (_0x34e662[15] ^ _0x34e662[3]) >>> 24) >>> 0;
                _0x34e662[11] += _0x34e662[15];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[11]) << 7 | (_0x34e662[7] ^ _0x34e662[11]) >>> 25) >>> 0;
                _0x34e662[3] >>>= 0;
                _0x34e662[7] >>>= 0;
                _0x34e662[11] >>>= 0;
                _0x34e662[15] >>>= 0;
                _0x34e662[0] += _0x34e662[5];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[0]) << 16 | (_0x34e662[15] ^ _0x34e662[0]) >>> 16) >>> 0;
                _0x34e662[10] += _0x34e662[15];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[10]) << 12 | (_0x34e662[5] ^ _0x34e662[10]) >>> 20) >>> 0;
                _0x34e662[0] += _0x34e662[5];
                _0x34e662[15] = ((_0x34e662[15] ^ _0x34e662[0]) << 8 | (_0x34e662[15] ^ _0x34e662[0]) >>> 24) >>> 0;
                _0x34e662[10] += _0x34e662[15];
                _0x34e662[5] = ((_0x34e662[5] ^ _0x34e662[10]) << 7 | (_0x34e662[5] ^ _0x34e662[10]) >>> 25) >>> 0;
                _0x34e662[0] >>>= 0;
                _0x34e662[5] >>>= 0;
                _0x34e662[10] >>>= 0;
                _0x34e662[15] >>>= 0;
                _0x34e662[1] += _0x34e662[6];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[1]) << 16 | (_0x34e662[12] ^ _0x34e662[1]) >>> 16) >>> 0;
                _0x34e662[11] += _0x34e662[12];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[11]) << 12 | (_0x34e662[6] ^ _0x34e662[11]) >>> 20) >>> 0;
                _0x34e662[1] += _0x34e662[6];
                _0x34e662[12] = ((_0x34e662[12] ^ _0x34e662[1]) << 8 | (_0x34e662[12] ^ _0x34e662[1]) >>> 24) >>> 0;
                _0x34e662[11] += _0x34e662[12];
                _0x34e662[6] = ((_0x34e662[6] ^ _0x34e662[11]) << 7 | (_0x34e662[6] ^ _0x34e662[11]) >>> 25) >>> 0;
                _0x34e662[1] >>>= 0;
                _0x34e662[6] >>>= 0;
                _0x34e662[11] >>>= 0;
                _0x34e662[12] >>>= 0;
                _0x34e662[2] += _0x34e662[7];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[2]) << 16 | (_0x34e662[13] ^ _0x34e662[2]) >>> 16) >>> 0;
                _0x34e662[8] += _0x34e662[13];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[8]) << 12 | (_0x34e662[7] ^ _0x34e662[8]) >>> 20) >>> 0;
                _0x34e662[2] += _0x34e662[7];
                _0x34e662[13] = ((_0x34e662[13] ^ _0x34e662[2]) << 8 | (_0x34e662[13] ^ _0x34e662[2]) >>> 24) >>> 0;
                _0x34e662[8] += _0x34e662[13];
                _0x34e662[7] = ((_0x34e662[7] ^ _0x34e662[8]) << 7 | (_0x34e662[7] ^ _0x34e662[8]) >>> 25) >>> 0;
                _0x34e662[2] >>>= 0;
                _0x34e662[7] >>>= 0;
                _0x34e662[8] >>>= 0;
                _0x34e662[13] >>>= 0;
                _0x34e662[3] += _0x34e662[4];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[3]) << 16 | (_0x34e662[14] ^ _0x34e662[3]) >>> 16) >>> 0;
                _0x34e662[9] += _0x34e662[14];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[9]) << 12 | (_0x34e662[4] ^ _0x34e662[9]) >>> 20) >>> 0;
                _0x34e662[3] += _0x34e662[4];
                _0x34e662[14] = ((_0x34e662[14] ^ _0x34e662[3]) << 8 | (_0x34e662[14] ^ _0x34e662[3]) >>> 24) >>> 0;
                _0x34e662[9] += _0x34e662[14];
                _0x34e662[4] = ((_0x34e662[4] ^ _0x34e662[9]) << 7 | (_0x34e662[4] ^ _0x34e662[9]) >>> 25) >>> 0;
                _0x34e662[3] >>>= 0;
                _0x34e662[4] >>>= 0;
                _0x34e662[9] >>>= 0;
                _0x34e662[14] >>>= 0;
            }

            _0x34e662[0] += 1868719733;
            _0x34e662[1] += 1935892852;
            _0x34e662[2] += 1696622450;
            _0x34e662[3] += 1701143585;
            _0x34e662[4] += 23896887;
            _0x34e662[5] += 1762589871;
            _0x34e662[6] += 3121846497;
            _0x34e662[7] += 3751349340;
            _0x34e662[8] += 2141223791;
            _0x34e662[9] += 2853414200;
            _0x34e662[10] += 2806448483;
            _0x34e662[11] += 2373688783;
            _0x34e662[12] += _0x39a516;
            _0x34e662[13] += 2165170484;
            _0x34e662[14] += 3402173825;
            _0x34e662[15] += 3571331399;
            _0x188612 = _0x188612 == null ? "null" : _0x188612['toString']();
            var _0xc385ff = [];

            for (var _0xfc6183 = 0; _0xfc6183 < _0x188612["length"]; ++_0xfc6183) {
                var _0x5d6551 = _0x34e662[Math['floor'](_0xfc6183 / 2) % _0x34e662["length"]] >>> 16 * (_0xfc6183 % 2) & 65535;

                _0xc385ff["push"](String["fromCharCode"](_0x188612["charCodeAt"](_0xfc6183) & 255 ^ _0x5d6551 & 255));

                _0xc385ff["push"](String["fromCharCode"](_0x188612["charCodeAt"](_0xfc6183) >>> 8 ^ _0x5d6551 >>> 8));
            }

            var _0x1c42e9 = btoa(_0xc385ff["join"]('')) + ';' + _0x39a516["toString"]();

            ++_0x39a516;
            return _0x1c42e9;
        }(Math["floor"](new Date()["getTime"]() / 1000)),
        // "pgrdt": "hU9TktoBNyzGo4rPnviv+CeEGDI=;100",
        "pgrd": "Awsg1vBpK/icApDoCet1h0djHXQo+0CYBFBf9kpCCmHhe1ykjF/7LDiLiUwC3Uf1Jq0lGCx9ouVV4HeOmKE3FkRcWq5aOU79S4Rklf862UAxequux0noHobYJxuyA6eOcbSyGYvK/zcC++Wei1ZDWoszybr8CSeHioOgGVl4ym01O/bLIxumbHLCyN+Q/78sgBumYaM+0PZoMkxHBWt9o7WSVu0="
    }
    var _0x47e7b5 = {
        "a1": "j3y2jW8fZI00OA==;0",
        "a2": "IMF0OVDyp8fO0Al4ZyLZm+qW5sjITw==;1",
        "a3": "43HgGWBipTHAVNjlwCIeSg==;2",
        "a4": "O+wuDSFmsicjwQ==;3",
        "a5": "MKYwhkOSvNq5Sg==;4",
        "a6": "9Mw=;5",
        "a7": "qn+S1WNMijZYbQ==;6",
        "a8": "8Bl6/wue/1+vSg==;7",
        "a9": "wBQNnCCGmt/f1w==;8",
        "b1": "oWLRk2BLYtc=;9",
        "b2": "P5nWxZjfHdDxaQ==;10",
        "b3": "YAvL7OdrArYWHg==;11",
        "b4": "P+7iaAB2xFA=;12",
        "b5": "VXEhSICQM6AAVA==;13",
        "b6": "P+erCaKVGJ45sA==;14",
        "b7": "l1jWZw1PcnR8AQ==;15",
        "b8": "Bt3DCdY9rjrMqQ==;16",
        "b9": "wO4VfZW50P7qvQ==;17",
        "c1": "yTvxgA==;18",
        "c2": "5vfaqhYdNs4pq5zqWdPuXA==;19",
        "c3": "EcE0dLX6EnwYMYYF5p6Vqw==;20",
        "c4": "5kOEJYJ6EPI=;21",
        "c5": "/8xmoD2BQ8w=;22",
        "c6": "pA0Grw==;23",
        "c7": "J7djg92YmrE=;24",
        "c8": "4SQ=;25",
        "c9": "k76NM4mOO8Q=;26",
        "d1": "wVlABUeTgTo=;27",
        "d2": "cj1XhA==;28",
        "d3": "nNeel1zFWbtEyg==;29",
        "d4": "NZyB5B8rIo4=;30",
        "d5": "l2QphFipkYSe9Q==;31",
        "d7": "yjQcMWGX1Sk=;32",
        "d8": "SfbbyFxz4gYlzoLQGpP52fYX7alrHPgybQc=;33",
        "d9": "qKvZjSEE47E=;34",
        "e1": "r1FMjd5fv4BgYQ==;35",
        "e2": "dNXmerIHcjk=;36",
        "e3": "dpW+39Z43qk=;37",
        "e4": "XQEDDdDC1Y8=;38",
        "e5": "j2tTX2ozvHmpcw==;39",
        "e6": "TlSV6UZdswg=;40",
        "e7": "jSiDSOGKR1M=;41",
        "e8": "+SPbk6EGbA8=;42",
        "e9": "QZjiJ4QAp6w=;43",
        "f1": "y4kE5f6iGigMuA==;44",
        "f2": "IklZ0UlndPk=;45",
        "f3": "GtmKGJwQrm6nFg==;46",
        "f4": "B+sXYzd86y4=;47",
        "f5": "rRzA7z5Qev5KTg==;48",
        "f6": "O445dRToVxfYGQ==;49",
        "f7": "Q7C6SiztELqBTg==;50",
        "f8": "842dNA+zppXsuw==;51",
        "f9": "UUnxw0JNPuA=;52",
        "g1": "ozFC4g8vvt8Uig==;53",
        "g2": "hvuxG1gsjSqKlA==;54",
        "g3": "DxH3glqdyXA=;55",
        "g4": "iSMPBtK1vUTjWA==;56",
        "g5": "9I0JyL6JuQ0=;57",
        "g6": "VapXXL2hkZE=;58",
        "g7": "LSBv+DojUic=;59",
        "g8": "/iwO9euNOHU=;60",
        "g9": "IBuv7sUVmXs=;61",
        "h1": "E7EzcLMqfv48Zg==;62",
        "h2": "LEVG3obAicb2vg==;63",
        "h3": "qsgukFv6Z5RQRA==;64",
        "h4": "4Vex+ARoqlwPbw==;65",
        "h5": "lRbycdtF6UY=;66",
        "h6": "ouRjA8rcahWF6Q==;67",
        "h7": "oW92hdKUx/Vyxp34OQTZhIO2N+e0AKYZsot+47CEOuqiS5NO;68",
        "h8": "4oppgOhNNRJncw==;69",
        "h9": "9eYbzjpcKljXZg==;70",
        "i1": "6fg9EFcnNn4=;71",
        "i2": "IPoW/fXmkembjA==;72",
        "i3": "TljkQvPn/FjYew==;73",
        "i4": "LtrgVFaD9dfJcQ==;74",
        "i5": "b6aRyqdVaQHdcA==;75",
        "z1": "d+6I6CzyI0dySc1gKWGOCZNvjBS4whxmVw3vvhfJAa3CCSXhjftcnwRq+ErbKCwhsrLA2kCRfIswXEXH/4tjHA==;76",
        "z2": "dKN3hs6FAqWKy1q85uWYUsZQsFzodTtZ22Cb1Xa85yQP4Df+hyvjCh0odXnEI5b1fj68imGJJCOs05+RitFlxw==;77",
        "y2": "PIRpC7nAiFzqVQ==;78",
        "y3": "YmM7jBrD1gdqFQ==;79",
        "y6": "tWFojUK7GajCMQ==;80",
        "y8": "lmB0ujszK2H+VQ==;81",
        "x4": "4fiQSsh7ydkg4w==;82",
        "z5": "2t3yXLWTtwU=;83",
        "z4": "TgQ6XYjhAQfi0A==;84",
        "z6": "tyirUI4Z6S/AmIIx;85",
        "z7": "9YoeBo/vgUPPhbs/;86",
        "z8": "FT95kGoF64cTflbcP4c=;87",
        "z9": "Jw3SMYMx4neHiaV8;88",
        "y1": "c1JcxpdFNzJ6IYpM;89",
        "y4": "J/ez1KSaRWj3djLSwvc=;90",
        "y5": "O5UqS3CsE4nHzEhIS3U=;91",
        "y7": "rkJUWmpT44af5Ta8;92",
        "y9": "gOHOIALyqORWc9ScWoo=;93",
        "y10": "HhxZ8mDu+NsjdhffR2g=;94",
        "x1": "/8b+st4e+4DVJZ3a;95",
        "x2": "0YcrGyvyK8BWEwUqTTk=;96",
        "x3": "qyGFS1nVto66H45H;97",
        "x5": "Nt9Lg6NVgFmsv6SO;98",
        "z3": "R238+ZLOX6/4g+ydqN++oh1uvzRamwHOH4MyGcCRWKI=;99",
        "v": "6.3.1",
        "pgrdt": "UHSJuJ5q3bLbauaT7nvr2jZT5vw=;100",
        "pgrd": "kH946c3IfH/usmdsuJ3a8IaMbWCYpT4V1B20Wr3p8wlNfhqZc90Ck3dYHPyk1KS6ZIAatp0dMUsRQu5HO82D2K9zviliUHU3yG7BAh6Kr7QbBlyqFMVVBqNZ/h+pmfHVPG5RX0qlv8MGyHt1uR7PRn8zMYBUAk6El3ik2puN1juqC78d6EFPJGDGjmM0DtEjwY3/Kr8OlolHCq5YHsuvvEyo1U4="
    }

    var e = simon({
        "id": Date.now() + "-" + powPrefix,
        "prefix": powPrefix,
        "complexity": powComplexity
    })
    var pdata = btoa(JSON.stringify({
        powNonce: e.nonce,
        powCalcTime: e.calctime,
        powPrefix: powPrefix
    }))
    var result = {
        "pointerPositions": [
            [
                Math.floor(Math.random() * (5400 - 5000 + 1)) + 5000,
                267,
                23
            ],
            [
                Math.floor(Math.random() * (5900 - 5500 + 1)) + 5500,
                122,
                238
            ],
            [
                Math.floor(Math.random() * (6400 - 6000 + 1)) + 6000,
                32,
                320
            ],
            [
                Math.floor(Math.random() * (6800 - 6500 + 1)) + 6500,
                34,
                320
            ],
            [
                Math.floor(Math.random() * (7200 - 6900 + 1)) + 6900,
                428,
                228
            ]
        ],
        "clickPositions": [
            // [
            //     Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000,
            //     32,
            //     320
            // ]
        ],
        "keyboard": {
            "total": 0,
            "copy": 0,
            "paste": 0
        }
    }
    var tdata = btoa(JSON.stringify(result))
    return {rdata: _0x47e7b5, pdata: pdata, tdata: tdata}
}


// data = get_params("743D313730313133363735393B703D343633626462652D39336162663532392D396232343136372D64626230666162373B633D31353B643D43304235443436353645423841354641383438394434303230303546383837323B", "20")
// console.log(data)
