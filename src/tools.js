function runInfo(fn, callback) {
    var name = callback ? callback.name : undefined;
    return {
        fn: fn,
        callback: name
    }
}

//export { runInfo }