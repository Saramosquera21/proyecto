import { useState, useEffect } from 'react';

export const useUserPhoto = () => {
  const [userPhoto, setUserPhotoState] = useState<string | null>(null);

  // Cargar foto al montar
  useEffect(() => {
    loadUserPhoto();
  }, []);

  const loadUserPhoto = () => {
    const userId = localStorage.getItem('current_user_id') || 'current_user';
    const savedPhoto = localStorage.getItem(`user_photo_${userId}`);
    if (savedPhoto) {
      setUserPhotoState(savedPhoto);
      return savedPhoto;
    }
    return null;
  };

  const saveUserPhoto = (photo: string) => {
    const userId = localStorage.getItem('current_user_id') || 'current_user';
    localStorage.setItem(`user_photo_${userId}`, photo);
    setUserPhotoState(photo);
  };

  const clearUserPhoto = () => {
    const userId = localStorage.getItem('current_user_id') || 'current_user';
    localStorage.removeItem(`user_photo_${userId}`);
    setUserPhotoState(null);
  };

  return {
    userPhoto,
    saveUserPhoto,
    clearUserPhoto,
    loadUserPhoto
  };
};