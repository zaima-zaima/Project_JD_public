export default function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.headers['X-Forwarded-For'];//判断是否有反向代理头信息
    if (forwardedIpsStr) {//如果有，则将头信息中第一个地址拿出，该地址就是真实的客户端IP；
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {//如果没有直接获取IP；
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};