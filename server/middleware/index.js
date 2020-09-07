import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser'; // 解析Request body对象
import convert from 'koa-convert'; // 将老的使用Generate函数中间件，转换为基于Promise的中间件供Koa2使用
import onerror from 'koa-onerror';
import compress from 'koa-compress'; // 开启gzip压缩

export default function middleware() {
    return convert.compose(
        logger(),
        bodyParser(),
        compress({
            filter: function (content_type) {
                if (/event-stream/i.test(content_type)) {
                    // 为了让hot reload生效，不对__webpack_hmr压缩
                    return false;
                } else {
                    return true;
                }
            },
        })
    );
}
