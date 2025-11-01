'use client'

import Layout from '@/components/Layout'
import Card from '@/components/Card'

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-deep-space-blue mb-4">
            About HealthMate AI
          </h1>
          <p className="text-lg text-graphite-gray">
            Understanding your health, one conversation at a time
          </p>
        </div>

        <div className="space-y-6">
          {/* Concept Section */}
          <Card 
            header="💡 Concept"
            subheader="Your AI-powered health assistant"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-graphite-gray leading-relaxed mb-4">
                HealthMate AI is a web application that uses Artificial Intelligence (AI) to help users understand their potential health issues in a simple, conversational way.
              </p>
              <p className="text-graphite-gray leading-relaxed">
                It asks the user what's wrong, analyzes their symptoms intelligently, asks a few smart follow-up questions, and finally generates a personalized health summary that is sent directly to the user's email.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-electric-blue">
                <p className="text-deep-space-blue font-medium italic">
                  The goal is not to replace doctors, but to provide users with a quick, AI-assisted overview of their condition before seeking professional help.
                </p>
              </div>
            </div>
          </Card>

          {/* How It Works Section */}
          <Card 
            header="How It Works"
            subheader="A simple 3-step process"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-deep-space-blue mb-3">
                  1. User Interaction (Frontend)
                </h3>
                <p className="text-graphite-gray leading-relaxed mb-4">
                  The user visits the web app and enters their health concern (e.g., "I have a headache and fatigue").
                </p>
                <p className="text-graphite-gray leading-relaxed">
                  The system connects to an AI backend that:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-graphite-gray ml-4">
                  <li>Detects possible symptoms</li>
                  <li>Generates 5 yes/no questions to confirm or rule out conditions</li>
                  <li>The user answers these questions interactively</li>
                  <li>The app shows a summary that explains the possible cause and suggests next steps</li>
                  <li>The summary is emailed to the user for future reference</li>
                </ul>
              </div>

              {/* Flow Example */}
              <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
                <h4 className="text-lg font-semibold text-deep-space-blue mb-3">
                  Flow Example:
                </h4>
                <div className="space-y-3 text-graphite-gray">
                  <div className="flex items-start">
                    <span className="font-semibold text-electric-blue mr-2">User →</span>
                    <span>"I have chest pain."</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-electric-blue mr-2">Backend →</span>
                    <span>"Possible symptoms: fatigue, pressure, shortness of breath. Questions: Do you feel tightness? Do you have nausea?" etc.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-electric-blue mr-2">User →</span>
                    <span>Answers questions</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-electric-blue mr-2">AI →</span>
                    <span>"You might be experiencing symptoms of mild heart strain or anxiety. Please consult a doctor."</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-electric-blue mr-2">Email →</span>
                    <span>Summary sent with all details</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* User Experience Section */}
          <Card 
            header="User Experience"
            subheader="Clean, simple, and intuitive"
          >
            <div className="space-y-4">
              <p className="text-graphite-gray leading-relaxed">
                The app uses a <strong className="text-deep-space-blue">3-step interface</strong>:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-deep-space-blue mb-2">1. Describe Problem</h4>
                  <p className="text-sm text-graphite-gray">Simple input and submit button</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-deep-space-blue mb-2">2. Questions</h4>
                  <p className="text-sm text-graphite-gray">Yes/no questions generated by AI</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-deep-space-blue mb-2">3. Summary</h4>
                  <p className="text-sm text-graphite-gray">Personalized result + email form</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-graphite-gray leading-relaxed">
                  The design is:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-graphite-gray ml-4">
                  <li>Clean, calm, and medical in tone (blue-white colors)</li>
                  <li>Responsive on mobile</li>
                  <li>Simple enough to be deployed as a static site</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

