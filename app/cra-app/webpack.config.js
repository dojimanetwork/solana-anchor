/** @type {import('webpack').Configuration} */
module.exports = {
    resolve : {
        fallback : {
            "stream": require.resolve("stream-browserify")
        },
    }
}