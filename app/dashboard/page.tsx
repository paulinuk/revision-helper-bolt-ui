'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AcademicCapIcon, ClipboardDocumentListIcon, BookOpenIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const studentId: string = '121'; // Hardcoded student ID

  const courses = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Physics' },
    { id: '3', name: 'Business Studies' },
  ]; // Simulated data

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse('');
  };

  const handleGoToFlashcards = () => {
    if (selectedCourse) {
      router.push(`/flashcards?courseId=${selectedCourse}&studentId=${studentId}&count=5`);
    }
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome to your dashboard. Select an option to proceed.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={handleOpenModal}
            className="card flex flex-col items-center justify-center p-6"
          >
            <ClipboardDocumentListIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Flashcards</span>
          </button>

          <button
            onClick={() => router.push('/quiz-history')}
            className="card flex flex-col items-center justify-center p-6"
          >
            <BookOpenIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Quiz History</span>
          </button>

          <button
            onClick={() => router.push('/course-feedback')}
            className="card flex flex-col items-center justify-center p-6"
          >
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Course Feedback</span>
          </button>

          <button
            onClick={() => router.push('/take-quiz')}
            className="card flex flex-col items-center justify-center p-6"
          >
            <AcademicCapIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Take Quiz</span>
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Course</h2>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="select-input w-full mb-4"
              >
                <option value="">Choose your course...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGoToFlashcards}
                  className="btn-primary"
                  disabled={!selectedCourse}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
