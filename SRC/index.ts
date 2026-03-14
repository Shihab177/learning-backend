import app from "./app"
import dbConnect from "./config/db-config"

const startServer = async()=>{
    await dbConnect()
    app.listen(process.env.PORT ?? 3000,()=>{

        console.log(`Server is running on port ${process.env.PORT}`)
    })
}
startServer()