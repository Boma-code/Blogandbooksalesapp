import { ArrowLeft, Calendar, Eye, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import type { Essay } from '../App';

type EssayDetailProps = {
  essay: Essay;
  onBack: () => void;
};

export function EssayDetail({ essay, onBack }: EssayDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: essay.title,
        text: essay.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (essay.file_url) {
      window.open(essay.file_url, '_blank');
    } else {
      toast.info('No downloadable file available for this essay');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Essays
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Thumbnail */}
        {essay.thumbnail && (
          <div className="relative h-96 rounded-lg overflow-hidden mb-8 border-2 border-yellow-500">
            <img
              src={essay.thumbnail}
              alt={essay.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title and Meta */}
        <div className="mb-8">
          <h1 className="text-5xl mb-6 text-black">
            {essay.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(essay.created_at)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{essay.views} views</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {essay.tags.map(tag => (
              <Badge 
                key={tag}
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-xl text-gray-700 mb-6">
            {essay.description}
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            {essay.file_url && (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-700 prose-a:text-yellow-600 prose-strong:text-black"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />
      </article>
    </div>
  );
}
