import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendTweet } from '../redux/slices/SendTweetSlice';
import { getTweets } from '../redux/slices/GetTweetSlice';
import InfiniteScroll from './scroll';

const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const { status, error } = useSelector((state) => state.getTweets);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const response = await dispatch(sendTweet({ title, content, author, token }));

        if (sendTweet.fulfilled.match(response)) {
            dispatch(getTweets(token)); // Refresh tweets after sending
            setTitle('');
            setContent('');
        }
    };

    useEffect(() => {
        const storedAuthor = localStorage.getItem('username');
        if (storedAuthor) {
            setAuthor(storedAuthor);
        }
    }, []);

    return (
        <div>
            <h1>Envoyer un Tweet</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre"
                />
                <br />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Écrivez votre tweet ici..."
                    rows="4"
                    cols="50"
                />
                <br />
                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>

            <h2>Tweets</h2>
            {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}

            <InfiniteScroll />
        </div>
    );
};

export default Home;
