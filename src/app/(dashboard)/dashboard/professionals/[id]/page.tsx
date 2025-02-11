'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';

type Professional = {
  id: string;
  user_id: string;
  professional_type: 'trainer' | 'nutritionist';
  verified: boolean;
  likes_count: number;
  max_athletes: number;
  current_athletes: number;
  created_at: string;
  user: {
    username: string;
    email: string;
    description: string;
  };
};

export default function ProfessionalProfilePage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<'none' | 'pending' | 'accepted' | 'rejected'>('none');

  useEffect(() => {
    fetchProfessionalProfile();
    if (user) {
      checkRequestStatus();
    }
  }, [user, params.id]);

  const fetchProfessionalProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select(`
          *,
          user:users(username, email, description)
        `)
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setProfessional(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkRequestStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('professional_athlete_relations')
        .select('status')
        .eq('professional_id', params.id)
        .eq('athlete_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setRequestStatus(data?.status || 'none');
    } catch (error: any) {
      console.error('Error checking request status:', error);
    }
  };

  const handleRequest = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('professional_athlete_relations')
        .insert({
          professional_id: params.id,
          athlete_id: user?.id,
          status: 'pending'
        });

      if (error) throw error;
      setRequestStatus('pending');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Professional not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{professional.user.username}</h1>
              <p className="mt-1 text-sm text-gray-500 capitalize">{professional.professional_type}</p>
            </div>
            {professional.verified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* About */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">About</h3>
              <p className="mt-2 text-sm text-gray-600">
                {professional.user.description || 'No description available.'}
              </p>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
              <dl className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Athletes</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {professional.current_athletes}/{professional.max_athletes}
                  </dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Likes</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {professional.likes_count}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              {user && user.id !== professional.user_id && (
                <>
                  {requestStatus === 'none' && (
                    <button
                      onClick={handleRequest}
                      disabled={loading || professional.current_athletes >= professional.max_athletes}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                      Request Training
                    </button>
                  )}
                  {requestStatus === 'pending' && (
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50">
                      Request Pending
                    </span>
                  )}
                  {requestStatus === 'accepted' && (
                    <span className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50">
                      Training Active
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 