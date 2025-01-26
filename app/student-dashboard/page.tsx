'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AcademicCapIcon, ClipboardDocumentListIcon, BookOpenIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function StudentDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    // Simulated data for students
    const data = [
      { id: '121', name: 'Alice Smith' },
      { id: '122', name: 'Bob Johnson' },
      { id: '123', name: 'Charlie Brown' },
    ];
    setStudents(data);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse('');
  };

  const handleGoToFlashcards = () => {
    if (selectedCourse) {
      router.push(`/flashcards?courseId=${selectedCourse}&studentId=${selectedStudent}&count=5`);
    }
  };

  const handleSelectStudent = () => {
    setSelectedStudent('');
  };

  if (!selectedStudent) {
    return (
      <main className="min-h-screen py-12 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Select Student</h1>
            <p className="text-gray-600">Please select a student to view the dashboard.</p>
          </div>
          <div className="card p-6">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="select-input w-full"
            >
              <option value="">Choose a student...</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
        </div>
      </main>
    );
  }

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
            onClick={() => router.push(`/quiz-history?studentId=${selectedStudent}`)}
            className="card flex flex-col items-center justify-center p-6"
          >
            <BookOpenIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Quiz History</span>
          </button>

          <button
            onClick={() => router.push(`/course-feedback?studentId=${selectedStudent}`)}
            className="card flex flex-col items-center justify-center p-6"
          >
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Course Feedback</span>
          </button>

          <button
            onClick={() => router.push(`/take-quiz?studentId=${selectedStudent}`)}
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
                {/* Simulated course data */}
                <option value="1">Mathematics</option>
                <option value="2">Physics</option>
                <option value="3">Business Studies</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleGoToFlashcards}
                  className="btn-primary flex-1"
                  disabled={!selectedCourse}
                >
                  Go
                </button>
                <button
                  onClick={handleCloseModal}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSelectStudent}
          className="btn-secondary w-full"
        >
          Select Another Student
        </button>
      </div>
    </main>
  );
}
