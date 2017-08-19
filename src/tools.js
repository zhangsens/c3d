function runInfo(fn, callback) {
    return {
        fn: fn,
        callback: callback ? callback : undefined
    }
}

//export { runInfo }