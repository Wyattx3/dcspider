import express, { Request, Response } from 'express';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import path from 'path';
import { config } from '../config';
import { queueManager } from '../services/QueueManager';
import { DashboardStats, ServerQueueData } from '../types';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req: Request, res: Response) => {
  const stats = getStats();
  res.render('index', { stats });
});

app.get('/api/stats', (req: Request, res: Response) => {
  const stats = getStats();
  res.json(stats);
});

app.get('/api/queues', (req: Request, res: Response) => {
  const queues = getAllQueues();
  res.json(queues);
});

app.get('/api/queue/:guildId', (req: Request, res: Response) => {
  const { guildId } = req.params;
  const queue = queueManager.getQueue(guildId);

  if (!queue) {
    res.status(404).json({ error: 'Queue not found' });
    return;
  }

  const queueData: ServerQueueData = {
    guildId,
    guildName: 'Server', // Would need guild data
    currentSong: queue.songs[0] || null,
    queue: queue.songs.slice(1),
    volume: queue.volume,
    isPlaying: queue.isPlaying,
    loopMode: queue.loopMode,
  };

  res.json(queueData);
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('📱 Dashboard client connected');

  // Send initial stats
  socket.emit('stats', getStats());

  // Send updates every 5 seconds
  const interval = setInterval(() => {
    socket.emit('stats', getStats());
    socket.emit('queues', getAllQueues());
  }, 5000);

  socket.on('disconnect', () => {
    console.log('📱 Dashboard client disconnected');
    clearInterval(interval);
  });
});

// Helper functions
function getStats(): DashboardStats {
  const queues = queueManager.getAllQueues();
  let totalSongs = 0;

  queues.forEach((queue) => {
    totalSongs += queue.songs.length;
  });

  return {
    totalServers: queues.size,
    totalSongs,
    activeConnections: queueManager.getActiveQueuesCount(),
    uptime: process.uptime(),
  };
}

function getAllQueues(): ServerQueueData[] {
  const queues = queueManager.getAllQueues();
  const result: ServerQueueData[] = [];

  queues.forEach((queue, guildId) => {
    result.push({
      guildId,
      guildName: 'Server', // Would need guild data
      currentSong: queue.songs[0] || null,
      queue: queue.songs.slice(1),
      volume: queue.volume,
      isPlaying: queue.isPlaying,
      loopMode: queue.loopMode,
    });
  });

  return result;
}

export function startWebServer(): void {
  server.listen(config.webPort, () => {
    console.log(`✅ Web dashboard running on http://localhost:${config.webPort}\n`);
  });
}

export { io };

