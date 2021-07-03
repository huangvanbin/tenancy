const express = require("express")
const app = express()
// 密钥
app.set('secret', 'jnr190508')

app.use(require('cors')())
app.use(express.json())

require('./plugins/db.js')(app)  // 引用数据库接口
require('./routes/admin/index.js')(app) // 引用后台管理器接口
require('./routes/web/index.js')(app) // 引用web端接口

app.use('/uploads', express.static(__dirname + '/uploads')) // 静态文件托管
app.use('/admin', express.static(__dirname + '/admin')) // 静态文件托管
app.use('/web', express.static(__dirname + '/web')) // 静态文件托管

app.listen(3000, () => {
	console.log('http://localhost:3000');
})