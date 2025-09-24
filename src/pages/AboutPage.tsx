// src/pages/AboutPage.tsx
import { SEOHead } from '@/components/common/SEOHead'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Metadata */}
      <SEOHead
        title="About Us"
        description="Learn more about Tek Pou Nou — our mission, values, and the team behind the platform."
      />

      {/* Header Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We built Tek Pou Nou to empower communities with education, collaboration,
            and innovation. Here’s our story.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to create a connected learning ecosystem where students,
              teachers, and professionals can thrive together. Through courses,
              community-driven projects, and AI-powered insights, we aim to bridge
              the gap between opportunity and knowledge.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
            <span className="text-gray-500">[Mission Illustration Placeholder]</span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-sm rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">We believe in the power of collaboration and support.</p>
            </div>
            <div className="bg-white shadow-sm rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">We use technology to solve real problems and empower people.</p>
            </div>
            <div className="bg-white shadow-sm rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Accessibility</h3>
              <p className="text-gray-600">Education and resources should be available to everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Want to be part of our journey?
          </h2>
          <p className="text-gray-600 mb-6">
            Join Tek Pou Nou today and help us create a stronger, more connected community.
          </p>
          <a
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}
