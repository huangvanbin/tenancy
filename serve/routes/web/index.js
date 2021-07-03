module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const Category = require('../../models/Category')
	const Ad = require('../../models/Ad')
	const Room = require('../../models/Room')
	const Article = require('../../models/Article')
	const Comment = require('../../models/Comment')
	const Equipment = require('../../models/Equipment')
	const User = require('../../models/User')
	const router = express.Router({
		mergeParams: true
	})

	/*************************前端展示接口*************************/
	// 首页轮播图接口
	router.get('/ad/list', async (req, res) => {
		const ads = await Ad.find().lean()
		res.send(ads)
	})
	// 文章接口 + 文章详情接口
	router.get('/article/list', async (req, res) => {
		const atcs = await Article.find().lean()
		res.send(atcs)
	})
	router.get('/article/detail/:id', async (req, res) => {
		const atcsd = await Article.findById(req.params.id).lean()
		res.send(atcsd)
	})
	// 房间接口 + 房间详情接口
	router.get('/room/list', async (req, res) => {
		const rooms = await Room.find().lean()
		res.send(rooms)
	})
	router.get('/room/list/:id', async (req, res) => {
		const rooms = await Room.findById(req.params.id).lean()
		res.send(rooms)
		// const rooms = await Room.findById(req.params.id).populate('categories').lean()
		// res.send(rooms)
	})
	router.get('/room/detail/:id', async (req, res) => {
		const rooms = await Room.findById(req.params.id).populate('categories equipment1 equipment2')
			.lean()
		res.send(rooms)
	})
	// 设备接口
	router.get('/eq/list', async (req, res) => {
		const eqs = await Equipment.find().lean()
		res.send(eqs)
	})
	// 用户注册接口
	router.post('/register', async (req, res) => {
		const model = await User.create(req.body)
		res.send(model)
	})
	// 用户发布房源接口
	router.post('/roompublish', async (req, res) => {
		const model = await Room.create(req.body)
		res.send(model)
	})
	router.get('/category', async (req, res) => {
		const cates = await Category.find().lean()
		res.send(cates)
	})
	router.get('/equipment', async (req, res) => {
		const eqs = await Equipment.find().lean()
		res.send(eqs)
	})
	// 文章发布接口
	router.post('/articlepublish', async (req, res) => {
		const arptb = await Article.create(req.body)
		res.send(arptb)
	})



	// 用户信息修改
	router.get('/userpost/list', async (req, res) => {
		const model = await User.find().lean()
		res.send(model)
	})
	router.get('/userpost/list/:id', async (req, res) => {
		const model = await User.findById(req.params.id).lean()
		res.send(model)
	})



	/*************************图片上传*************************/
	const multer = require('multer')
	const upload = multer({
		dest: __dirname + '/../../uploads'
	})
	app.post('/web/api/upload', upload.single('file'), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})

	/*************************登录接口*************************/
	app.post('/web/api/login', async (req, res) => {
		// res.send('ok')
		const {
			username,
			password,
			usericon
		} = req.body
		// 1.根据用户名找用户
		const user = await User.findOne({
			username
		}).select('+password')

		assert(user, 422, '用户不存在')
		// 2.检验密码
		const isValid = require('bcrypt').compareSync(password, user.password)
		assert(isValid, 422, '密码错误')
		// 3.返回token
		const token = jwt.sign({
			id: user._id,
			icon: user.icon
		}, app.get('secret'))
		res.send({
			token
		})
	})

	/*************************错误处理函数*************************/
	app.use(async (err, req, res, next) => {
		res.status(err.statusCode || 500).send({
			message: err.message
		})
	})

	/*************************资源处理接口*************************/
	app.use('/web/api', router)
}
