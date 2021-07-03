const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    acticlenames: { type:mongoose.SchemaTypes.ObjectId, ref:'Article' },  // 文章名称
		// username: { type:mongoose.SchemaTypes.ObjectId, ref:'User' },  // 评论的用户名
    username: { type:String },  //评论的用户名
		usericon: { type:String },  //用户头像
    content: { type:String },  //评论内容

})
module.exports = mongoose.model('Comment', schema)  //导出模型