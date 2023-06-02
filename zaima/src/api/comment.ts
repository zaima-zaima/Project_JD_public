import { Comment } from "../types/comment";
import request from "./request";

export async function commentCreator(data: Comment) {
  return await request.post(`/api/comment`, data);
}

export async function fetchCommentByGoods(
  gid: string,
  page: number = 1,
  limit: number = 10
) {
  return await request.get(`/api/comment/${gid}?page=${page}&limit=${limit}`);
}
