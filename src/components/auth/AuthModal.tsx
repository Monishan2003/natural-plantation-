import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { VisuallyHidden } from '../ui/visually-hidden';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const handleClose = () => {
    onClose();
    // Reset to login mode when modal closes
    setTimeout(() => setMode('login'), 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>
            {mode === 'login' ? 'Login to your account' : 'Create a new account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' 
              ? 'Enter your credentials to access Natural Plantation' 
              : 'Fill in your details to join Natural Plantation'
            }
          </DialogDescription>
        </VisuallyHidden>
        {mode === 'login' ? (
          <LoginForm 
            onSwitchToRegister={() => setMode('register')}
            onClose={handleClose}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={() => setMode('login')}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};