import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { SocketDataContext } from './SocketDataContext';

const SOCKET_URL = "http://localhost:4000";

// Global socket instance to persist across component remounts
let socketInstance = null;

const SocketContext = ({ children }) => {
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    // Initialize socket only once
    useEffect(() => {
        if (!socketInstance) {
            socketInstance = io(SOCKET_URL, {
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
            });
        }
        socketRef.current = socketInstance;

        // Handle connection events
        const handleConnect = () => {
            console.log('Socket connected:', socketInstance.id);
            setIsConnected(true);
            setError(null);
        };

        const handleDisconnect = (reason) => {
            console.log('Socket disconnected:', reason);
            setIsConnected(false);
            // Don't auto-reconnect here, let the socket.io reconnection handle it
        };

        const handleConnectError = (err) => {
            console.error('Socket connection error:', err.message);
            setError(err.message);
        };

        const handleReconnect = (attemptNumber) => {
            console.log('Socket reconnected after', attemptNumber, 'attempts');
            setIsConnected(true);
            setError(null);
        };

        const handleReconnectAttempt = (attemptNumber) => {
            console.log('Socket reconnect attempt:', attemptNumber);
        };

        socketInstance.on('connect', handleConnect);
        socketInstance.on('disconnect', handleDisconnect);
        socketInstance.on('connect_error', handleConnectError);
        socketInstance.on('reconnect', handleReconnect);
        socketInstance.on('reconnect_attempt', handleReconnectAttempt);

        // Check if already connected
        if (socketInstance.connected) {
            setIsConnected(true);
        }

        // Cleanup listeners on unmount - but DON'T disconnect the socket
        return () => {
            socketInstance.off('connect', handleConnect);
            socketInstance.off('disconnect', handleDisconnect);
            socketInstance.off('connect_error', handleConnectError);
            socketInstance.off('reconnect', handleReconnect);
            socketInstance.off('reconnect_attempt', handleReconnectAttempt);
            // Note: We DO NOT disconnect the socket here to keep it persistent
        };
    }, []);

    

    const value = {
        socket: socketInstance,
        isConnected,
        error,
    };

    return (
        <SocketDataContext.Provider value={value}>
            {children}
        </SocketDataContext.Provider>
    );
};

export default SocketContext;