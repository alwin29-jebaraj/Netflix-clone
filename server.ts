import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Welcome to the Netflix Clone Backend!
 * 
 * This server handles our mock authentication and serves the frontend.
 * We're using Express for its simplicity and Vite as a middleware 
 * to give us that sweet development experience.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Standard middleware to parse JSON bodies. 
  // Essential for our login POST request.
  app.use(express.json());

  /**
   * Mock User Database
   * In a real app, this would be a call to a secure database like PostgreSQL or MongoDB.
   * For this demo, we're keeping it simple and local.
   */
  const MOCK_USER = {
    email: "test@netflix.com",
    password: "password123"
  };

  /**
   * Authentication Endpoint
   * This is where the magic happens. We check the credentials sent from the frontend.
   */
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Basic sanity check: did they actually send something?
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Oops! Both email and password are required to sign in." 
      });
    }

    // The "Authentication" logic
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      console.log(`[Auth] Successful login for: ${email}`);
      return res.status(200).json({ 
        message: "Welcome back!", 
        user: { email } 
      });
    } else {
      console.warn(`[Auth] Failed login attempt for: ${email}`);
      return res.status(401).json({ 
        message: "Sorry, we couldn't find an account with that email or password. Please try again." 
      });
    }
  });

  /**
   * Environment Setup
   * We handle both development (with Vite HMR) and production (serving static files).
   */
  if (process.env.NODE_ENV !== "production") {
    // Development mode: Let Vite handle the heavy lifting
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve the pre-built assets from the /dist folder
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🚀 Netflix Clone Server is live!`);
    console.log(`🌍 Local: http://localhost:${PORT}`);
    console.log(`💡 Tip: Use 'test@netflix.com' to log in.\n`);
  });
}

// Kick off the server
startServer().catch((err) => {
  console.error("Failed to start the server:", err);
});
