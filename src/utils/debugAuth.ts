// Debug utility for authentication issues
export const debugAuth = () => {
  console.log('=== Auth Debug Info ===');
  
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  console.log('Token exists:', !!token);
  console.log('Token length:', token ? token.length : 0);
  
  console.log('User string exists:', !!userStr);
  console.log('User string:', userStr);
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log('Parsed user:', user);
      console.log('User has _id:', !!user?._id);
      console.log('User has email:', !!user?.email);
      console.log('User has userType:', !!user?.userType);
      console.log('User has profile:', !!user?.profile);
      console.log('User profile has name:', !!user?.profile?.name);
    } catch (error) {
      console.error('Failed to parse user JSON:', error);
    }
  }
  
  console.log('=== End Auth Debug ===');
};

// Add to window for easy debugging
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuth;
}
