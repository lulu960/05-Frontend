import React, { useState, useEffect } from 'react';

const WsMessage = () => {
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('https://websocket.lulu960.xyz');
        socket.onopen = () => {
            console.log('WebSocket connected');
            setWs(socket);
        };
        socket.onclose = () => {
            console.log('WebSocket disconnected');
            setWs(null);
        };
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            setMessage('');
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default WsMessage;