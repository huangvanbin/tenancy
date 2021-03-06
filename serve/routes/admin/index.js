module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const Admin = require('../../models/Admin')
	const router = express.Router({
		mergeParams: true // 合并url
	})
	// const Category = require('../../models/Category.js')
	
/*************************通用CRUD接口*************************/
	// 创建资源
	router.post('/', async (req, res) => {
		const model = await req.Model.create(req.body)
		res.send(model)
	})
	// 更新资源
	router.put('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})
	// 删除资源
	router.delete('/:id', async (req, res) => {
		await req.Model.findByIdAndDelete(req.params.id, req.body)
		res.send({
			success: true
		})
	})
	// 资源列表
	router.get('/',  async (req, res) => {
		const queryOptions = {}
		if (req.Model.modelName === 'Category' || 'Room' || 'Comment') {
			queryOptions.populate = 'parent'
		}
	  const items = await req.Model.find().setOptions(queryOptions).limit(200)
	  res.send(items)
	})
	// 资源详情
	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})

/*************************登录校验中间键*************************/
	const authMiddleware = require('../../middleware/auth')
	const resourceMiddleware = require('../../middleware/resource')
	
/*************************图片上传*************************/
	const multer = require('multer')
	const upload = multer({
		dest: __dirname + '/../../uploads'
	})
	app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
		// req.file.url = `${config.ossUrl}/${req.file.filename}`
		// res.send(req.file)
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})

/*************************登录接口*************************/
	app.post('/admin/api/login', async (req, res) => {
		// res.send('ok')
		const { username, password } = req.body
		// 1.根据用户名找用户
		const user = await Admin.findOne({ username }).select('+password')
		// if (!user) {
		// 	return res.status(422).send({
		// 		message: '用户不存在'
		// 	})
		// }
		assert(user, 422, '用户不存在')
		// 2.检验密码
		const isValid = require('bcrypt').compareSync(password, user.password)
		assert(isValid, 422, '密码错误')
		// 3.返回token
		const token = jwt.sign({ id: user._id }, app.get('secret'))
		res.send({ token })
	})
	
/*************************错误处理函数*************************/
	app.use(async (err, req, res, next) => {
		res.status(err.statusCode || 500).send({
			message: err.message
		})
	})
/*************************资源处理接口*************************/
	app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
}