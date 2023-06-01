import { Comment } from "../types/comment";
import request from "./request";

export async function commentCreator(data: Comment) {
  return await request.post(`/api/comment`, data);
}

export async function fetchCommentByGoods(gid: string) {
  return await request.get(`/api/comment/${gid}`);
}
