import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 모델링 데이터, 시각화 자료 api
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    new Error('not support method');
  }
}
