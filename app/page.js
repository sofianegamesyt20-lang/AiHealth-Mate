'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Toast from '@/components/Toast'

export default function DescribeProblemPage() {
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!description.trim()) {
      setError('Please describe your symptoms')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms')
      }

      const data = await response.json()
      
      // Store the analysis data in sessionStorage for the next page
      sessionStorage.setItem('analysisData', JSON.stringify(data))
      
      // Navigate to questions page
      router.push('/questions')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setIsLoading(false)
      setShowToast(true)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-deep-space-blue mb-4">
            HealthMate AI
          </h1>
          <p className="text-lg text-graphite-gray">
            Get AI-powered insights about your symptoms
          </p>
        </div>

        {/* Main Form Section */}
        <Card header="Describe what's wrong" subheader="Tell us about your symptoms, and we'll help you understand what might be happening.">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="description" 
                className="block text-sm font-medium text-deep-space-blue mb-2"
              >
                Symptoms Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  setError(null)
                }}
                placeholder="Example: I've been experiencing headaches for the past 3 days, along with nausea and sensitivity to light..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-electric-blue focus:outline-none focus-visible-ring resize-none text-base"
                aria-describedby={error ? 'error-message' : undefined}
                aria-invalid={error ? 'true' : 'false'}
                disabled={isLoading}
              />
              {error && (
                <p id="error-message" className="mt-2 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !description.trim()}
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
            </Button>
          </form>
        </Card>

        {/* About Section */}
        <div className="mt-16 space-y-6">
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
            </div>
          </Card>
        </div>
      </div>

      <Toast 
        message={error || 'Something went wrong. Please try again.'}
        isVisible={showToast && !!error}
        onClose={() => setShowToast(false)}
      />
    </Layout>
  )
}

