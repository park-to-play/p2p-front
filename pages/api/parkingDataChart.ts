import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';

export default async function parkingDataChart(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { header, body } = req.body;

  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/parkingData/?parking_name=${body.pakring_name}`,
      header as AxiosRequestConfig,
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Failed to fetch search results: ${error}`);
    res
      .status(500)
      .json({ message: `Failed to fetch search results: ${error}` });
  }
}
