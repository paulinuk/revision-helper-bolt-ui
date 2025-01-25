'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId;
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizName, setQuizName] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions] = useState(10);
  const [quizScore, setQuizScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState({
    isCorrect: null,
    correctAnswer: null
  });
  const studentId = '123'; // Replace with actual student ID

  const answeredQuestions = questionNumber - 1;

  const getAnswerStyle = (option) => {
    if (!hasSubmitted) return '';
    
    // Always highlight correct answer in green
    if (option === answerStatus.correctAnswer) {
      return 'bg-green-100 border-green-500';
    }
    
    // Only highlight selected answer in red if it's incorrect
    if (option === selectedAnswer && !answerStatus.isCorrect) {
      return 'bg-red-100 border-red-500';
    }
    
    return '';
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || hasSubmitted || !currentQuestion) return;

    try {
      setHasSubmitted(true);
      const response = await fetch('/api/submit-question-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          studentId: studentId,
          answer: selectedAnswer,
          currentScore: quizScore,
          correctAnswers: correctAnswers,
          questionNumber: questionNumber
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit answer');
      }

      setFeedback(data.feedback);
      setQuizScore(data.quizScore);
      setAnswerStatus({
        isCorrect: data.answerIsCorrect,
        correctAnswer: data.correctAnswer
      });
      
      if (data.answerIsCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    } catch (err) {
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
      router.push('/');
    }
  };

  const handleBackToSelection = () => {
    router.push('/');
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      setError(null);
      setHasSubmitted(false);
      setAnswerStatus({ isCorrect: null, correctAnswer: null });
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
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [quizId, questionNumber, studentId]);

  if (error) {
    return (
      <div className="p-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => setError(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Try Again
        </button>
        <button
          onClick={handleBackToSelection}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to Quiz Selection
        </button>
      </div>
    );
  }

  if (isLoading || !currentQuestion) {
    return <div className="p-8">Loading question...</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">{quizName}</h1>
      
      <div className="max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="text-sm text-gray-600">
            {answeredQuestions > 0 && (
              <>
                Score: {quizScore}%
              </>
            )}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Question {questionNumber}</h2>
          {currentQuestion?.topic && (
            <p className="italic text-gray-600 mb-2">{currentQuestion.topic}</p>
          )}
          <p className="mb-4">{currentQuestion?.text}</p>
          
          <div className="space-y-2">
            {currentQuestion?.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center space-x-2 p-2 border rounded ${getAnswerStyle(option)}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => !hasSubmitted && setSelectedAnswer(e.target.value)}
                  className="accent-blue-500"
                  disabled={hasSubmitted}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm">{feedback}</p>
            <p className="text-sm mt-2">Your current score: {quizScore}%</p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || hasSubmitted}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {hasSubmitted ? 'Submitted' : 'Submit Answer'}
          </button>

          {feedback && (
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {questionNumber < totalQuestions ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>

        <button
          onClick={handleBackToSelection}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to Quiz Selection
        </button>
      </div>
    </main>
  );
}
