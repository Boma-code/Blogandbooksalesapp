import { useState } from 'react';
import { EssayCard } from './EssayCard';
import { SearchBar } from './SearchBar';
import { NewsletterForm } from './NewsletterForm';
import type { Essay } from '../App';

type HomePageProps = {
  essays: Essay[];
  onEssayClick: (essayId: string) => void;
};

export function HomePage({ essays, onEssayClick }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(essays.flatMap(essay => essay.tags)));

  // Filter essays based on search and tag
  const filteredEssays = essays.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         essay.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || essay.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl mb-6 text-white">
            Thoughts on Africa, Power & Progress
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Exploring the intersection of culture, economics, and innovation across the African continent
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full transition-all ${
                  !selectedTag
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-500'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedTag === tag
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Essays Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEssays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEssays.map(essay => (
              <EssayCard
                key={essay.id}
                essay={essay}
                onClick={() => onEssayClick(essay.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No essays found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-yellow-900 to-black py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
