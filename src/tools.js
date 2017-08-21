function runInfo(fn, callback) {
    return {
        fn: fn,
        callback: callback ? callback : undefined
    }
}

module.exports = { runInfo }