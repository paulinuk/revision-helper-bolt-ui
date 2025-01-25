'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function FlashcardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId') || '';
  const studentId = searchParams.get('studentId') || '';
  const count = Number(searchParams.get('count')) || 1;

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const fetchedCards = [];
        for (let i = 0; i < count; i++) {
          const response = await fetch(`/api/get-next-flashcard?courseId=${courseId}&studentId=${studentId}`);
          if (!response.ok) throw new Error('Failed to fetch flashcard');
          const card = await response.json();
          fetchedCards.push(card);
        }
        setFlashcards(fetchedCards);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchFlashcards();
  }, [courseId, studentId, count]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handleBackToSelection = () => {
    router.push('/');
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-4">
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Error: {error}</span>
          </div>
        </div>
        <button
          onClick={handleBackToSelection}
          className="btn-secondary"
        >
          Back to Selection
        </button>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-4">
          <button
            onClick={handleBackToSelection}
            className="btn-secondary"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Selection
          </button>

          <div className="card-container">
            <div
              className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}
              onClick={handleFlip}
            >
              <div className="card-front">
                <h2 className="card-topic">{currentCard.topic}</h2>
                <p className="text-xl">{currentCard.front}</p>
              </div>
              <div className="card-back">
                <p className="text-xl">{currentCard.back}</p>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600">
            Card {currentCardIndex + 1} of {flashcards.length}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleNextCard}
              className="btn-primary flex-1"
            >
              Next Card
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
