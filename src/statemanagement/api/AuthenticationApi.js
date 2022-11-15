import API from './index';

// Register a new user
export const registeraUser = (registerData) => API.post('/user/signup', registerData);
// Login a user
export const loginaUser = (loginData) => API.post('/user/signin', loginData);