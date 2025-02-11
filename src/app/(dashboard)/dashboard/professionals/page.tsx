'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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

export default function ProfessionalsPage() {
  const { user } = useAuth();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select(`
          *,
          user:users(username, email, description)
        `)
        .order('likes_count', { ascending: false });

      if (error) throw error;
      setProfessionals(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-lg text-gray-600">Loading professionals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading professionals</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {professionals.map((professional) => (
          <Link
            key={professional.id}
            href={`/dashboard/professionals/${professional.id}`}
            className="block hover:shadow-lg transition-shadow duration-200"
          >
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {professional.user.username}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {professional.professional_type}
                    </p>
                  </div>
                  {professional.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {professional.user.description || 'No description available.'}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {professional.likes_count} likes
                  </div>
                  <div>
                    {professional.current_athletes}/{professional.max_athletes} athletes
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {professionals.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No professionals found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
} 