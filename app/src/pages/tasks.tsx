import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { ClipLoader } from 'react-spinners';

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  team_members: string[] | null; // Updated interface
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Tasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user: fetchedUser }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!fetchedUser) {
          router.push('/login');
          return;
        }

        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('id, title, description, status, priority, due_date, team_members') // Updated query
          .eq('user_email', fetchedUser.email);

        if (tasksError) throw tasksError;
        setTasks(tasksData ?? []);
      } catch (error) {
        if (error instanceof Error) {
          setError('Failed to load data. Please try again later.');
          console.log('This is error', error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData().catch((err) => console.error('Fetch data error:', err));
  }, [router]);

  const handleToggleDescription = (taskId: number) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClipLoader size={150} color="#3490dc" loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-white text-xl font-semibold bg-red-600 px-6 py-3 rounded-lg shadow-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-700 mb-8 text-center">Your Tasks</h2>
        <div className="space-y-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Due: {formatDate(task.due_date)}</p>
                  <div className="mt-4">
                    <p className="text-md text-gray-700 mb-2">Status: <span className="font-bold">{task.status}</span></p>
                    <p className="text-md text-gray-700">Priority: <span className="font-bold">{task.priority}</span></p>
                  </div>
                  <button
                    onClick={() => handleToggleDescription(task.id)}
                    className="mt-4 text-sm text-blue-500 hover:underline"
                  >
                    {expandedTaskId === task.id ? 'Hide Details' : 'Show Details'}
                  </button>
                  {expandedTaskId === task.id && (
                    <div className="mt-4 text-gray-600 bg-gray-50 p-4 rounded-md">
                      <p>{task.description ?? 'No description available.'}</p>
                      {task.team_members && task.team_members.length > 0 && (
                        <div className="mt-4">
                          <p className="text-md text-gray-700 mb-2">Team Members:</p>
                          <ul className="list-disc list-inside">
                            {task.team_members.map((member, index) => (
                              <li key={index} className="text-gray-700">
                                {member}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-700 bg-white shadow-lg rounded-lg">
              <p className="text-lg">No tasks available. Please create new tasks.</p>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-lg font-medium transition duration-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
