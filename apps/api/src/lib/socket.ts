import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: SocketServer;

export const initSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: "*", // Adjust for production
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a room based on userId for private notifications/messages
    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined their private room`);
    });

    // Join a room for a specific lesson/class discussion
    socket.on('join_lesson', (lessonId: string) => {
      socket.join(`lesson_${lessonId}`);
      console.log(`Socket ${socket.id} joined lesson room: lesson_${lessonId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

// Helper functions to emit events
export const emitToUser = (userId: string, event: string, data: any) => {
  if (io) {
    io.to(userId).emit(event, data);
  }
};

export const emitToLesson = (lessonId: string, event: string, data: any) => {
  if (io) {
    io.to(`lesson_${lessonId}`).emit(event, data);
  }
};
