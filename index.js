import express from "express" ;
import bodyParser from "body-parser";
import cors from "cors" ;
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { DBConnection } from "./config/DbConnection.js";
import { globalError } from "./middleware/errorMiddleware.js";
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import homeRouter from "./router/homeRouter.js"
import flockRouter from "./router/flockRouter.js"
import incomeRouter from "./router/incomeRouter.js"
import expensesRouter from "./router/expensesRouter.js"
import moralityRouter from "./router/moralityRouter.js"
import medicianRouter from "./router/medicianRouter.js"
import vaccinationRouter from "./router/vaccinationRouter.js"
import feedServiedRouter from "./router/feedServiedRouter.js"
import consumptionInventoryRouter from "./router/consumInventoryRouter.js"
import productionInventoryRouter from "./router/productionInventoryRouter.js"
import incomeCategoryRouter from "./router/incomeCategoryRouter.js"
import expensesCategoryRouter from "./router/expensesCategoryRouter.js"
import consumCategoryRouter from "./router/consumCategoryRouter.js"
import productionCategoryRouter from "./router/productionCategoryRouter.js"
import cookieParser from "cookie-parser";
configDotenv({path : "config/config.env"})
const app = express() ;
DBConnection();
const PORT = process.env.PORT || 2000 ;
app.use(cors());
app.use(cookieParser())
app.use(express.json());
if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev"))
    console.log("Mode : Development")
}

app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/home" , homeRouter)
app.use("/api/flock" , flockRouter)
app.use("/api/income" , incomeRouter)
app.use("/api/expenses" , expensesRouter)
app.use("/api/morality" , moralityRouter)
app.use("/api/medician" , medicianRouter)
app.use("/api/vaccination" , vaccinationRouter)
app.use("/api/feedservied" , feedServiedRouter)
app.use("/api/conInventory" , consumptionInventoryRouter)
app.use("/api/ProInventory" , productionInventoryRouter)
app.use("/api/incomeCategory" , incomeCategoryRouter)
app.use("/api/expensesCategory" , expensesCategoryRouter)
app.use("/api/consumCategory" , consumCategoryRouter)
app.use("/api/ProCategory" , productionCategoryRouter)


//global error Middleware 
app.use(globalError);


app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})
