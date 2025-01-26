'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AcademicCapIcon, ClipboardDocumentListIcon, BookOpenIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Student {
  id: string;
  name: string;
  abilityLevel: number;
}

interface Course {
  id: string;
  name: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficultyLevel, setDifficultyLevel] = useState<number>(1);
  const [studentAbilityLevel, setStudentAbilityLevel] = useState<number>(1);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicSelection, setTopicSelection] = useState<'all' | 'specific'>('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    // Simulated data for students
    const data: Student[] = [
      { id: '121', name: 'Alice Smith', abilityLevel: 3 },
      { id: '122', name: 'Bob Johnson', abilityLevel: 2 },
      { id: '123', name: 'Charlie Brown', abilityLevel: 4 },
    ];
    setStudents(data);
  };

  const fetchCourses = async (studentId: string) => {
    // Simulated data for courses
    const data: Course[] = [
      { id: '1', name: 'Mathematics' },
      { id: '2', name: 'Physics' },
      { id: '3', name: 'Business Studies' },
    ];
    setCourses(data);

    // Set the student's ability level based on the selected student
    const student = students.find(s => s.id === studentId);
    if (student) {
      setStudentAbilityLevel(student.abilityLevel);
      setDifficultyLevel(student.abilityLevel); // Default to student's ability level
    }
  };

  const fetchTopics = async (courseId: string) => {
    try {
      const response = await fetch(`https://external-api.com/api/get-topics-for-course?courseId=${courseId}`);
      const data: string[] = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    fetchCourses(selectedStudent);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse('');
  };

  const handleOpenTopicModal = () => {
    setIsTopicModalOpen(true);
    fetchTopics(selectedCourse);
  };

  const handleCloseTopicModal = () => {
    setIsTopicModalOpen(false);
    setSelectedTopics([]);
    setTopicSelection('all');
  };

  const handleGoToFlashcards = () => {
    if (selectedCourse) {
      router.push(`/flashcards?courseId=${selectedCourse}&studentId=${selectedStudent}&count=5`);
    }
  };

  const handleSetupQuiz = () => {
    if (selectedCourse && questionCount >= 5) {
      handleOpenTopicModal();
    }
  };

  const handleConfirmTopics = () => {
    const topicsToPass = topicSelection === 'all' ? [] : selectedTopics;
    router.push(`/course-quiz/${selectedCourse}?studentId=${selectedStudent}&questionCount=${questionCount}&difficultyLevel=${difficultyLevel}&topicSelectionMethod=${topicSelection}&selectedTopics=${JSON.stringify(topicsToPass)}`);
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
            onClick={handleOpenModal}
            className="card flex flex-col items-center justify-center p-6"
          >
            <AcademicCapIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Take Quiz</span>
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Setup Quiz</h2>
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
              <input
                type="number"
                min="5"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="select-input w-full mb-4"
                placeholder="Number of Questions"
              />
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                className="select-input w-full mb-4"
              >
                <option value="">Select Difficulty Level...</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1} disabled={i + 1 < studentAbilityLevel}>
                    Level {i + 1}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleGoToFlashcards}
                  className="btn-primary flex-1"
                  disabled={!selectedCourse}
                >
                  Go to Flashcards
                </button>
                <button
                  onClick={handleSetupQuiz}
                  className="btn-primary flex-1"
                  disabled={!selectedCourse || questionCount < 5 || difficultyLevel < studentAbilityLevel}
                >
                  Setup Quiz
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

        {isTopicModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Topics</h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="topicSelection"
                    value="all"
                    checked={topicSelection === 'all'}
                    onChange={() => setTopicSelection('all')}
                    className="mr-2"
                  />
                  All Topics
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="topicSelection"
                    value="specific"
                    checked={topicSelection === 'specific'}
                    onChange={() => setTopicSelection('specific')}
                    className="mr-2"
                  />
                  Specific Topics
                </label>
              </div>
              <table className="min-w-full bg-white rounded-lg shadow-md mb-4">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-green-400 text-white">
                    <th className="py-2 px-4">Select</th>
                    <th className="py-2 px-4">Topic Name</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.sort().map((topic) => (
                    <tr key={topic} className="text-center">
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          disabled={topicSelection === 'all'}
                          checked={selectedTopics.includes(topic)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTopics([...selectedTopics, topic]);
                            } else {
                              setSelectedTopics(selectedTopics.filter(t => t !== topic));
                            }
                          }}
                        />
                      </td>
                      <td className="py-2 px-4">{topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleConfirmTopics}
                  className="btn-primary flex-1"
                >
                  OK
                </button>
                <button
                  onClick={handleCloseTopicModal}
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
