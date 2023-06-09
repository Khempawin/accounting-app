import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const invoice = await axios.get("http://localhost:5000/invoices");
  res.status(200).json(invoice.data);
}
