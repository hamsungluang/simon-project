window = global;
self = window;
exports = undefined;
navigator = {
    language: 'zh-CN',
    languages: ['zh-CN'],
    vendor: 'Google Inc.',
    productSub: '20030107',
    product: 'Gecko',
    plugins: ['Plugin', 'Plugin', 'Plugin', 'Plugin', 'Plugin'],
    webdriver: false,
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
    webkitPersistentStorage: {},
    webkitTemporaryStorage: {},
    deviceMemory: 8,
    hardwareConcurrency: 16,
    onLine: true,
    vibrate: function () {
    },
    getBattery: function () {
    },
    setAppBadge: function () {
    },
    clearAppBadge: function () {
    },
    permissions: {
        query: function (arg1) {
            console.log(arg1)
            if (arg1['name'] == "sensors") {
                return new Promise((resolve, reject) => {
                    resolve({name: "sensors", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "geolocation") {
                return new Promise((resolve, reject) => {
                    resolve({name: "geolocation", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "notifications") {
                return new Promise((resolve, reject) => {
                    resolve({name: "notifications", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "midi") {
                return new Promise((resolve, reject) => {
                    resolve({name: "midi", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "camera") {
                return new Promise((resolve, reject) => {
                    resolve({name: "video_capture", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "microphone") {
                return new Promise((resolve, reject) => {
                    resolve({name: "audio_capture", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "background_fetch") {
                return new Promise((resolve, reject) => {
                    resolve({name: "background_fetch", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "background_sync") {
                return new Promise((resolve, reject) => {
                    resolve({name: "background_sync", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "persistent-storage") {
                return new Promise((resolve, reject) => {
                    resolve({name: "durable_storage", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "clipboard_read") {
                return new Promise((resolve, reject) => {
                    resolve({name: "clipboard_read", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "clipboard_write") {
                return new Promise((resolve, reject) => {
                    resolve({name: "clipboard_write", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "display_capture") {
                return new Promise((resolve, reject) => {
                    resolve({name: "display_capture", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "push") {
                return new Promise((resolve, reject) => {
                    resolve({name: "notifications", onchange: null, state: "prompt"})
                })
            }
            if (arg1['name'] == "speaker-selection") {
                return new Promise((resolve, reject) => {
                    throw new TypeError("Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'speaker-selection' is not a valid enum value of type PermissionName.")
                })
            }
            if (arg1['name'] == "device-info") {
                return new Promise((resolve, reject) => {
                    throw new TypeError("Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'speaker-selection' is not a valid enum value of type PermissionName.")
                })
            }
            if (arg1['name'] == "bluetooth") {
                return new Promise((resolve, reject) => {
                    throw new TypeError("Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'speaker-selection' is not a valid enum value of type PermissionName.")
                })
            }
            if (arg1['name'] == "ambient-light-sensor") {
                return new Promise((resolve, reject) => {
                    throw new TypeError("Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'speaker-selection' is not a valid enum value of type PermissionName.")
                })
            }
            if (arg1['name'] == "gyroscope") {
                return new Promise((resolve, reject) => {
                    resolve({name: "sensors", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "magnetometer") {
                return new Promise((resolve, reject) => {
                    resolve({name: "sensors", onchange: null, state: "granted"})
                })
            }
            if (arg1['name'] == "nfc") {
                return new Promise((resolve, reject) => {
                    throw new TypeError("Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'speaker-selection' is not a valid enum value of type PermissionName.")
                })
            }

    },
    requestMediaKeySystemAccess: function (arg1, arg2) {
        return new Promise((resolve, reject) => {
            resolve({keySystem: "com.widevine.alpha"})
        })
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
}};
window.navigator = navigator
document = {
    createElement: function (arg) {
        if (arg === 'div') {
            return {
                parentNode: {
                    removeChild: function () {

                    },
                },
                appendChild: function (arg) {
                    return arg
                }
            }
        }
        if (arg === 'iframe') {
            return {
                contentWindow: window,
                remove: function () {
                },
                setAttribute: function (arg1, arg2) {
                },
                style: {},
            }
        }
        if (arg === 'span') {
            return {
                style: {
                    "accentColor": "",
                    "additiveSymbols": "",
                    "alignContent": "",
                    "alignItems": "",
                    "alignSelf": "",
                    "alignmentBaseline": "",
                    "all": "",
                    "animation": "",
                    "animationComposition": "",
                    "animationDelay": "",
                    "animationDirection": "",
                    "animationDuration": "",
                    "animationFillMode": "",
                    "animationIterationCount": "",
                    "animationName": "",
                    "animationPlayState": "",
                    "animationRange": "",
                    "animationRangeEnd": "",
                    "animationRangeStart": "",
                    "animationTimeline": "",
                    "animationTimingFunction": "",
                    "appRegion": "",
                    "appearance": "",
                    "ascentOverride": "",
                    "aspectRatio": "",
                    "backdropFilter": "",
                    "backfaceVisibility": "",
                    "background": "",
                    "backgroundAttachment": "",
                    "backgroundBlendMode": "",
                    "backgroundClip": "",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "backgroundOrigin": "",
                    "backgroundPosition": "",
                    "backgroundPositionX": "",
                    "backgroundPositionY": "",
                    "backgroundRepeat": "",
                    "backgroundRepeatX": "",
                    "backgroundRepeatY": "",
                    "backgroundSize": "",
                    "basePalette": "",
                    "baselineShift": "",
                    "baselineSource": "",
                    "blockSize": "",
                    "border": "",
                    "borderBlock": "",
                    "borderBlockColor": "",
                    "borderBlockEnd": "",
                    "borderBlockEndColor": "",
                    "borderBlockEndStyle": "",
                    "borderBlockEndWidth": "",
                    "borderBlockStart": "",
                    "borderBlockStartColor": "",
                    "borderBlockStartStyle": "",
                    "borderBlockStartWidth": "",
                    "borderBlockStyle": "",
                    "borderBlockWidth": "",
                    "borderBottom": "",
                    "borderBottomColor": "",
                    "borderBottomLeftRadius": "",
                    "borderBottomRightRadius": "",
                    "borderBottomStyle": "",
                    "borderBottomWidth": "",
                    "borderCollapse": "",
                    "borderColor": "",
                    "borderEndEndRadius": "",
                    "borderEndStartRadius": "",
                    "borderImage": "",
                    "borderImageOutset": "",
                    "borderImageRepeat": "",
                    "borderImageSlice": "",
                    "borderImageSource": "",
                    "borderImageWidth": "",
                    "borderInline": "",
                    "borderInlineColor": "",
                    "borderInlineEnd": "",
                    "borderInlineEndColor": "",
                    "borderInlineEndStyle": "",
                    "borderInlineEndWidth": "",
                    "borderInlineStart": "",
                    "borderInlineStartColor": "",
                    "borderInlineStartStyle": "",
                    "borderInlineStartWidth": "",
                    "borderInlineStyle": "",
                    "borderInlineWidth": "",
                    "borderLeft": "",
                    "borderLeftColor": "",
                    "borderLeftStyle": "",
                    "borderLeftWidth": "",
                    "borderRadius": "",
                    "borderRight": "",
                    "borderRightColor": "",
                    "borderRightStyle": "",
                    "borderRightWidth": "",
                    "borderSpacing": "",
                    "borderStartEndRadius": "",
                    "borderStartStartRadius": "",
                    "borderStyle": "",
                    "borderTop": "",
                    "borderTopColor": "",
                    "borderTopLeftRadius": "",
                    "borderTopRightRadius": "",
                    "borderTopStyle": "",
                    "borderTopWidth": "",
                    "borderWidth": "",
                    "bottom": "",
                    "boxShadow": "",
                    "boxSizing": "",
                    "breakAfter": "",
                    "breakBefore": "",
                    "breakInside": "",
                    "bufferedRendering": "",
                    "captionSide": "",
                    "caretColor": "",
                    "clear": "",
                    "clip": "",
                    "clipPath": "",
                    "clipRule": "",
                    "color": "",
                    "colorInterpolation": "",
                    "colorInterpolationFilters": "",
                    "colorRendering": "",
                    "colorScheme": "",
                    "columnCount": "",
                    "columnFill": "",
                    "columnGap": "",
                    "columnRule": "",
                    "columnRuleColor": "",
                    "columnRuleStyle": "",
                    "columnRuleWidth": "",
                    "columnSpan": "",
                    "columnWidth": "",
                    "columns": "",
                    "contain": "",
                    "containIntrinsicBlockSize": "",
                    "containIntrinsicHeight": "",
                    "containIntrinsicInlineSize": "",
                    "containIntrinsicSize": "",
                    "containIntrinsicWidth": "",
                    "container": "",
                    "containerName": "",
                    "containerType": "",
                    "content": "",
                    "contentVisibility": "",
                    "counterIncrement": "",
                    "counterReset": "",
                    "counterSet": "",
                    "cursor": "",
                    "cx": "",
                    "cy": "",
                    "d": "",
                    "descentOverride": "",
                    "direction": "",
                    "display": "",
                    "dominantBaseline": "",
                    "emptyCells": "",
                    "fallback": "",
                    "fill": "",
                    "fillOpacity": "",
                    "fillRule": "",
                    "filter": "",
                    "flex": "",
                    "flexBasis": "",
                    "flexDirection": "",
                    "flexFlow": "",
                    "flexGrow": "",
                    "flexShrink": "",
                    "flexWrap": "",
                    "float": "",
                    "floodColor": "",
                    "floodOpacity": "",
                    "font": "",
                    "fontDisplay": "",
                    "fontFamily": "",
                    "fontFeatureSettings": "",
                    "fontKerning": "",
                    "fontOpticalSizing": "",
                    "fontPalette": "",
                    "fontSize": "",
                    "fontStretch": "",
                    "fontStyle": "",
                    "fontSynthesis": "",
                    "fontSynthesisSmallCaps": "",
                    "fontSynthesisStyle": "",
                    "fontSynthesisWeight": "",
                    "fontVariant": "",
                    "fontVariantAlternates": "",
                    "fontVariantCaps": "",
                    "fontVariantEastAsian": "",
                    "fontVariantLigatures": "",
                    "fontVariantNumeric": "",
                    "fontVariantPosition": "",
                    "fontVariationSettings": "",
                    "fontWeight": "",
                    "forcedColorAdjust": "",
                    "gap": "",
                    "grid": "",
                    "gridArea": "",
                    "gridAutoColumns": "",
                    "gridAutoFlow": "",
                    "gridAutoRows": "",
                    "gridColumn": "",
                    "gridColumnEnd": "",
                    "gridColumnGap": "",
                    "gridColumnStart": "",
                    "gridGap": "",
                    "gridRow": "",
                    "gridRowEnd": "",
                    "gridRowGap": "",
                    "gridRowStart": "",
                    "gridTemplate": "",
                    "gridTemplateAreas": "",
                    "gridTemplateColumns": "",
                    "gridTemplateRows": "",
                    "height": "",
                    "hyphenateCharacter": "",
                    "hyphenateLimitChars": "",
                    "hyphens": "",
                    "imageOrientation": "",
                    "imageRendering": "",
                    "inherits": "",
                    "initialLetter": "",
                    "initialValue": "",
                    "inlineSize": "",
                    "inset": "",
                    "insetBlock": "",
                    "insetBlockEnd": "",
                    "insetBlockStart": "",
                    "insetInline": "",
                    "insetInlineEnd": "",
                    "insetInlineStart": "",
                    "isolation": "",
                    "justifyContent": "",
                    "justifyItems": "",
                    "justifySelf": "",
                    "left": "",
                    "letterSpacing": "",
                    "lightingColor": "",
                    "lineBreak": "",
                    "lineGapOverride": "",
                    "lineHeight": "",
                    "listStyle": "",
                    "listStyleImage": "",
                    "listStylePosition": "",
                    "listStyleType": "",
                    "margin": "",
                    "marginBlock": "",
                    "marginBlockEnd": "",
                    "marginBlockStart": "",
                    "marginBottom": "",
                    "marginInline": "",
                    "marginInlineEnd": "",
                    "marginInlineStart": "",
                    "marginLeft": "",
                    "marginRight": "",
                    "marginTop": "",
                    "marker": "",
                    "markerEnd": "",
                    "markerMid": "",
                    "markerStart": "",
                    "mask": "",
                    "maskType": "",
                    "mathDepth": "",
                    "mathShift": "",
                    "mathStyle": "",
                    "maxBlockSize": "",
                    "maxHeight": "",
                    "maxInlineSize": "",
                    "maxWidth": "",
                    "minBlockSize": "",
                    "minHeight": "",
                    "minInlineSize": "",
                    "minWidth": "",
                    "mixBlendMode": "",
                    "negative": "",
                    "objectFit": "",
                    "objectPosition": "",
                    "objectViewBox": "",
                    "offset": "",
                    "offsetAnchor": "",
                    "offsetDistance": "",
                    "offsetPath": "",
                    "offsetPosition": "",
                    "offsetRotate": "",
                    "opacity": "",
                    "order": "",
                    "orphans": "",
                    "outline": "",
                    "outlineColor": "",
                    "outlineOffset": "",
                    "outlineStyle": "",
                    "outlineWidth": "",
                    "overflow": "",
                    "overflowAnchor": "",
                    "overflowClipMargin": "",
                    "overflowWrap": "",
                    "overflowX": "",
                    "overflowY": "",
                    "overlay": "",
                    "overrideColors": "",
                    "overscrollBehavior": "",
                    "overscrollBehaviorBlock": "",
                    "overscrollBehaviorInline": "",
                    "overscrollBehaviorX": "",
                    "overscrollBehaviorY": "",
                    "pad": "",
                    "padding": "",
                    "paddingBlock": "",
                    "paddingBlockEnd": "",
                    "paddingBlockStart": "",
                    "paddingBottom": "",
                    "paddingInline": "",
                    "paddingInlineEnd": "",
                    "paddingInlineStart": "",
                    "paddingLeft": "",
                    "paddingRight": "",
                    "paddingTop": "",
                    "page": "",
                    "pageBreakAfter": "",
                    "pageBreakBefore": "",
                    "pageBreakInside": "",
                    "pageOrientation": "",
                    "paintOrder": "",
                    "perspective": "",
                    "perspectiveOrigin": "",
                    "placeContent": "",
                    "placeItems": "",
                    "placeSelf": "",
                    "pointerEvents": "",
                    "position": "",
                    "prefix": "",
                    "quotes": "",
                    "r": "",
                    "range": "",
                    "resize": "",
                    "right": "",
                    "rotate": "",
                    "rowGap": "",
                    "rubyPosition": "",
                    "rx": "",
                    "ry": "",
                    "scale": "",
                    "scrollBehavior": "",
                    "scrollMargin": "",
                    "scrollMarginBlock": "",
                    "scrollMarginBlockEnd": "",
                    "scrollMarginBlockStart": "",
                    "scrollMarginBottom": "",
                    "scrollMarginInline": "",
                    "scrollMarginInlineEnd": "",
                    "scrollMarginInlineStart": "",
                    "scrollMarginLeft": "",
                    "scrollMarginRight": "",
                    "scrollMarginTop": "",
                    "scrollPadding": "",
                    "scrollPaddingBlock": "",
                    "scrollPaddingBlockEnd": "",
                    "scrollPaddingBlockStart": "",
                    "scrollPaddingBottom": "",
                    "scrollPaddingInline": "",
                    "scrollPaddingInlineEnd": "",
                    "scrollPaddingInlineStart": "",
                    "scrollPaddingLeft": "",
                    "scrollPaddingRight": "",
                    "scrollPaddingTop": "",
                    "scrollSnapAlign": "",
                    "scrollSnapStop": "",
                    "scrollSnapType": "",
                    "scrollTimeline": "",
                    "scrollTimelineAxis": "",
                    "scrollTimelineName": "",
                    "scrollbarGutter": "",
                    "shapeImageThreshold": "",
                    "shapeMargin": "",
                    "shapeOutside": "",
                    "shapeRendering": "",
                    "size": "",
                    "sizeAdjust": "",
                    "speak": "",
                    "speakAs": "",
                    "src": "",
                    "stopColor": "",
                    "stopOpacity": "",
                    "stroke": "",
                    "strokeDasharray": "",
                    "strokeDashoffset": "",
                    "strokeLinecap": "",
                    "strokeLinejoin": "",
                    "strokeMiterlimit": "",
                    "strokeOpacity": "",
                    "strokeWidth": "",
                    "suffix": "",
                    "symbols": "",
                    "syntax": "",
                    "system": "",
                    "tabSize": "",
                    "tableLayout": "",
                    "textAlign": "",
                    "textAlignLast": "",
                    "textAnchor": "",
                    "textCombineUpright": "",
                    "textDecoration": "",
                    "textDecorationColor": "",
                    "textDecorationLine": "",
                    "textDecorationSkipInk": "",
                    "textDecorationStyle": "",
                    "textDecorationThickness": "",
                    "textEmphasis": "",
                    "textEmphasisColor": "",
                    "textEmphasisPosition": "",
                    "textEmphasisStyle": "",
                    "textIndent": "",
                    "textOrientation": "",
                    "textOverflow": "",
                    "textRendering": "",
                    "textShadow": "",
                    "textSizeAdjust": "",
                    "textTransform": "",
                    "textUnderlineOffset": "",
                    "textUnderlinePosition": "",
                    "textWrap": "",
                    "timelineScope": "",
                    "top": "",
                    "touchAction": "",
                    "transform": "",
                    "transformBox": "",
                    "transformOrigin": "",
                    "transformStyle": "",
                    "transition": "",
                    "transitionBehavior": "",
                    "transitionDelay": "",
                    "transitionDuration": "",
                    "transitionProperty": "",
                    "transitionTimingFunction": "",
                    "translate": "",
                    "unicodeBidi": "",
                    "unicodeRange": "",
                    "userSelect": "",
                    "vectorEffect": "",
                    "verticalAlign": "",
                    "viewTimeline": "",
                    "viewTimelineAxis": "",
                    "viewTimelineInset": "",
                    "viewTimelineName": "",
                    "viewTransitionName": "",
                    "visibility": "",
                    "webkitAlignContent": "",
                    "webkitAlignItems": "",
                    "webkitAlignSelf": "",
                    "webkitAnimation": "",
                    "webkitAnimationDelay": "",
                    "webkitAnimationDirection": "",
                    "webkitAnimationDuration": "",
                    "webkitAnimationFillMode": "",
                    "webkitAnimationIterationCount": "",
                    "webkitAnimationName": "",
                    "webkitAnimationPlayState": "",
                    "webkitAnimationTimingFunction": "",
                    "webkitAppRegion": "",
                    "webkitAppearance": "",
                    "webkitBackfaceVisibility": "",
                    "webkitBackgroundClip": "",
                    "webkitBackgroundOrigin": "",
                    "webkitBackgroundSize": "",
                    "webkitBorderAfter": "",
                    "webkitBorderAfterColor": "",
                    "webkitBorderAfterStyle": "",
                    "webkitBorderAfterWidth": "",
                    "webkitBorderBefore": "",
                    "webkitBorderBeforeColor": "",
                    "webkitBorderBeforeStyle": "",
                    "webkitBorderBeforeWidth": "",
                    "webkitBorderBottomLeftRadius": "",
                    "webkitBorderBottomRightRadius": "",
                    "webkitBorderEnd": "",
                    "webkitBorderEndColor": "",
                    "webkitBorderEndStyle": "",
                    "webkitBorderEndWidth": "",
                    "webkitBorderHorizontalSpacing": "",
                    "webkitBorderImage": "",
                    "webkitBorderRadius": "",
                    "webkitBorderStart": "",
                    "webkitBorderStartColor": "",
                    "webkitBorderStartStyle": "",
                    "webkitBorderStartWidth": "",
                    "webkitBorderTopLeftRadius": "",
                    "webkitBorderTopRightRadius": "",
                    "webkitBorderVerticalSpacing": "",
                    "webkitBoxAlign": "",
                    "webkitBoxDecorationBreak": "",
                    "webkitBoxDirection": "",
                    "webkitBoxFlex": "",
                    "webkitBoxOrdinalGroup": "",
                    "webkitBoxOrient": "",
                    "webkitBoxPack": "",
                    "webkitBoxReflect": "",
                    "webkitBoxShadow": "",
                    "webkitBoxSizing": "",
                    "webkitClipPath": "",
                    "webkitColumnBreakAfter": "",
                    "webkitColumnBreakBefore": "",
                    "webkitColumnBreakInside": "",
                    "webkitColumnCount": "",
                    "webkitColumnGap": "",
                    "webkitColumnRule": "",
                    "webkitColumnRuleColor": "",
                    "webkitColumnRuleStyle": "",
                    "webkitColumnRuleWidth": "",
                    "webkitColumnSpan": "",
                    "webkitColumnWidth": "",
                    "webkitColumns": "",
                    "webkitFilter": "",
                    "webkitFlex": "",
                    "webkitFlexBasis": "",
                    "webkitFlexDirection": "",
                    "webkitFlexFlow": "",
                    "webkitFlexGrow": "",
                    "webkitFlexShrink": "",
                    "webkitFlexWrap": "",
                    "webkitFontFeatureSettings": "",
                    "webkitFontSmoothing": "",
                    "webkitHyphenateCharacter": "",
                    "webkitJustifyContent": "",
                    "webkitLineBreak": "",
                    "webkitLineClamp": "",
                    "webkitLocale": "",
                    "webkitLogicalHeight": "",
                    "webkitLogicalWidth": "",
                    "webkitMarginAfter": "",
                    "webkitMarginBefore": "",
                    "webkitMarginEnd": "",
                    "webkitMarginStart": "",
                    "webkitMask": "",
                    "webkitMaskBoxImage": "",
                    "webkitMaskBoxImageOutset": "",
                    "webkitMaskBoxImageRepeat": "",
                    "webkitMaskBoxImageSlice": "",
                    "webkitMaskBoxImageSource": "",
                    "webkitMaskBoxImageWidth": "",
                    "webkitMaskClip": "",
                    "webkitMaskComposite": "",
                    "webkitMaskImage": "",
                    "webkitMaskOrigin": "",
                    "webkitMaskPosition": "",
                    "webkitMaskPositionX": "",
                    "webkitMaskPositionY": "",
                    "webkitMaskRepeat": "",
                    "webkitMaskRepeatX": "",
                    "webkitMaskRepeatY": "",
                    "webkitMaskSize": "",
                    "webkitMaxLogicalHeight": "",
                    "webkitMaxLogicalWidth": "",
                    "webkitMinLogicalHeight": "",
                    "webkitMinLogicalWidth": "",
                    "webkitOpacity": "",
                    "webkitOrder": "",
                    "webkitPaddingAfter": "",
                    "webkitPaddingBefore": "",
                    "webkitPaddingEnd": "",
                    "webkitPaddingStart": "",
                    "webkitPerspective": "",
                    "webkitPerspectiveOrigin": "",
                    "webkitPerspectiveOriginX": "",
                    "webkitPerspectiveOriginY": "",
                    "webkitPrintColorAdjust": "",
                    "webkitRtlOrdering": "",
                    "webkitRubyPosition": "",
                    "webkitShapeImageThreshold": "",
                    "webkitShapeMargin": "",
                    "webkitShapeOutside": "",
                    "webkitTapHighlightColor": "",
                    "webkitTextCombine": "",
                    "webkitTextDecorationsInEffect": "",
                    "webkitTextEmphasis": "",
                    "webkitTextEmphasisColor": "",
                    "webkitTextEmphasisPosition": "",
                    "webkitTextEmphasisStyle": "",
                    "webkitTextFillColor": "",
                    "webkitTextOrientation": "",
                    "webkitTextSecurity": "",
                    "webkitTextSizeAdjust": "",
                    "webkitTextStroke": "",
                    "webkitTextStrokeColor": "",
                    "webkitTextStrokeWidth": "",
                    "webkitTransform": "",
                    "webkitTransformOrigin": "",
                    "webkitTransformOriginX": "",
                    "webkitTransformOriginY": "",
                    "webkitTransformOriginZ": "",
                    "webkitTransformStyle": "",
                    "webkitTransition": "",
                    "webkitTransitionDelay": "",
                    "webkitTransitionDuration": "",
                    "webkitTransitionProperty": "",
                    "webkitTransitionTimingFunction": "",
                    "webkitUserDrag": "",
                    "webkitUserModify": "",
                    "webkitUserSelect": "",
                    "webkitWritingMode": "",
                    "whiteSpace": "",
                    "whiteSpaceCollapse": "",
                    "widows": "",
                    "width": "",
                    "willChange": "",
                    "wordBreak": "",
                    "wordSpacing": "",
                    "wordWrap": "",
                    "writingMode": "",
                    "x": "",
                    "y": "",
                    "zIndex": "",
                    "zoom": ""
                },
                offsetWidth: 312,
                offsetHeight: 54,
            }
        }
        if (arg === 'canvas') {
            return {
                style: {},
                getContext: function (arg) {
                    if (arg === '2d') {
                        return {
                            rect: function () {
                            },
                            isPointInPath: function (arg1, arg2, arg2) {
                                return false
                            },
                        }
                    }
                },
            }
        }
    },
    body: {
        appendChild: function (arg) {
            return arg;
        },
        removeChild: function (arg) {
            return arg;
        },
    },
    querySelector: function (arg) {
        return {
            offsetHeight: 21
        }
    },
    documentElement: {
        getAttribute: function (arg) {
            if (arg === 'driver') {
                return null
            }
            if (arg === 'selenium') {
                return null
            }
            if (arg === 'webdriver') {
                return null
            }
        },
    },
};
window.webkitResolveLocalFileSystemURL = function () {
};
window.BatteryManager = function () {
};
window.webkitMediaStream = function () {
};
window.webkitSpeechGrammar = function () {
};
window.DeviceMotionEvent = function () {
};
window.sessionStorage = {
    __ym_tab_guid: "d14c9e76-e227-cb8e-ff11-d2c8d910f8e9",
}
window.localStorage = {
    _ym3_lsid: "240059690538",
}
window.indexedDB = {}
screen = {
    availWidth: 1536,
    availHeight: 816,
    width: 1536,
    height: 864,
    colorDepth: 24
}
window.screen = screen
window.Buffer = undefined
window.chrome = {}
window.TouchEvent = function () {
}
window.DeviceOrientationEvent = function () {
}
window.addEventListener = function () {
}
window.innerWidth = 582
window.outerWidth = 1536
window.PointerEvent = function () {
}
window.XMLHttpRequest = function () {
}
window.HTMLElement = function () {
}
window.RTCPeerConnection = function () {
}
window.webkitRTCPeerConnection = function () {
}
window.FileReader = function () {
}
window.document = document
window.AudioContext = function () {
}
const AudioContext = new Proxy({}, {
    get: function (target, key) {
        if (key === 'baseLatency') {
            throw new TypeError('Illegal invocation')
        }
    }
});
window.AudioContext = {
    prototype: AudioContext,
}
window.HTMLCanvasElement = function () {
}
window.HTMLCanvasElement.prototype.toBlob = function () {
}
window.HTMLCanvasElement.prototype.toBlob.prototype = undefined
Intl = {
    NumberFormat: function () {
    },
    DateTimeFormat: function () {
    },
}
Intl.DateTimeFormat.prototype.toString = function () {
    return '[object Intl.DateTimeFormat]'
}
window.Intl = Intl
window.Notification = function () {
}
window.Notification.__proto__ = function () {
}
window.Notification.__proto__.toString = function () {
    return 'function EventTarget() { [native code] }'
}
window.speechSynthesis = {
    onvoiceschanged: null,
    paused: false,
    pending: false,
    speaking: false,
    getVoices: function () {
        return [{
            default: true,
            lang: 'zh-CN',
            localService: true,
            name: "Microsoft Huihui - Chinese (Simplified, PRC)",
            voiceURI: "Microsoft Huihui - Chinese (Simplified, PRC)",
            __proto__: {
                toString: function () {
                    return '[object SpeechSynthesisVoice]'
                }
            }
        }]
    }
}