import compose from 'koa-compose';
import Router from 'koa-router';
import convert from 'koa-convert';
import config from '../configs';
import requireDir from 'require-dir';
const routes = requireDir('./routes');

// koa应用路由装载
export default function api() {
    const router = new Router({
        prefix: config.app.baseApi,
    });
    Object.keys(routes).forEach(name => {
        return routes[name]['default'](router);
    });
    return convert.compose([
        router.routes(),
        router.allowedMethods(),
    ]);
}
