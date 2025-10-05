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
            "from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 border-orange-500/30",
            "from-rose-900 to-pink-800 hover:from-rose-800 hover:to-pink-700 border-pink-500/30",
            "from-orange-900 to-red-900 hover:from-orange-800 hover:to-red-800 border-orange-500/30",
            "from-teal-900 to-cyan-900 hover:from-teal-800 hover:to-cyan-800 border-cyan-500/30",
            "from-indigo-900 to-blue-900 hover:from-indigo-800 hover:to-blue-800 border-blue-500/30",
            "from-purple-900 to-violet-900 hover:from-purple-800 hover:to-violet-800 border-purple-500/30",
            "from-amber-900 to-orange-900 hover:from-amber-800 hover:to-orange-800 border-amber-500/30",
            "from-pink-900 to-rose-900 hover:from-pink-800 hover:to-rose-800 border-pink-500/30",
          ];
          return (
            <button
              key={genre}
              onClick={() => onGenreSelect(genre)}
              className={`p-4 bg-gradient-to-br ${
                colors[index % colors.length]
              } border rounded-lg text-center font-medium hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-orange-500/30 hover:shadow-xl`}
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
          className="flex-grow bg-slate-800 border border-orange-500/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full text-slate-200 placeholder:text-slate-400"
          aria-label="직접 장르 입력"
        />
        <Button type="submit" disabled={!customGenre.trim()}>
          선택
        </Button>
      </form>
    </Card>
  );
};

export default StepGenre;
