'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingOffice2Icon, AcademicCapIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { API_BASE_URL } from './config';

export default function Home() {
  const router = useRouter();
  const [establishments, setEstablishments] = useState<any[]>([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState<string>('');
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [flashcardCount, setFlashcardCount] = useState<number>(1);
  const studentId: string = '121'; // Hardcoded student ID

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const fetchEstablishments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/establishments`);
      if (!response.ok) throw new Error('Failed to fetch establishments');
      const data = await response.json();
      setEstablishments(data);
    } catch (error) {
      console.error('Error fetching establishments:', error);
    }
  };

  const fetchCourses = async (establishmentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses?establishmentId=${establishmentId}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleStartFlashcardSession = () => {
    if (flashcardCount > 0 && flashcardCount <= 5) {
      router.push(`/flashcards?courseId=${selectedCourse}&studentId=${studentId}&count=${flashcardCount}`);
    }
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Revision Helper</h1>
          <p className="text-gray-600">Select your institution and course to begin your revision</p>
        </div>

        <div className="space-y-6">
          {/* Institution Selection */}
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
                fetchCourses(e.target.value);
              }}
              className="select-input"
            >
              <option value="">Choose your institution...</option>
              {establishments.map((est: any) => (
                <option key={est.id} value={est.id}>{est.name}</option>
              ))}
            </select>
          </div>

          {/* Course Selection */}
          {selectedEstablishment && (
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Select Course</h2>
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                }}
                className="select-input"
              >
                <option value="">Choose your course...</option>
                {courses.map((course: any) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Flashcard Session */}
          {selectedCourse && (
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Flash Card Session</h2>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={flashcardCount}
                  onChange={(e) => setFlashcardCount(Number(e.target.value))}
                  className="select-input w-20"
                />
                <button
                  onClick={handleStartFlashcardSession}
                  className="btn-primary flex-1"
                >
                  Start
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
