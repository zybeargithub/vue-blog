import mongoose from 'mongoose';
import moment from 'moment'; // js日期处理类库
moment.locale('zh-cn'); // 使用本地时间
const Schema = mongoose.Schema; // Mongoose一切始于Schema，每个schema都会映射一个MongoDB Collection
// 定义articel的结构体
const articleSchema = new Schema({
    title: String,
    content: String,
    abstract: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag',
    }],
    publish: {
        type: Boolean,
        default: false,
    },
    createTime: {
        type: Date,
    },
    lastEditTime: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true, virtuals: true });
articleSchema.path('createTime').get(function (v) {
    return moment(v).format('lll');
});
articleSchema.path('lastEditTime').get(function (v) {
    return moment(v).format('lll');
});
module.exports = mongoose.model('article', articleSchema);
