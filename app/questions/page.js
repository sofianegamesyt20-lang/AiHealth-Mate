'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import YesNoToggle from '@/components/YesNoToggle'
import ProgressBar from '@/components/ProgressBar'
import Toast from '@/components/Toast'

export default function QuestionsPage() {
  const [analysisData, setAnalysisData] = useState(null)
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Retrieve analysis data from sessionStorage
    const stored = sessionStorage.getItem('analysisData')
    if (!stored) {
      router.push('/')
      return
    }

    try {
      const data = JSON.parse(stored)
      setAnalysisData(data)
      
      // Initialize answers object
      const initialAnswers = {}
      if (data.questions && Array.isArray(data.questions)) {
        data.questions.forEach((_, index) => {
          initialAnswers[index] = null
        })
      }
      setAnswers(initialAnswers)
    } catch (err) {
      console.error('Failed to parse analysis data:', err)
      router.push('/')
    }
  }, [router])

  const calculateProgress = () => {
    if (!analysisData?.questions) return 0
    const answered = Object.values(answers).filter(val => val !== null).length
    return (answered / analysisData.questions.length) * 100
  }

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value,
    }))
  }

  const handleSubmit = async () => {
    const allAnswered = analysisData?.questions?.every((_, index) => answers[index] !== null)
    
    if (!allAnswered) {
      setError('Please answer all questions before proceeding')
      setShowToast(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisData,
          answers,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      const summaryData = await response.json()
      
      // Store summary data for the summary page
      sessionStorage.setItem('summaryData', JSON.stringify(summaryData))
      
      // Navigate to summary page
      router.push('/summary')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setIsLoading(false)
      setShowToast(true)
    }
  }

  if (!analysisData) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-graphite-gray">Loading...</p>
        </div>
      </Layout>
    )
  }

  const symptoms = Array.isArray(analysisData.symptoms) 
    ? analysisData.symptoms 
    : analysisData.extractedSymptoms || []
  const questions = Array.isArray(analysisData.questions) 
    ? analysisData.questions 
    : []

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Card header="Follow-up Questions" subheader="Answer these questions to help us provide a more accurate analysis.">
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-graphite-gray">Progress</span>
                <span className="font-medium text-deep-space-blue">
                  {Math.round(calculateProgress())}%
                </span>
              </div>
              <ProgressBar progress={calculateProgress()} />
            </div>

            {/* Extracted Symptoms */}
            {symptoms.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-deep-space-blue mb-3">
                  Detected Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-electric-blue/10 text-electric-blue rounded-lg text-sm font-medium"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Questions */}
            <div className="space-y-6">
              {questions.map((question, index) => (
                <YesNoToggle
                  key={index}
                  question={question}
                  value={answers[index]}
                  onChange={(value) => handleAnswerChange(index, value)}
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || Object.values(answers).some(val => val === null)}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Generating Summary...' : 'Generate Summary'}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Toast 
        message={error || 'Please answer all questions'}
        isVisible={showToast && !!error}
        onClose={() => setShowToast(false)}
      />
    </Layout>
  )
}

