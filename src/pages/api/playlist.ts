import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const playlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const playlist = await prisma.playlist.findMany();
  res.status(200).json(playlist);
};

export default playlist;
