import { Home, Search } from 'lucide-react';
import { Button } from './ui/button';

type NotFoundProps = {
  onGoHome: () => void;
};

export function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl text-yellow-500 mb-4">
            404
          </h1>
          <h2 className="text-4xl text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            The essay or page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onGoHome}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          
          <Button
            onClick={onGoHome}
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Essays
          </Button>
        </div>

        <div className="mt-12 text-gray-400 text-sm">
          <p>Need help? Contact karimicolin254@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
