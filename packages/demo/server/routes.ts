import KoaRouter from 'koa-router'
import Koa from 'koa'

const router = new KoaRouter()

router.post('/demo', async (ctx: Koa.Context) => {
  ctx.body = {list: []}
})

export default router.routes()
