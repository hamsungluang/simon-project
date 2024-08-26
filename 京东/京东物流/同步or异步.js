

// 创建一个返回 Promise 对象的异步函数
function simulateAsyncOperation() {
  return new Promise(function(resolve, reject) {
    // 模拟异步操作，比如通过 setTimeout 模拟一个异步请求
    setTimeout(function() {
      const success = true; // 假设操作成功
      if (success) {
        resolve("hello world"); // 异步操作成功时调用 resolve，并传递结果
      } else {
        reject("操作失败"); // 异步操作失败时调用 reject，并传递错误信息
      }
    }, 2000);
  });
}

// 调用异步函数并处理结果
simulateAsyncOperation()
    .then(function(result) {
    console.log("异步操作成功，结果为：" + result);
  })
  .catch(function(error) {
    console.log("异步操作失败，错误信息为：" + error);
  });


simulateAsyncOperation = function (){
   return "hello world"
}
