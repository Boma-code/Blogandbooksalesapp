import { Search } from 'lucide-react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search essays by title or keyword..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-yellow-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-black placeholder-gray-400"
      />
    </div>
  );
}
