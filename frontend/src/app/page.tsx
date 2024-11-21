'use client';

import Image from "next/image";
import Head from "next/head";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

const Signup = dynamic(() => import('./signup'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function SignupWithErrorBoundary({onSuccess}: {onSuccess: () => void}) {
  return (
      <ErrorBoundary FallbackComponent={() => <p>Error loading Signup component</p>}>
        <Signup onSuccess={onSuccess}/>
      </ErrorBoundary>
  );
}

export default function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSignupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSignupSuccess = () => {
    setIsSignupOpen(false); // Close the modal on successful signup
  };

  return (
      <div className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-500 text-white h-screen flex flex-col" >
        <Head>
          <title>Morning Light Planner</title>
          <meta
              name="description"
              content="Morning Light Planner is your intelligent companion for daily productivity."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="flex justify-between items-center p-6 sm:px-12">
          <div className="flex items-center gap-4">
            <Image
                src="/images/logo.png"
                alt="Morning Light Planner Logo"
                width={40}
                height={40}
                className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Morning Light Planner</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:underline">Login</button>
            <button
                aria-label="Open Signup Modal"
                onClick={() => setIsSignupOpen(!isSignupOpen)}
                className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Signup
            </button>
          </div>
        </header>

        <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
          <SignupWithErrorBoundary onSuccess={handleSignupSuccess}/>
        </Modal>

        <section className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between px-6 sm:px-12 py-16 sm:py-20 gap-12">
          <div className="text-center sm:text-left max-w-md">
            <h2 className="text-4xl font-bold leading-snug">The Best App to Increase Your Productivity</h2>
            <p className="mt-4 text-gray-200">
              A mobile app designed to run on a mobile device such as a phone, tablet, or watch.
            </p>
            <div className="mt-6 flex justify-center sm:justify-start gap-4">
              <a
                  href="#"
                  className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <Image src="images/apple-100.svg" alt="App Store" width={24} height={24} />
                Get on Appstore
              </a>
              <a
                  href="#"
                  className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <Image src="images/google-play-96.svg" alt="Play Store" width={24} height={24} />
                Get on Playstore
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
                src="/images/mock-phone-app-transparent.png"
                alt="App Mockup"
                width={300}
                height={600}
                loading="lazy"
                className="shadow-xl"
            />
          </div>
        </section>
        {/* About Section */}
        <section id="about-section" className="bg-white text-gray-800 py-16 px-6 sm:px-12">
          <h3 className="text-3xl font-bold text-center">About The App</h3>
          <p className="text-center mt-4 text-gray-600">
            Morning Light Planner is your intelligent companion for daily productivity. Designed to bring clarity to
            your schedule, the app utilizes advanced AI to automatically prioritize tasks and allocate time effectively.
            Whether you’re a professional managing deadlines, a student balancing studies, or a parent organizing a busy
            household, Morning Light Planner adapts to your unique needs. With seamless integration across devices,
            personalized scheduling, and user-friendly design, it empowers you to focus on what truly matters. Start
            your day with purpose, stay on track, and achieve your goals with ease. Let Morning Light Planner illuminate
            your path to success!
          </p>
        </section>
      </div>
  );
}
