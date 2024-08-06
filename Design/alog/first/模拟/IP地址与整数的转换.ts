// 这里的ip是指IPv4
function ipToInt(ip: string): number {
    const ipList = ip.split(".");
    const seg0 = parseInt(ipList[0]) << 24;
    const seg1 = parseInt(ipList[1]) << 16;
    const seg2 = parseInt(ipList[2]) << 8;
    const seg3 = parseInt(ipList[3]);
    return (seg0 | seg1 | seg2 | seg3) >>> 0;
}


console.log(ipToInt('255.31.12.44'))