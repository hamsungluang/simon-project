
function showStacks() {
    Java.perform(function () {
      console.log(Java.use("android.util.Log").getStackTraceString(
        Java.use("java.lang.Throwable").$new()
    ));
	})
}

function hook_StringBuilder(){
    var stringBuilderClass = Java.use("java.lang.StringBuilder");
    stringBuilderClass.toString.implementation = function (){
    var res = this.toString.apply(this,arguments);
    showStacks();
    console.log("StringBuilder-->" + res.toString())
    return res
    }
}
Java.perform(function() {
    hook_StringBuilder()
});
