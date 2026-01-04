export interface Profile {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}
