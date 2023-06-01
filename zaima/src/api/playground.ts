import request from "./request";
import {PlayGround} from "../types/playground";


export async function getPlayGround():Promise<PlayGround> {
    return await request.get("/api/playground");
}