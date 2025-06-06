import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {  
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user_email, firstName, lastName, bio } = req.body;
  if (!user_email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        user_email: user_email,
      },
      data: {
        firstName,
        lastName,
        bio,
        updated_at: new Date(),
      },
    });

    return res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Failed to update profile' });
  } finally {
    await prisma.$disconnect();
  }
}
