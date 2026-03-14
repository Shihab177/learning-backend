import { Router } from "express";
import isAuthenticate from "../middlewares/isAuthenticate";
import { createBook, getAllBook, getSingleBook, updateBook } from "../controllers/book-controller";


const bookRouter = Router()
bookRouter.post('/create-book',isAuthenticate,createBook)
bookRouter.get('/getAll-book',isAuthenticate,getAllBook)
bookRouter.get('/getSingle-book/:id',isAuthenticate,getSingleBook)
bookRouter.patch('/update-book/:id',isAuthenticate,updateBook)

export default bookRouter