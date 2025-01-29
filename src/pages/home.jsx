import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendTweet } from '../redux/slices/SendTweetSlice';
const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log('token: avant envoie', token);
        dispatch(sendTweet({ title, content, author, token }));
        console.log('Tweet sent:', { title, content, author, token });
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
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default Home;