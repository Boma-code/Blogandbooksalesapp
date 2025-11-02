import { Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/karimicolin254"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:karimicolin254@gmail.com"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Colin Stanley | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
