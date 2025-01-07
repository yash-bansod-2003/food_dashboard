export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "manager" | "admin";
  restaurant: string;
}
