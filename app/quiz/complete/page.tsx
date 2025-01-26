'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircleIcon, ArrowLeftIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function QuizCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId') || '';
  const studentId = searchParams.get('studentId') || '';
  const [quizSummary, setQuizSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCorrectQuestions, setShowCorrectQuestions] = useState(false);
  const [showIncorrectQuestions, setShowIncorrectQuestions] = useState(false);

  useEffect(() => {
    const fetchQuizSummary = async () => {
      try {
        const response = await fetch(`/api/finish-quiz?quizId=${quizId}&studentId=${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch quiz summary');
        const summary = await response.json();
        setQuizSummary(summary);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchQuizSummary();
  }, [quizId, studentId]);

  const handleBackToDashboard = () => {
    router.push(`/studentdashboard?studentId=${studentId}`);
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-4">
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Error: {error}</span>
          </div>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="btn-secondary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!quizSummary) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="card text-center space-y-6">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Quiz Complete!</h1>
          <p className="text-gray-600">You've successfully completed the quiz.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold text-gray-900">{quizSummary.Score}%</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-2xl font-bold text-gray-900">{quizSummary.CorrectAnswers}</p>
              </div>
              <div className="p-4 bg-red-100 rounded-lg">
                <p className="text-sm text-gray-600">Incorrect Answers</p>
                <p className="text-2xl font-bold text-gray-900">{quizSummary.IncorrectAnswers}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">Topic Summary</h3>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-green-400 text-white">
                  <th className="py-2 px-4">Topic</th>
                  <th className="py-2 px-4">Correct</th>
                  <th className="py-2 px-4">Incorrect</th>
                  <th className="py-2 px-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {quizSummary.TopicSummary.map((topic: any, index: number) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4">{topic.TopicName}</td>
                    <td className="py-2 px-4">{topic.CorrectAnswers}</td>
                    <td className="py-2 px-4">{topic.IncorrectAnswers}</td>
                    <td className="py-2 px-4">{topic.ScorePercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-lg font-semibold text-gray-900">Recommendation</h3>
            <p className="text-sm text-gray-600">{quizSummary.Recommendation}</p>

            <div className="space-y-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowCorrectQuestions(!showCorrectQuestions)}
              >
                <h3 className="text-lg font-semibold text-gray-900">Correct Questions</h3>
                {showCorrectQuestions ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5" />
                )}
              </div>
              {showCorrectQuestions && (
                <table className="min-w-full bg-white text-center rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4">Question</th>
                      <th className="py-2 px-4">Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizSummary.CorrectQuestions.map((question: any, index: number) => (
                      <tr key={index}>
                        <td className="py-2 px-4">{question.Question}</td>
                        <td className="py-2 px-4">{question.CorrectAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="space-y-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowIncorrectQuestions(!showIncorrectQuestions)}
              >
                <h3 className="text-lg font-semibold text-gray-900">Incorrect Questions</h3>
                {showIncorrectQuestions ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5" />
                )}
              </div>
              {showIncorrectQuestions && (
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="py-2 px-4">Question</th>
                      <th className="py-2 px-4">Provided Answer</th>
                      <th className="py-2 px-4">Correct Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizSummary.IncorrectQuestions.map((question: any, index: number) => (
                      <tr key={index} className="text-center">
                        <td className="py-2 px-4">{question.Question}</td>
                        <td className="py-2 px-4">{question.ProvidedAnswer}</td>
                        <td className="py-2 px-4">{question.CorrectAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <button
            onClick={handleBackToDashboard}
            className="btn-primary w-full"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
