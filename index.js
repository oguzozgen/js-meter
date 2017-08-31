
function jsmeter ({isPrint = true, isMs = true, isKb = true}) {
    /*_*_*_*_ Init _*_*_*/
    this.old_time = new Date();
    this.m0 = process.memoryUsage()
    this.c0 = process.cpuUsage()

    this.isPrint = isPrint
    this.isMs = isMs
    this.isKb = isKb
}
 
jsmeter.prototype.stop = function() {
    var new_time = new Date();
    var m1 = process.memoryUsage()
    var c1 = process.cpuUsage()
    var diffCPU = process.cpuUsage(this.c0)

    var mFriction = (this.isKb) ? 1024 : 1048576
    var mUnit = (this.isKb) ? 'kb' : 'mb'

    var tCPUFriction = (this.isMs) ? 1000 : 1000000
    var tFriction = (this.isMs) ? 1 : 1000
    
    var tUnit = (this.isMs) ? 'ms' : 's'

    var diffRAM = (m1['rss'] - this.m0['rss']) / mFriction
    var diffHeapTotal = (m1['heapTotal'] - this.m0['heapTotal']) / mFriction
    var diffHeapUsed = (m1['heapUsed'] - this.m0['heapUsed']) / mFriction
    var diffExternal = (m1['external'] - this.m0['external']) / mFriction
    var diffCPU = (diffCPU.user + diffCPU.system) / tCPUFriction
    var diffTime = (new_time - this.old_time) / tFriction

    if(this.isPrint) {
        console.log('RAM        : ', diffRAM , mUnit)
        console.log('HeapTotal  : ', diffHeapTotal , mUnit)
        console.log('HeapUsed   : ', diffHeapUsed , mUnit)
        console.log('External   : ', diffExternal , mUnit)
        console.log('CPU        : ', diffCPU, tUnit)
        console.log('Spend time : ', diffTime, tUnit)
    }

    return {
        diffRAM, 
        diffHeapTotal,
        diffHeapUsed,
        diffExternal,
        diffCPU,
        diffTime
    }
}

module.exports = jsmeter