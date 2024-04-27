import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionClaims, userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!sessionClaims?.metadata.role) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  return res.status(200).json({ userRole: sessionClaims.metadata.role });
}
