module.exports = options => {
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const Admin = require('../models/Admin')
	
	return async (req, res, next) => {
		const token = String(req.headers.authorization || '').split(' ').pop()
		if (!token) {
			return res.status(401).send({
				message: '请先登录'
			})
		}
		// assert(token, 401, '请先登录') // 这里这样写有问题
		const { id } = jwt.verify(token, req. app.get('secret'))
		assert(id, 401, '请先登录')
		req.user = await Admin.findById(id)
		assert(req.user, 401, '请先登录')
		await next()
	}
}