export interface User {
    id: number;
    email: string;
    password_hash: string;
  }
  
  export interface ResponseData {
    success: boolean;
    message: string;
  }
  