import { app } from './index';
import dotenv from "dotenv"
dotenv.config()
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})