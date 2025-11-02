import { useState, useRef } from 'react';
import { Save, X, Upload, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import type { Essay } from '../App';
import { toast } from 'sonner@2.0.3';
import { uploadFile } from '../utils/api';

type EssayEditorProps = {
  essay: Essay | null;
  onSave: (essay: Essay) => void;
  onCancel: () => void;
};

export function EssayEditor({ essay, onSave, onCancel }: EssayEditorProps) {
  const [title, setTitle] = useState(essay?.title || '');
  const [description, setDescription] = useState(essay?.description || '');
  const [content, setContent] = useState(essay?.content || '');
  const [thumbnail, setThumbnail] = useState(essay?.thumbnail || '');
  const [tags, setTags] = useState<string[]>(essay?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [fileUrl, setFileUrl] = useState(essay?.file_url || '');
  const [published, setPublished] = useState(essay?.published ?? false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'essay');
        setFileUrl(url);
        toast.success('File uploaded successfully!');
      } catch (error: any) {
        toast.error(error.message || 'Failed to upload file');
      }
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'thumbnail');
        setThumbnail(url);
        toast.success('Thumbnail uploaded successfully!');
      } catch (error: any) {
        toast.error(error.message || 'Failed to upload thumbnail');
      }
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }

    const now = new Date().toISOString();
    const savedEssay: Essay = {
      id: essay?.id || Date.now().toString(),
      title,
      description,
      content,
      thumbnail,
      file_url: fileUrl,
      tags,
      views: essay?.views || 0,
      created_at: essay?.created_at || now,
      updated_at: now,
      published
    };

    onSave(savedEssay);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-black">
            {essay ? 'Edit Essay' : 'Create New Essay'}
          </h1>
          
          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              variant="outline"
              className="border-gray-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            
            <Button
              onClick={handleSave}
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Essay
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter essay title"
                className="mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description (shown on cards)"
                className="mt-2 h-24"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <Label>Thumbnail Image</Label>
              <div className="mt-2 flex gap-3">
                <Input
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="Enter image URL or upload"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => thumbnailInputRef.current?.click()}
                  variant="outline"
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </div>
              {thumbnail && (
                <div className="mt-4 w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={thumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tags (press Enter)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="outline"
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
                >
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      className="bg-yellow-500 text-black cursor-pointer hover:bg-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ✕
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <Label>Content *</Label>
              <Tabs defaultValue="editor" className="mt-2">
                <TabsList>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="mt-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your essay content here. You can use HTML tags for formatting."
                    className="min-h-[400px] font-mono"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt; for formatting
                  </p>
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="border border-gray-300 rounded-lg p-6 min-h-[400px] bg-white">
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-700"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* File Upload */}
            <div>
              <Label>Attach File (Optional)</Label>
              <p className="text-sm text-gray-500 mb-2">
                Upload PDF, DOCX, or TXT file for download
              </p>
              <div className="flex gap-3">
                <Input
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="File URL"
                  className="flex-1"
                  readOnly
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              {fileUrl && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <FileText className="w-4 h-4" />
                  File attached: {fileUrl}
                </div>
              )}
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
