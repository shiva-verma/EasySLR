import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { showSuccess } from 'appUtils/showSuccess';

interface Profile {
  firstName: string;
  lastName: string;
  bio: string | null;
}

const Profile: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    bio: null
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          router.push('/login');
          return;
        }
        setUser(user);

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_email', user.email)
          .single();

        if (profileError) {
          if (profileError.code === 'PGRST116') {
            // Profile doesn't exist, create a new one
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                user_email: user.email,
                firstName: '',
                lastName: '',
                bio: null
              })
              .single();

            if (createError) throw createError;

            setProfile({
              firstName: '',
              lastName: '',
              bio: null
            });
          } else {
            throw profileError;
          }
        } else if (profileData) {
          setProfile({
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            bio: profileData.bio || null
          });
        }
      } catch (err) {
        console.error("Error fetching user or profile:", err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchUserAndProfile();
  }, [router]);

  // In your Profile component

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/profiles/update', {
        method: 'POST',  // Changed from PUT to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: user?.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
  
      const result = await response.json();
      showSuccess(result.message)
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };  

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={profile.firstName}
              onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={profile.lastName}
              onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={user?.email || ''}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label>
            <textarea 
              id="bio" 
              name="bio" 
              rows={4} 
              value={profile.bio ?? ''}  
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <div className="mt-4">
          <Link href="/dashboard">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;