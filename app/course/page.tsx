'use client';

import { useState } from 'react';

export default function CoursePage() {
  const [selectedEstablishment, setSelectedEstablishment] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [overview, setOverview] = useState<string>('');
  const [materials, setMaterials] = useState<any[]>([
    { id: '1', name: 'Algebra Textbook', approved: true },
    { id: '2', name: 'Physics Notes', approved: false },
  ]); // Sample data

  const establishments = [
    { id: '1', name: 'University A' },
    { id: '2', name: 'College B' },
  ]; // Sample data

  const handleAddMaterial = () => {
    // Logic to add material
  };

  const handleApproveMaterial = (id: string) => {
    setMaterials(materials.map(material => material.id === id ? { ...material, approved: true } : material));
  };

  const handleGenerateOverview = () => {
    // Logic to generate overview
  };

  const handleApproveOverview = () => {
    // Logic to approve overview
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage your course details and materials.</p>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Establishment</label>
              <select
                value={selectedEstablishment}
                onChange={(e) => setSelectedEstablishment(e.target.value)}
                className="select-input w-full"
              >
                <option value="">Choose your establishment...</option>
                {establishments.map((est) => (
                  <option key={est.id} value={est.id}>{est.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="select-input w-full"
                placeholder="Enter course name"
                required
              />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Materials</h2>
            <table className="min-w-full bg-white rounded-lg shadow-md mb-4">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-green-400 text-white">
                  <th className="py-2 px-4">Material Name</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id} className="text-center">
                    <td className="py-2 px-4">{material.name}</td>
                    <td className="py-2 px-4">{material.approved ? 'Approved' : 'Pending'}</td>
                    <td className="py-2 px-4">
                      {!material.approved && (
                        <button
                          onClick={() => handleApproveMaterial(material.id)}
                          className="btn-primary"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddMaterial}
              className="btn-primary mb-4"
            >
              Add Material
            </button>
          </div>

          <div className="card p-6">
            <button
              onClick={handleGenerateOverview}
              className="btn-primary mb-4"
            >
              Generate Overview
            </button>
            <div className="relative">
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="select-input w-full h-32"
                placeholder="Course overview..."
              />
              <button
                onClick={handleApproveOverview}
                className="btn-primary absolute top-2 right-2"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
