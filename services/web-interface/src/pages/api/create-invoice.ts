import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { invoice, lineItems } = req.body;
  await axios.post(
    "http://localhost:5000/invoices/create",
    {
      invoice,
      lineItems,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  res.status(201).json({ message: "OK" });
}
