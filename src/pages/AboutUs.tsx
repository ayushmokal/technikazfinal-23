import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <h2 className="text-2xl font-semibold mb-6">We are a team of content writers who share their learnings</h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* Stats Section */}
          <div className="bg-primary text-white p-6 rounded-lg flex justify-around mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm">Blogs Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">18K+</div>
              <div className="text-sm">Views on Freewet</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">30K+</div>
              <div className="text-sm">Total active Users</div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">OUR MISSION</h3>
              <h4 className="text-lg font-medium mb-3">Creating valuable content for creatives all around the world</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">OUR VISION</h3>
              <h4 className="text-lg font-medium mb-3">A platform that empowers individuals to improve</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Our team of creatives</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          {/* Why we started */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Why we started this Blog</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Join Team Section */}
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-4">Join our team to be a part of our story</h3>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors">
              Join Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;