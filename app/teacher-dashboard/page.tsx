'use client';

import { useRouter } from 'next/navigation';
import { AcademicCapIcon, BuildingOffice2Icon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen py-12 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your courses and establishments.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/course')}
            className="card flex flex-col items-center justify-center p-6"
          >
            <AcademicCapIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">New Course</span>
          </button>

          <button
            onClick={() => router.push('/course')}
            className="card flex flex-col items-center justify-center p-6"
          >
            <AdjustmentsHorizontalIcon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Change Course</span>
          </button>

          <button
            onClick={() => router.push('/establishment')}
            className="card flex flex-col items-center justify-center p-6"
          >
            <BuildingOffice2Icon className="w-12 h-12 text-blue-600 mb-4" />
            <span className="text-lg font-semibold text-gray-800">Establishment</span>
          </button>
        </div>
      </div>
    </main>
  );
}
