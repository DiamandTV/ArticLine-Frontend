import { HOST_URL } from "@data/server";
import axios from "axios";

export const api = axios.create({
    baseURL:HOST_URL
})

