

function toredis(key) {
// 创建Redis客户端实例
    var p = window.PGreed.safeGet()
    var aa = p.then((res) => {
        Buffer=_Buffer
        const redis = new Redis({
        host: 'localhost', // Redis服务器地址
        port: 6379, // Redis服务器端口号
        db: 1
    });
        redis.lpush(key, JSON.stringify(res))
        redis.quit();
    });
}



