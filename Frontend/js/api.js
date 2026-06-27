// api.js - Centralized API calls
const API_BASE_URL = 'http://localhost:8080/api';

const api = {
    registerUser: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const data = await response.json();
            if (data.message === "fail") {
                throw new Error('Registration failed');
            }
            return data;
        } catch (error) {
            console.error('API Error (registerUser):', error);
            throw error;
        }
    },

    loginUser: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            if (data.message === "fail") {
                throw new Error('Invalid email or password');
            }
            return data;
        } catch (error) {
            console.error('API Error (loginUser):', error);
            throw error;
        }
    },

    fetchPosts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/post`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return await response.json();
        } catch (error) {
            console.error('API Error (fetchPosts):', error);
            throw error;
        }
    },

    uploadPost: async (postData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to upload post');
            }
            return await response.json();
        } catch (error) {
            console.error('API Error (uploadPost):', error);
            throw error;
        }
    }
};

window.api = api; // Expose to global scope for easy access
