import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';

export default async function getSearchResults(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { header, body } = req.body;

  try {
    const location = { location: body };
    console.log('Location:', location, 'Headers:', header);

    const response = await axios.post(
      'http://127.0.0.1:8000/api/search/',
      location,
      header as AxiosRequestConfig,
    );

    console.log('API Response:', response.data, location);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Failed to fetch search results: ${error}`);
    res
      .status(500)
      .json({ message: `Failed to fetch search results: ${error}` });
  }
}
