window = global;
delete global;
document = {}
document.all = []
navigator = {}
navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
document.createElement = function () {
    debugger
}
document.documentElement = {}
document.createEvent = function () {
    debugger
}
window.requestAnimationFrame = function (){
    debugger
}
XMLHttpRequest = function (){};
function getEnv(proxy_array) {
  for(let i=0; i<proxy_array.length; i++){
    handler = `{
            get: function(target, property, receiver) {
                   console.log('方法：get','    对象：${proxy_array[i]}','    属性：',property,'    属性类型：',typeof property,'    属性值类型：',typeof target[property]);
                   return target[property];
            },
            set: function(target, property, value, receiver){
                    console.log('方法：set','    对象：${proxy_array[i]}','    属性：',property,'    属性类型：',typeof property,'    属性值类型：',typeof target[property]);
                    return Reflect.set(...arguments);
            }
        }`;
    eval(`
            try{
                ${proxy_array[i]};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]},${handler});
            }catch(e){
                ${proxy_array[i]}={};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]},${handler});
            }
        `);
  }
}
proxy_array = ['window','document','locaion', 'navigator', 'history', 'screen', 'history']
getEnv(proxy_array);