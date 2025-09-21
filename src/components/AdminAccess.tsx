import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { AdminDashboard } from './admin/AdminDashboard';
import { Settings } from 'lucide-react';

export const AdminAccess: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (in production, this would be properly secured)
    if (password === 'admin123') {
      setShowDashboard(true);
      setIsOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  if (showDashboard) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Natural Plantation - Admin Panel</h1>
          <Button 
            variant="outline" 
            onClick={() => setShowDashboard(false)}
          >
            Back to Site
          </Button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95"
        >
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
          <DialogDescription>
            Enter admin credentials to access the dashboard
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleAdminAccess} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="admin-password">Admin Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="bg-input-background"
            />
            <p className="text-xs text-muted-foreground">
              Demo password: admin123
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              type="submit" 
              className="flex-1 bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90"
            >
              Access Dashboard
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsOpen(false);
                setPassword('');
                setError('');
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};