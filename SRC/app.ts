import express from "express"
import morgan from "morgan"
import globalErrorHandler from "./middlewares/global-error-handler"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth-route"
import bookRouter from "./routes/book-route"



const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use('/api/auth',authRouter)
app.use('/api/book',bookRouter)

//404 error handler
app.use((req,res,next)=>{
    return res.status(404).json({success:false , message: " not found"})
})

//global error handler
app.use(globalErrorHandler)


export default app