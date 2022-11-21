import API from './index';

// Register a new user
export const registeraUser = (registerData) => API.post('/user/signup', registerData);
// Login a user
export const loginaUser = (loginData) => API.post('/user/signin', loginData);
// verify a user
export const verifyUser = (verifyData) => API.get(`/user/${verifyData.userId}/verify/${verifyData.verifyId}`);