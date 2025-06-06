import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { appUser, profile } = await prisma.$transaction(async (prisma) => {
      const appUser = await prisma.appUser.create({
        data: { email },
      });

      const profile = await prisma.profile.create({
        data: {
          firstName: 'New',
          lastName: 'User',
          bio: 'Welcome to my profile!',
          user_email: email,
        },
      });

      return { appUser, profile };
    });

    res.status(201).json({ user: appUser, profile });
  } catch (error) {
    console.error('Error creating user and profile:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'A user with this email already exists' });
      }
    }
    res.status(500).json({ error: 'Failed to create user and profile' });
  } finally {
    await prisma.$disconnect();
  }
}