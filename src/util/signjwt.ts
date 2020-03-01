import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

export default function sign(payload: { [key: string]: any }): string {
  return jwt.sign(payload, SECRET)
}