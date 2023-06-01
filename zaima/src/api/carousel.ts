import request from "./request";

// 获取主页的主轮播图

export async function getHomeMainCarousel() {
    return await request.get("/api/homeMianCarsel");
}

// 获取主页附轮播图

export async function getAttachCarousel() {
    return await request.get("/api/homeAttachCarousel");
}