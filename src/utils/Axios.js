import { combineSlices } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('api/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await axiosInstance.post('api/auth/register', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export const SendTweet = async (title, content, author, token) => {
    if (!token) {
        throw new Error('Token is required for authentication');
    }
    try {
        const response = await axiosInstance.post('api/forum/', {
            title,
            content,
            author,
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Tweet error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const GetTweets = async (token) => {
    if (!token) {
        throw new Error('Token is required for authentication');
    }
    try {
        const response = await axiosInstance.get('api/forum/', {
            headers: {
                'Authorization': `${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Get Tweets error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default axiosInstance;