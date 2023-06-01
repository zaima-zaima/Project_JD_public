export interface UserRegister {
  username: string;
  password: string;
  repassword: string;
  phone: string;
  role: string;
  captcha: string;
}

export interface User {
  id?: string;
  username: string;
  password?: string;
  phone: string;
  role: "user" | "businse" | "admin" | "superAdmin";
  avatar?: string;
}
