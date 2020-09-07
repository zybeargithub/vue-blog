const devMiddleware = require('webpack-dev-middleware');

module.exports = (compiler, opts) => {
    const expressMiddleware = devMiddleware(compiler, opts);
    let nextFlag = false;
    function nextFn() {
        nextFlag = true;
    }

    // express的中间件入参是function|functions,
    // 所以这里返回function对象
    function devFn(ctx, next) {
        expressMiddleware(ctx.req, {
            end: (content) => {
                ctx.body = content;
            },
            setHeader: (name, value) => {
                ctx.headers[name] = value;
            },
        }, nextFn);

        if (nextFlag) {
            nextFlag = false;
            return next();
        }
    }
    // function也能添加属性
    devFn.fileSystem = expressMiddleware.fileSystem;
    return devFn;
};
