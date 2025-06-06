import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface User extends SupabaseUser {}

const Dashboard: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        setUser(fetchedUser as User);
      } catch (error: any) {
        setError('Failed to load data. Please try again later.');
        showError('Failed to load data. Please try again later.'); 
        console.log("This is error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      showSuccess('Successfully logged out');
      router.push('/login');
    } catch (error: any) {
      showError('Failed to log out. Please try again later.');
    }
  };

  const showError = (msg: string) => toast.error(msg);
  const showSuccess = (msg: string) => toast.success(msg);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-indigo-600">Task Manager</span>
            <div className="flex items-center space-x-6">
              <Link href="/profile">
                <span className="text-gray-600 hover:text-indigo-600 transition duration-300 cursor-pointer">
                  Profile
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 flex-grow">
        <h2 className="text-4xl font-bold text-indigo-600 mb-12 text-center">Welcome, {user?.email}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow-xl p-8 transition duration-500 hover:shadow-2xl hover:scale-105">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Create New Task</h3>
            <Link href="/createtasks">
              <span className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 cursor-pointer">
                New Task
              </span>
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 transition duration-500 hover:shadow-2xl hover:scale-105">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Your Tasks</h3>
            <p className="text-gray-600 mb-6">Your tasks will be displayed here</p>
            <Link href="/tasks">
              <span className="text-indigo-600 hover:text-indigo-800 transition duration-300 cursor-pointer flex items-center">
                View All Tasks
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 transition duration-500 hover:shadow-2xl hover:scale-105">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Project Overview</h3>
            <p className="text-gray-600">Project statistics will be displayed here.</p>
          </div>
        </div>
      </main>

      <footer className="bg-white py-8 px-6 shadow-inner mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h4 className="text-2xl font-bold text-indigo-600 mb-2">Task Manager</h4>
              <p className="text-gray-600">Empowering your productivity, one task at a time.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <div>
                <h5 className="text-xl font-semibold text-indigo-600 mb-4">Connect With Us</h5>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.927 4.927 0 001.527 6.564c-.828-.026-1.607-.254-2.287-.635v.063c0 2.234 1.586 4.09 3.686 4.51a4.968 4.968 0 01-2.21.084c.628 1.958 2.445 3.38 4.597 3.418a9.97 9.97 0 01-6.207 2.143c-.405 0-.803-.023-1.197-.07a14.056 14.056 0 007.548 2.211c9.057 0 14.027-7.51 14.027-14.027 0-.21-.004-.42-.014-.63A10.036 10.036 0 0024 4.59a9.97 9.97 0 01-2.067.572z"/></svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.248c-5.284 0-9.568 4.473-9.568 9.57s4.284 9.57 9.568 9.57c5.284 0 9.568-4.473 9.568-9.57S17.284 2.248 12 2.248zm0 16.063c-3.512 0-6.375-2.864-6.375-6.375s2.863-6.375 6.375-6.375 6.375 2.863 6.375 6.375-2.863 6.375-6.375 6.375zm0-10.188a3.963 3.963 0 00-3.963 3.963 3.963 3.963 0 003.963 3.963 3.963 3.963 0 003.963-3.963 3.963 3.963 0 00-3.963-3.963z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
