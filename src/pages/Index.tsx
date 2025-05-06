
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null; // This component just redirects, no need to render anything
};

export default Index;
