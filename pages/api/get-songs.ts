import type { NextApiRequest, NextApiResponse } from "next";
import { Song } from "../../models/Song";
import { songs } from "./data/songs.source";

export default function getSongs(
  req: NextApiRequest,
  res: NextApiResponse<Song[]>
) {
  res.status(200).json(songs);
}
