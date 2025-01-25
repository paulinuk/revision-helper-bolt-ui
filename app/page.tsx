'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Revision Helper</h1>
      
      <div className="space-y-4 max-w-md">
        <select
          value={selectedEstablishment}
          onChange={(e) => {
            setSelectedEstablishment(e.target.value);
            setSelectedCourse('');
            setSelectedQuiz('');
            fetchCourses(e.target.value);
          }}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Establishment</option>
          {establishments.map((est) => (
            <option key={est.id} value={est.id}>{est.name}</option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedQuiz('');
            fetchQuizzes(e.target.value);
          }}
          className="p-2 border rounded w-full"
          disabled={!selectedEstablishment}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>

        <select
          value={selectedQuiz}
          onChange={(e) => setSelectedQuiz(e.target.value)}
          className="p-2 border rounded w-full"
          disabled={!selectedCourse}
        >
          <option value="">Select Quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>{quiz.name}</option>
          ))}
        </select>

        <button
          onClick={handleTakeQuiz}
          disabled={!selectedQuiz}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Take Quiz
        </button>
      </div>
    </main>
  );
}
