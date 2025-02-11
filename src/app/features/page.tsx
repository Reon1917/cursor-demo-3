import Link from 'next/link';

const features = [
  {
    title: 'Professional Guidance',
    description: 'Connect with certified fitness trainers and nutritionists who provide expert guidance tailored to your needs.',
    details: [
      'One-on-one interaction with certified professionals',
      'Personalized workout and nutrition plans',
      'Regular progress assessments and plan adjustments',
      'Direct messaging for quick questions and support',
    ],
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your fitness journey with comprehensive tracking tools and analytics.',
    details: [
      'Track weight, measurements, and fitness metrics',
      'Visual progress charts and graphs',
      'Achievement milestones and badges',
      'Progress photo timeline',
    ],
  },
  {
    title: 'Customized Plans',
    description: 'Receive workout and nutrition plans tailored to your specific goals and preferences.',
    details: [
      'Goal-based program customization',
      'Dietary preference consideration',
      'Fitness level adaptation',
      'Schedule flexibility',
    ],
  },
  {
    title: 'Community Support',
    description: 'Join a supportive community of like-minded individuals on their fitness journey.',
    details: [
      'Connect with other members',
      'Share success stories and tips',
      'Group challenges and events',
      'Motivation and accountability',
    ],
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Powerful features to support</span>
              <span className="block text-indigo-600">your fitness journey</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Discover all the tools and features FitHub offers to help you achieve your fitness goals
              with professional guidance and community support.
            </p>
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {features.map((feature, featureIdx) => (
              <div
                key={feature.title}
                className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className={`lg:col-span-5 ${
                  featureIdx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-3xl">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-lg text-gray-500">
                    {feature.description}
                  </p>
                  <div className="mt-6">
                    <ul className="space-y-3">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="ml-2 text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`mt-6 lg:col-span-7 lg:mt-0 ${
                  featureIdx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                    <div className="h-full w-full object-cover object-center bg-gradient-to-r from-indigo-50 to-indigo-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-indigo-600">Join FitHub today.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 