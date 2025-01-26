import { NextApiRequest, NextApiResponse } from 'next';

// Simulated data for topics
const topicsData: Record<string, string[]> = {
  '1': ['Algebra', 'Geometry', 'Calculus'],
  '2': ['Mechanics', 'Thermodynamics', 'Optics'],
  '3': ['Marketing', 'Finance', 'Management']
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { courseId } = req.query;
  const topics = topicsData[courseId as string] || [];
  res.status(200).json(topics);
}
