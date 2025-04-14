// utils/auth.js
export const parseTokensFromHash = () => {
    const hash = window.location.hash.substring(1); // Remove #
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
  
    if (idToken && accessToken) {
      const expiry = Date.now() + Number(expiresIn || 86400) * 1000; // 24 hrs default
      localStorage.setItem('id_token', idToken);
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('token_expiry', expiry.toString());
    }
  };
  
  export const isAuthenticated = () => {
    const idToken = localStorage.getItem('id_token');
    const expiry = parseInt(localStorage.getItem('token_expiry'), 10);
    return idToken && Date.now() < expiry;
  };
  
  export const getIdToken = () => localStorage.getItem('id_token');
  
  export const logout = () => {
    localStorage.clear();
    window.location.href = '/'; // Redirect to login
  };
  