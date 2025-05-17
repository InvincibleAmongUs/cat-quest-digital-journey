
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth(); // Changed from relying on localStorage to using AuthContext
  
  // Check if user is logged in using AuthContext
  useEffect(() => {
    if (!isLoading) {
      if (user?.isAuthenticated) {
        navigate('/terms');
      } else {
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue"></div>
      </div>
    );
  }

  return null; // This component just redirects, no need to render anything
};

export default Index;
