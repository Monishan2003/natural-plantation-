import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'Sri Lanka'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
        country: user.address?.country || 'Sri Lanka'
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.firstName || !formData.lastName) {
      setError('First name and last name are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined,
        address: formData.street ? {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        } : undefined
      });

      if (result.success) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          setSuccess('');
          onClose();
        }, 2000);
      } else {
        setError(result.error || 'Profile update failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--primary-green)' }}>
            Profile Settings
          </DialogTitle>
          <DialogDescription>
            Update your personal information and address details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={user.email}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-input-background"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-input-background"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+94 74 268 4140"
              value={formData.phone}
              onChange={handleChange}
              className="bg-input-background"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Address Information</h4>
            
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                placeholder="99JG+4Q9 Karadipok"
                value={formData.street}
                onChange={handleChange}
                className="bg-input-background"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Kilinochchi"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="44000"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="bg-input-background"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="bg-input-background"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1" 
              style={{ backgroundColor: 'var(--primary-green)' }}
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};