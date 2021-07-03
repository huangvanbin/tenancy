const mongoose = require('mongoose')
//新建模型
const schema = new mongoose.Schema({
	//字段以及字段类型
	name: { type:String },
	icon: { type:String },
})
module.exports = mongoose.model('Equipment',schema)