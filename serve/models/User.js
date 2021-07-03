const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	usericon: { type:String },
  username: { type:String },
	password: { 
		type: String,
		select: false,
		set(val) {
			return require('bcrypt').hashSync(val, 10)
		}
	},
	usertelphone: { type:String },
	usermail: { type:String },
	usersex: { type:String },
	userbirth: { type:String },
	usertip: { type:String },
})

module.exports = mongoose.model('User', schema)  //导出模型