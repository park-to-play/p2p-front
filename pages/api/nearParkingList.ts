import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';

// body로 위도 경도가 날라오면
// 인근 주차장 마킹하기
export default async function nearParkingList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { header, body } = req.body;

  try {
    const location = { location: body };
    const response = await axios.post(
      'http://127.0.0.1:8000/parking/lot/',
      location,
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
