import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetsBefore } from '../redux/slices/GetTweetSlice';
import WsMessage from '../composents/wsMessage';

const InfiniteScroll = () => {
    const dispatch = useDispatch();
    const { tweets, hasMore, status } = useSelector((state) => state.getTweets);
    const [lastTimestamp, setLastTimestamp] = useState(null);
    const token = localStorage.getItem('token');

    const loadMore = useCallback(() => {
        if (status !== 'loading' && hasMore) {
            dispatch(getTweetsBefore({ token, timestamp: lastTimestamp || Date.now() }))
                .then((response) => {
                    if (response.payload.length > 0) {
                        setLastTimestamp(new Date(response.payload[response.payload.length - 1].createdAt).getTime());
                    } else {
                        setLastTimestamp(null); // No more tweets to load
                    }

                    console.log("🚀 ~ InfiniteScroll ~ lastTimestamp:", lastTimestamp);
                });
        }
    }, [hasMore, status, dispatch, lastTimestamp, token]);

    useEffect(() => {
        if (!tweets.length) {
            console.log('Fetching initial tweets');
            loadMore();
        }
    }, [loadMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                console.log('Fetching more tweets');
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    return (
        <div>
            {tweets.map((tweet) => (
                <div key={tweet._id}>
                    <h3>{tweet.title}</h3>
                    <p>{tweet.content}</p>
                    <p>Écrit par {tweet.author}</p>
                </div>
            ))}
            {status === 'loading' && <p>Chargement...</p>}
            {status === 'failed' && <p style={{ color: 'red' }}>Erreur lors du chargement</p>}
            {!hasMore && <p style={{ color: 'blue'}}>Fin des tweets</p>}
            {!hasMore && <p>Fin des tweets</p>}
        <div>
            <WsMessage />
        </div>
        </div>
    );
};

export default InfiniteScroll;
