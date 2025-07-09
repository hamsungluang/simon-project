originalCreateObjectURL = URL.createObjectURL;
URL.createObjectURL = function (obj) {
    console.trace("Blob 被创建了", obj);
    debugger;
    return originalCreateObjectURL.call(this, obj);
};