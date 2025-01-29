import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendTweet } from '../redux/slices/SendTweetSlice';
import { getTweets } from '../redux/slices/GetTweetSlice';

const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const tweetsStates = useSelector((state) => state.getTweets);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        dispatch(sendTweet({ title, content, author, token }));
    };

    useEffect(() => {
        const storedAuthor = localStorage.getItem('username');
        if (storedAuthor) {
            setAuthor(storedAuthor);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        dispatch(getTweets(token));
    }, [dispatch]);

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
                <button type="submit">Envoyer</button>
            </form>

            <h2>Tweets</h2>
            {tweetsStates.loading && <p>Chargement...</p>}
            {tweetsStates.error && <p>{tweetsStates.error}</p>}
            {tweetsStates.tweets.map((tweet) => (
                <div key={tweet._id}>
                    <h3>{tweet.title}</h3>
                    <p>{tweet.content}</p>
                    <p>Écrit par {tweet.author}</p>
                </div>
            ))}

        </div>
    );
};

export default Home;