// // console.log("mock")

// const path = require('path')
// const chalk = require('react-dev-utils/chalk')
// const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
// const serve = require('koa-static')
// const paths = require('../config/paths')
// const mockPort = require(paths.appPackageJson).mockPort

// require('ts-node').register({ transpileOnly: true })
// require('tsconfig-paths').register()

// // 初始化
// const server = new Koa()

// const mockPath = path.resolve(__dirname, '../mock')
// const staticFileMiddleware = serve(mockPath)

// server.use(bodyParser())
// server.use(async (ctx, next) => {
//   if (!ctx.url.startsWith('/appassets')) {
//     return next()
//   }

//   ctx.url = ctx.url.replace(
//     /^\/appassets\/([^\/]+)\/(adaptive|fixed)\//,
//     function(_, appName, action) {
//       if (action === 'adaptive') {
//         return `/appassets/${appName}/default/`
//       }
//       return `/appassets/${appName}/`
//     }
//   )
//   return staticFileMiddleware(ctx, next)
// })

// const apiPrefix = '/api/v1/'
// // API 与 mock 文件的映射规则:
// // API路径忽略 '/api/v1' 之后的路径，即相应的 mock 文件路径。⚠️注意：index.js 在路由上不体现
// // examples:
// // API: /api/v1/extractions/test 对应的 mock 文件：/mock/extractions/test.js
// // API: /api/v1/extractions 对应的 mock 文件：/mock/extractions/index.js
// server.use(async (ctx, next) => {
//   if (ctx.path.startsWith(apiPrefix)) {
//     try {
//       // 统一处理 /api/v1 前缀
//       const filename = ctx.path.replace(apiPrefix, '')
//       const filepath = path.resolve(mockPath, filename)
//       const controller = require(filepath)
//       // 清除 require cache
//       delete require.cache[require.resolve(filepath)]
//       const handler = controller[ctx.method.toLowerCase()]
//       const response = await handler(ctx)
//       ctx.body = response
//     } catch (err) {
//       ctx.status = 404
//     }
//   } else {
//     next()
//   }
// })

// // 启动服务器
// server.listen(mockPort, () => {
//   console.log(chalk.cyan(`mock-server started at localhost:${mockPort}\n`))
// })
