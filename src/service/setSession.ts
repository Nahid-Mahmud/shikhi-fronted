"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface SessionData {
  role: string;
  id: string;
  status: string;
  email: string;
}

const setSession = async (data: SessionData) => {
  const token = jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  (await cookies()).set("session", token);
};

export default setSession;
