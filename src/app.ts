import express, {Application} from "express"
import cors from "cors"
import utils from "./routes/utilsRoutes"
import routerUsuario from "./routes/userRoute"
import routerPet from "./routes/petRoute"
import routerLogin from "./routes/loginRoute"
import errorHandler from "./middleware/errorHandler"

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/api", utils)
app.use("/api/usuario", routerUsuario)
app.use("/api", routerLogin) 
app.use("/api/pet", routerPet) 

app.use(errorHandler);


export default app