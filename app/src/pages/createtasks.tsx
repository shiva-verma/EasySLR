import { FC, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { supabase } from '~/lib/supabaseClient';

const CreateTask: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState<string | undefined>('');
  const [teamMembers, setTeamMembers] = useState<string>(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error('Failed to retrieve user information');
        return;
      }

      const userEmail = user.email;
      if (!userEmail) {
        toast.error('User email not found');
        return;
      }

      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          user_email: userEmail,
          team_members: teamMembers.split(',').map(member => member.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create task');
      }

      toast.success('Task successfully created!');
      resetForm();
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error(error.message || 'Failed to create task. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setPriority('low');
    setDueDate('');
    setTeamMembers(''); 
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-blue-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-blue-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="due_date" className="block text-blue-700 font-bold mb-2">Due Date</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={dueDate || ''}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-blue-700 font-bold mb-2">Priority</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-blue-700 font-bold mb-2">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="team_members" className="block text-blue-700 font-bold mb-2">Team Members</label>
            <input
              type="text"
              id="team_members"
              name="team_members"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              placeholder="Enter team member names, separated by commas"
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105">
            Create Task
          </button>
        </form>
        <div className="mt-4">
          <Link href="/dashboard">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-lg">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
