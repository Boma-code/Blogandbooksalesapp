import { Calendar, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import type { Essay } from '../App';

type EssayCardProps = {
  essay: Essay;
  onClick: () => void;
};

export function EssayCard({ essay, onClick }: EssayCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-yellow-500"
      onClick={onClick}
    >
      {essay.thumbnail && (
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={essay.thumbnail}
            alt={essay.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <CardContent className="p-6">
        <h3 className="text-2xl mb-3 text-black group-hover:text-yellow-600 transition-colors">
          {essay.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {essay.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {essay.tags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline"
              className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(essay.created_at)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{essay.views} views</span>
        </div>
      </CardFooter>
    </Card>
  );
}
