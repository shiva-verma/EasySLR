import type { FC } from 'react';
import Link from 'next/link';

const Home: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full px-6 py-12 bg-white bg-opacity-80 rounded-lg shadow-xl backdrop-filter backdrop-blur-sm">
          <h1 className="mb-8 text-5xl font-bold text-center text-gray-800">
            Task Management
            <span className="block mt-2 text-3xl font-light text-blue-600">Streamline Your Workflow</span>
          </h1>
          <p className="mb-12 text-xl text-center text-gray-600">
            Empower your team with our intuitive and powerful task management solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {[
              { href: "/login", text: "Login", color: "bg-blue-500 hover:bg-blue-600" },
              { href: "/signup", text: "Sign Up", color: "bg-green-500 hover:bg-green-600" },
            ].map((link, index) => (
              <Link  className={`
              px-8 py-3 text-lg font-medium rounded-md text-white
              ${link.color}
              transition duration-300 ease-in-out
              transform hover:scale-105 cursor-pointer
              shadow-md hover:shadow-lg
              flex items-center justify-center
            `} href={link.href} key={index}>
               
                  {link.text}
              
              </Link>
            ))}
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-600 bg-white bg-opacity-80">
        © 2024 Task Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
