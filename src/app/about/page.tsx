import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                About FitHub
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Your Journey to a Healthier Life
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              FitHub is a platform that connects fitness enthusiasts with certified professionals
              who can guide them on their journey to better health and fitness. We believe that
              everyone deserves access to professional guidance and support in achieving their
              fitness goals.
            </p>
          </div>
          
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <h2>Our Mission</h2>
            <p>
              Our mission is to make professional fitness guidance accessible to everyone. We
              connect you with certified trainers and nutritionists who can provide personalized
              advice and support, helping you achieve your fitness goals safely and effectively.
            </p>
            
            <h2>Why Choose FitHub?</h2>
            <ul>
              <li>
                <strong>Verified Professionals:</strong> All our trainers and nutritionists are
                certified and verified, ensuring you receive expert guidance.
              </li>
              <li>
                <strong>Personalized Approach:</strong> Get customized workout plans and
                nutrition advice tailored to your specific needs and goals.
              </li>
              <li>
                <strong>Supportive Community:</strong> Join a community of like-minded
                individuals who share your passion for fitness and healthy living.
              </li>
              <li>
                <strong>Progress Tracking:</strong> Track your progress with our intuitive
                tools and celebrate your achievements along the way.
              </li>
            </ul>

            <h2>Get Started Today</h2>
            <p>
              Whether you're just beginning your fitness journey or looking to take your
              training to the next level, FitHub has the resources and support you need to
              succeed.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Join FitHub Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Values
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Built on trust and expertise
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Professional Excellence',
                  description:
                    'We maintain high standards for our professionals, ensuring you receive the best guidance possible.',
                },
                {
                  title: 'User Privacy',
                  description:
                    'Your privacy and data security are our top priorities. We implement strict measures to protect your information.',
                },
                {
                  title: 'Community Focus',
                  description:
                    'We foster a supportive community where members can share experiences and motivate each other.',
                },
              ].map((value) => (
                <div key={value.title} className="relative">
                  <dt>
                    <p className="text-lg leading-6 font-medium text-gray-900">
                      {value.title}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{value.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 