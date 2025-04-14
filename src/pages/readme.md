# AWS Cognito Hosted UI Token Handling in React

## Setup Instructions

### 1. Capture and store tokens from URL

```js
useEffect(() => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);

  const idToken = params.get('id_token');
  const accessToken = params.get('access_token');
  const expiresIn = parseInt(params.get('expires_in') || '86400', 10);

  if (idToken && accessToken) {
    const expiryTime = Date.now() + expiresIn * 1000;

    localStorage.setItem('id_token', idToken);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('token_expiry', expiryTime.toString());

    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, [location]);
```

### 2. Protect routes using token check

```js
const isAuthenticated = () => {
  const token = localStorage.getItem('id_token');
  const expiry = parseInt(localStorage.getItem('token_expiry'), 10);
  return token && Date.now() < expiry;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};
```

### 3. Decode ID token to get user info

```bash
npm install jwt-decode
```

```js
import jwt_decode from 'jwt-decode';

useEffect(() => {
  const token = localStorage.getItem('id_token');
  if (token) {
    const decoded = jwt_decode(token);
    setUserData({
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
    });
  }
}, []);
```

### 4. Logout and clear session

```js
const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};
```

### 5. Logout using Cognito Hosted UI

```js
const logoutHostedUI = () => {
  localStorage.clear();
  window.location.href = 'https://your-domain.auth.region.amazoncognito.com/logout?client_id=your-client-id&logout_uri=http://localhost:5173/';
};
```

Replace `your-domain`, `region`, `your-client-id`, and `logout_uri` accordingly.

### 6. Use access token in API calls

```js
const accessToken = localStorage.getItem('access_token');

fetch('https://your-api-url.com/endpoint', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 7. Auto-logout on expiry

```js
const expiry = parseInt(localStorage.getItem('token_expiry'), 10);
const timeLeft = expiry - Date.now();

setTimeout(() => {
  localStorage.clear();
  window.location.href = '/';
}, timeLeft);
```

### Token Purpose Summary

- id_token: used to decode user info (name, email, etc)
- access_token: used to access APIs (attach to Authorization header)
- expires_in: used to calculate expiry time (default 86400 seconds)