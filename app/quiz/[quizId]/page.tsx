'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const quizId = params.quizId as string;
  const studentId = searchParams.get('studentId') || '';
  
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [quizName, setQuizName] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState({
    isCorrect: null,
    correctAnswer: null
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/get-quiz-question?quizId=${quizId}&questionNumber=${questionNumber}&studentId=${studentId}`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch question');
        }

        const data = await response.json();
        setCurrentQuestion(data);
        setQuizName(data.quizName);
        setTotalQuestions(data.totalQuestions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [quizId, questionNumber, studentId]);

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || hasSubmitted || !currentQuestion) return;

    try {
      setHasSubmitted(true);
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;
      const newScore = Math.round((newCorrectAnswers / questionNumber) * 100);

      setQuizScore(newScore);
      setCorrectAnswers(newCorrectAnswers);
      setAnswerStatus({
        isCorrect,
        correctAnswer: currentQuestion.correctAnswer
      });

      setFeedback(
        isCorrect 
          ? 'Correct! Great job!' 
          : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`
      );
    } catch (err: any) {
      setError(err.message);
      setHasSubmitted(false);
    }
  };

  const handleNextQuestion = () => {
    if (questionNumber < totalQuestions) {
      setQuestionNumber(prev => prev + 1);
      setSelectedAnswer('');
      setFeedback('');
      setHasSubmitted(false);
      setAnswerStatus({ isCorrect: null, correctAnswer: null });
    } else {
      const quizResults = {
        score: quizScore,
        correctAnswers: correctAnswers,
        totalQuestions: totalQuestions,
        quizName: quizName,
        studentId: studentId
      };
      localStorage.setItem('quizResults', JSON.stringify(quizResults));
      router.push(`/quiz/complete?studentId=${studentId}`);
    }
  };

  const handleBackToSelection = () => {
    router.push('/');
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-4">
          <div className="flex items-center gap-2">
            <XCircleIcon className="w-5 h-5" />
            <span>Error: {error}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setError(null)}
            className="btn-primary"
          >
            Try Again
          </button>
          <button
            onClick={handleBackToSelection}
            className="btn-secondary"
          >
            Back to Selection
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{quizName}</h1>
              <div className="text-sm text-gray-600">
                Question {questionNumber} of {totalQuestions}
              </div>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="space-y-6">
              <div>
                {currentQuestion?.topic && (
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {currentQuestion.topic}
                  </p>
                )}
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentQuestion?.text}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion?.options?.map((option: string, index: number) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      answerStatus.correctAnswer === option 
                        ? 'bg-green-50 border-green-500' 
                        : selectedAnswer === option && !answerStatus.isCorrect
                          ? 'bg-red-50 border-red-500'
                          : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => !hasSubmitted && setSelectedAnswer(e.target.value)}
                      className="accent-blue-600"
                      disabled={hasSubmitted}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className={`card ${answerStatus.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3">
                {answerStatus.isCorrect ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                )}
                <p className="text-sm">{feedback}</p>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Current Score: {quizScore}%
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer || hasSubmitted}
              className="btn-primary flex-1"
            >
              {hasSubmitted ? 'Submitted' : 'Submit Answer'}
            </button>

            {feedback && (
              <button
                onClick={handleNextQuestion}
                className="btn-primary flex-1"
              >
                {questionNumber < totalQuestions ? 'Next Question' : 'Finish Quiz'}
                <PlayIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
