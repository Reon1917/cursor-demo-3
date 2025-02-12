'use client';

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back to FitHub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your fitness journey
          </p>
        </div>
        
        <div className="mt-8">
          <SignIn 
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
            redirectUrl="/dashboard"
            signUpUrl="/signup"
          />
        </div>
      </div>
    </div>
  );
} 