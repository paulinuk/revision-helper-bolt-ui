'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function QuizCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId') || '';

  // Get quiz results from localStorage
  const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');

  const handleBackToSelection = () => {
    router.push(`/?studentId=${studentId}`);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-4">
          <button
            onClick={handleBackToSelection}
            className="btn-secondary"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Selection
          </button>

          <div className="card text-center space-y-6">
            <div className="space-y-4">
              <CheckCircleIcon className="w-16 h-16 mx-auto text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Quiz Complete!
              </h1>
              <p className="text-gray-600">
                You've successfully completed the quiz.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {quizResults.score}%
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Correct Answers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {quizResults.correctAnswers}/{quizResults.totalQuestions}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Quiz Name</p>
                <p className="text-xl font-semibold text-gray-900">
                  {quizResults.quizName}
                </p>
              </div>
            </div>

            <button
              onClick={handleBackToSelection}
              className="btn-primary w-full"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
