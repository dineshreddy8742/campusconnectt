import app from '../backend/src/server.js';
import { connectDB } from '../backend/src/lib/db.js';

export default async function handler(req, res) {
    try {
        await connectDB();
        return app(req, res);
    } catch (e) {
        console.error('SERVERLESS FUNCTION ERROR:', e);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: e.message,
            stack: e.stack
        });
    }
}
