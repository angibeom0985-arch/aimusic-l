import React, { useState } from 'react';
import Card from './Card';
import StepIndicator from './StepIndicator';
import Button from './Button';

interface StepGenreProps {
  genres: string[];
  onGenreSelect: (genre: string) => void;
}

const StepGenre: React.FC<StepGenreProps> = ({ genres, onGenreSelect }) => {
  const [customGenre, setCustomGenre] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGenre.trim()) {
      onGenreSelect(customGenre.trim());
    }
  };

  return (
    <Card>
      <StepIndicator currentStep={1} totalSteps={3} stepTitle="어떤 장르를 만들까요?" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreSelect(genre)}
            className="p-4 bg-zinc-800 rounded-lg text-center font-medium hover:bg-zinc-700 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="mt-6 text-center text-zinc-400">
        <p>또는</p>
      </div>
      <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={customGenre}
          onChange={(e) => setCustomGenre(e.target.value)}
          placeholder="직접 장르 입력..."
          className="flex-grow bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
          aria-label="직접 장르 입력"
        />
        <Button type="submit" disabled={!customGenre.trim()}>선택</Button>
      </form>
    </Card>
  );
};

export default StepGenre;