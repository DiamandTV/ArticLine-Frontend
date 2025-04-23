import { api } from "@lib/axios/api";
import { LoginFieldsType } from "../models/LoginFields/LoginFieldsType";

async function login(params:LoginFieldsType){
    return await api.post('/login/',params)
}

export const loginServices = {
    login
}