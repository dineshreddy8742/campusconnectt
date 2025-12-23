export default function handler(req, res) {
    res.status(200).json({
        message: "Debug endpoint working",
        env: {
            mongo_uri_exists: !!process.env.MONGO_URI,
            frontend_url: process.env.FRONTEND_URL,
            node_env: process.env.NODE_ENV
        }
    });
}
