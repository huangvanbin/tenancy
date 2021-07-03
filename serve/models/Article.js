const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	title: { type: String },
	username: { type: String },
	userimg: { type: String }, //用户头像
	banner: { type: String }, // 文章封面图
	body: { type: String },
}, 
{
	timestamps: true //时间戳
})
module.exports = mongoose.model('Article', schema)  //导出模型