import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('A client connected:', socket.id);

        socket.on('join', async(data) => {
            console.log('=== JOIN EVENT RECEIVED ===');
            console.log('Full data:', JSON.stringify(data));
            
            const { userId, userType } = data;
            console.log(`Join event received from ${userType} with ID: ${userId}`);
            
            if (!userId) {
                console.error('No userId provided in join event');
                return;
            }
            
            try {
                if (userType === 'user') {
                    // Get current user to increment connection count
                    const existingUser = await userModel.findById(userId);
                    console.log('Existing user:', existingUser);
                    
                    if (!existingUser) {
                        console.error(`User not found with ID: ${userId}`);
                        return;
                    }
                    
                    const connectionCount = (existingUser.socketConnectionCount || 0) + 1;
                    console.log('Updating user with connection count:', connectionCount);
                    
                    const user = await userModel.findByIdAndUpdate(
                        userId, 
                        { 
                            $set: {
                                socketId: socket.id,
                                socketConnectionCount: connectionCount
                            }
                        },
                        { new: true }
                    );
                    if (user) {
                        console.log(`User socketId saved: ${socket.id} for user ${userId}, connection count: ${connectionCount}`);
                    } else {
                        console.error(`User not found with ID: ${userId}`);
                    }
                } else if (userType === 'captain') {
                    // Get current captain to increment connection count
                    const existingCaptain = await captainModel.findById(userId);
                    console.log('Existing captain:', existingCaptain);
                    
                    if (!existingCaptain) {
                        console.error(`Captain not found with ID: ${userId}`);
                        return;
                    }
                    
                    const connectionCount = (existingCaptain.socketConnectionCount || 0) + 1;
                    console.log('Updating captain with connection count:', connectionCount);
                    
                    const captain = await captainModel.findByIdAndUpdate(
                        userId, 
                        { 
                            $set: {
                                socketId: socket.id,
                                socketConnectionCount: connectionCount
                            }
                        },
                        { new: true }
                    );
                    if (captain) {
                        console.log(`Captain socketId saved: ${socket.id} for captain ${userId}, connection count: ${connectionCount}`);
                    } else {
                        console.error(`Captain not found with ID: ${userId}`);
                    }
                }
            } catch (error) {
                console.error('Error saving socketId:', error);
            }
        });

        socket.on('disconnect', async () => {
            console.log('A client disconnected:', socket.id);
            // Clear socketId from database on disconnect
            try {
                await userModel.findOneAndUpdate(
                    { socketId: socket.id },
                    { socketId: null }
                );
                await captainModel.findOneAndUpdate(
                    { socketId: socket.id },
                    { socketId: null }
                );
            } catch (error) {
                console.error('Error clearing socketId on disconnect:', error);
            }
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, event, data) => {
    if (io) {
        io.to(socketId).emit(event, data);
    } else {
        console.error('Socket.io not initialized');
    }
};