'use client';

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Join FitHub Today
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start your fitness journey with professional guidance
          </p>
        </div>
        
        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-indigo-600 hover:bg-indigo-700 text-white",
                footerActionLink: 
                  "text-indigo-600 hover:text-indigo-500",
                card: 
                  "bg-white shadow-none",
              },
            }}
            redirectUrl="/onboarding"
            signInUrl="/signin"
          />
        </div>
      </div>
    </div>
  );
} 