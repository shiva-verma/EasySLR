import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '~/lib/supabaseClient';

const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { title, description, status, priority, due_date, user_email, team_members } = req.body;

      if (!title || !status || !priority || !user_email || !Array.isArray(team_members)) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert({
          title,
          description,
          status,
          priority,
          due_date,
          user_email,
          team_members, // Add team members to the insertion
        })
        .select();

      if (insertError) {
        console.error('Task insertion error:', insertError);
        if (insertError.code === '23505') {
          return res.status(409).json({ error: 'A task with this description already exists' });
        }
        return res.status(500).json({ error: 'Failed to create task' });
      }

      res.status(200).json({ message: 'Task created successfully', task: data[0] });
    } catch (error: any) {
      console.error('Error creating task:', error.message);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default createTask;
