'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Toast from '@/components/Toast'

export default function SummaryPage() {
  const [summaryData, setSummaryData] = useState(null)
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Retrieve summary data from sessionStorage
    const stored = sessionStorage.getItem('summaryData')
    if (!stored) {
      router.push('/')
      return
    }

    try {
      const data = JSON.parse(stored)
      setSummaryData(data)
    } catch (err) {
      console.error('Failed to parse summary data:', err)
      router.push('/')
    }
  }, [router])

  const handleSendEmail = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setToastMessage('Please enter a valid email address')
      setShowToast(true)
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          summaryData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      setToastMessage('Summary sent successfully!')
      setShowToast(true)
      setEmail('')
    } catch (err) {
      setToastMessage(err.message || 'Failed to send email. Please try again.')
      setShowToast(true)
    } finally {
      setIsSending(false)
    }
  }

  if (!summaryData) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-graphite-gray">Loading...</p>
        </div>
      </Layout>
    )
  }

  const summary = summaryData.summary || 'No summary available.'
  const possibleCauses = summaryData.possibleCauses || []
  const recommendation = summaryData.recommendation || 'Please consult with a healthcare professional for personalized advice.'

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <Card header="AI Analysis Summary">
              <div className="prose prose-blue max-w-none">
                <p className="text-base text-graphite-gray leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </Card>

            {/* Possible Causes Card */}
            {possibleCauses.length > 0 && (
              <Card header="Possible Causes" subheader="Based on your symptoms and answers, these conditions may be relevant:">
                <ul className="space-y-3">
                  {possibleCauses.map((cause, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 text-base text-graphite-gray"
                    >
                      <span className="text-electric-blue font-bold mt-1">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Recommendation Card */}
            <Card header="Recommendation">
              <p className="text-base text-graphite-gray leading-relaxed">
                {recommendation}
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card header="Email Summary" subheader="Receive a copy of this analysis via email.">
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-deep-space-blue mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-electric-blue focus:outline-none focus-visible-ring text-base"
                    required
                    disabled={isSending}
                    aria-label="Email address for receiving summary"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSending || !email.trim()}
                  className="w-full"
                >
                  {isSending ? 'Sending...' : 'Send Summary'}
                </Button>
              </form>
            </Card>

            <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-semibold text-deep-space-blue mb-2">
                Important Notice
              </h3>
              <p className="text-sm text-graphite-gray leading-relaxed">
                This analysis is for informational purposes only and should not replace professional medical advice. Please consult with a qualified healthcare provider for diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline"
            onClick={() => router.push('/')}
          >
            Start New Analysis
          </Button>
        </div>
      </div>

      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </Layout>
  )
}

