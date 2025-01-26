for 
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function CourseQuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId') || '';
  const studentId = searchParams.get('studentId') || '';
  const questionCount = Number(searchParams.get('questionCount')) || 5;
  const difficultyLevel = Number(searchParams.get('difficultyLevel')) || 1;
  
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [quizName, setQuizName] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
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
          `/api/get-quiz-question?courseId=${courseId}&questionNumber=${questionNumber}&studentId=${studentId}&difficultyLevel=${difficultyLevel}`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch question');
        }

        const data = await response.json();
        setCurrentQuestion(data);
        setQuizName(data.quizName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [courseId, questionNumber, studentId, difficultyLevel]);

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

  const handleNextQuestion = async () => {
    if (questionNumber < questionCount) {
      setQuestionNumber(prev => prev + 1);
      setSelected
