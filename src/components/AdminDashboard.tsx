import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { EssayEditor } from './EssayEditor';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import type { Essay } from '../App';

type AdminDashboardProps = {
  essays: Essay[];
  onAddOrUpdateEssay: (essay: Essay) => void;
  onDeleteEssay: (essayId: string) => void;
  onEssayClick: (essayId: string) => void;
};

export function AdminDashboard({ 
  essays, 
  onAddOrUpdateEssay, 
  onDeleteEssay,
  onEssayClick 
}: AdminDashboardProps) {
  const [editingEssay, setEditingEssay] = useState<Essay | null>(null);
  const [deletingEssayId, setDeletingEssayId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleCreateNew = () => {
    setEditingEssay(null);
    setShowEditor(true);
  };

  const handleEdit = (essay: Essay) => {
    setEditingEssay(essay);
    setShowEditor(true);
  };

  const handleSave = (essay: Essay) => {
    onAddOrUpdateEssay(essay);
    setShowEditor(false);
    setEditingEssay(null);
  };

  const handleDelete = () => {
    if (deletingEssayId) {
      onDeleteEssay(deletingEssayId);
      setDeletingEssayId(null);
    }
  };

  const handleTogglePublish = (essay: Essay) => {
    const updatedEssay = { ...essay, published: !essay.published };
    onAddOrUpdateEssay(updatedEssay);
  };

  if (showEditor) {
    return (
      <EssayEditor
        essay={editingEssay}
        onSave={handleSave}
        onCancel={() => {
          setShowEditor(false);
          setEditingEssay(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-black">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your essays and content
            </p>
          </div>
          
          <Button
            onClick={handleCreateNew}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Essay
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {essays.map(essay => (
            <Card key={essay.id} className="border-2 border-gray-200 hover:border-yellow-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {essay.thumbnail && (
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={essay.thumbnail}
                        alt={essay.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl text-black">
                        {essay.title}
                      </h3>
                      
                      <Badge variant={essay.published ? 'default' : 'secondary'}>
                        {essay.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {essay.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {essay.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline"
                          className="border-yellow-500 text-yellow-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {essay.views} views • Created {new Date(essay.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
                <Button
                  onClick={() => onEssayClick(essay.id)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                
                <Button
                  onClick={() => handleEdit(essay)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                
                <Button
                  onClick={() => handleTogglePublish(essay)}
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white"
                >
                  {essay.published ? (
                    <><EyeOff className="w-4 h-4 mr-2" /> Unpublish</>
                  ) : (
                    <><Eye className="w-4 h-4 mr-2" /> Publish</>
                  )}
                </Button>
                
                <Button
                  onClick={() => setDeletingEssayId(essay.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-700 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {essays.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl mb-4">No essays yet</p>
              <Button
                onClick={handleCreateNew}
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Essay
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingEssayId} onOpenChange={() => setDeletingEssayId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the essay.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
