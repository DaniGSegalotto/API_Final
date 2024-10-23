import express, {Application} from "express"
import cors from "cors"
import routerUsuario from "./routes/userRoute"
import routerTarefa from "./routes/tarefaRoute"
import routerLogin from "./routes/loginRoute"
import errorHandler from "./middleware/errorHandler"

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/api", routerUsuario)
app.use("/api", routerLogin) 
app.use("/api/tarefa", routerTarefa) 

app.use(errorHandler);

export default app