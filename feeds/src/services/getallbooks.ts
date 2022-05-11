import axios from "axios";
import { Context } from "koa";
import { customError } from "../errors/customError";
import dotenv from "dotenv"
import { Ibook } from "../const/interface";
dotenv.config();
export const getallbooks = async ():Promise<Ibook[]> => {

    const books:Ibook[] = await axios.get('http://localhost:3001/book/?title=', {
        headers: {
            Authorization: `${process.env.TOKEN}`
        }
    },
    ).then(res => res.data).catch(error => {
        const { status, statusText } = error.response;
        throw new customError(statusText, status)
    });
    return books;
}