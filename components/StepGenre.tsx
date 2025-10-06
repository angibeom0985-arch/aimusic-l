import React, { useState } from "react";
import Card from "./Card";
import StepIndicator from "./StepIndicator";
import Button from "./Button";

interface StepGenreProps {
  genres: string[];
  onGenreSelect: (genre: string) => void;
}

const StepGenre: React.FC<StepGenreProps> = ({ genres, onGenreSelect }) => {
  const [customGenre, setCustomGenre] = useState("");

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGenre.trim()) {
      onGenreSelect(customGenre.trim());
    }
  };

  return (
    <Card>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        어떤 장르를 만들까요?
      </h2>
      <p className="text-zinc-400 text-center mb-6">
        원하는 음악 장르를 선택하세요
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {genres.map((genre, index) => {
          const colors = [
            "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
            "from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700",
            "from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700",
            "from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700",
            "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
            "from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
            "from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700",
            "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
          ];
          return (
            <button
              key={genre}
              onClick={() => onGenreSelect(genre)}
              className={`p-4 bg-gradient-to-r ${
                colors[index % colors.length]
              } rounded-lg text-center font-medium hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-zinc-900 shadow-md hover:shadow-lg`}
            >
              {genre}
            </button>
          );
        })}
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
        <Button
          type="submit"
          disabled={!customGenre.trim()}
          className="whitespace-nowrap"
        >
          선택
        </Button>
      </form>
    </Card>
  );
};

export default StepGenre;
