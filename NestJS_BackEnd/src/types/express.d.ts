// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user: any; // You can replace 'any' with a more specific type if you want
  }
}
