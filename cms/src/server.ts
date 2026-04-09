import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()

// Redirect root to admin
app.get('/', (_, res) => res.redirect('/admin'))

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(process.env.PORT || 3001, () => {
    payload.logger.info(`Server running on port ${process.env.PORT || 3001}`)
  })
}

start()
