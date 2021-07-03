const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	name: { type: String }, // 房屋名字
	images: [{ 
		img: { type: String },
	}], // 房屋图片数组
	// categories: { type: String }, // 房屋类型
	categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],  // 房屋类型
	// 房屋详情
	monthly: { type: Number }, //房租
	area: { type: Number }, //房子面积
	floor: { type: Number }, //楼层
	// 房屋配套信息+设备
	equipment1 :[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Equipment' }], // 基本信息
	equipment2 :[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Equipment' }], // 配套设施
	liveTips: { type: String }, // 入住小提示
	// 房源描述
	informations: [{
		icon: { type: String }, // 图标
		iicon: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Equipment' }],
		name: { type: String }, // 名称
		description: { type: String }, // 描述
	}],
	// 费用
	cost: {
		m1: { type: String }, // 付款方式
		m2: { type: Number }, // 押金
		m3: { type: Number }, // 服务费
		// m4: { type: String }, // 押金描述
		// m5: { type: String }, // 服务费描述
	},
	hots: { type: Number } ,// 房屋热度
	liaison: { type: String }, // 联系人
	telphone: { type: String }, // 联系电话
	wechat: { type: String }, // 联系微信
},
{
	timestamps: true //时间戳
})

module.exports = mongoose.model('Room',schema)