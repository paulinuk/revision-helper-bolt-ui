'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingOffice2Icon, AcademicCapIcon, BookOpenIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const router = useRouter();
  const [establishments, setEstablishments] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const fetchEstablishments = async () => {
    const response = await fetch('/api/establishments');
    const data = await response.json();
    setEstablishments(data);
  };

  const fetchCourses = async (establishmentId: string) => {
    const response = await fetch(`/api/courses?establishmentId=${establishmentId}`);
    const data = await response.json();
    setCourses(data);
  };

  const fetchQuizzes = async (courseId: string) => {
    const response = await fetch(`/api/quizzes?courseId=${courseId}`);
    const data = await response.json();
    setQuizzes(data);
  };

  const handleTakeQuiz = () => {
    router.push(`/quiz/${selectedQuiz}`);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Revision Helper</h1>
          <p className="text-gray-600">Select your institution and course to begin your revision</p>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <BuildingOffice2Icon className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Select Institution</h2>
            </div>
            <select
              value={selectedEstablishment}
              onChange={(e) => {
                setSelectedEstablishment(e.target.value);
                setSelectedCourse('');
                setSelectedQuiz('');
                fetchCourses(e.target.value);
              }}
              className="select-input"
            >
              <option value="">Choose your institution...</option>
              {establishments.map((est) => (
                <option key={est.id} value={est.id}>{est.name}</option>
              ))}
            </select>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Select Course</h2>
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedQuiz('');
                fetchQuizzes(e.target.value);
              }}
              className="select-input"
              disabled={!selectedEstablishment}
            >
              <option value="">Choose your course...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Select Quiz</h2>
            </div>
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="select-input"
              disabled={!selectedCourse}
            >
              <option value="">Choose a quiz...</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>{quiz.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleTakeQuiz}
            disabled={!selectedQuiz}
            className="btn-primary w-full"
          >
            <PlayCircleIcon className="w-5 h-5" />
            Start Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
