// utils/auth.middleware.js - Enforces authentication and admin role checks

// Middleware 1: Checks if a user is "authenticated" (logged in)
const isAuthenticated = (req, res, next) => {
    // NOTE: For a real app, this MUST check for a valid JWT/Session token
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. Authentication token is required.' });
    }

    // --- DUMMY AUTHENTICATION ---
    // We assume the token is valid and set a mock user object.
    // To test the Admin functionality, use the token 'Bearer admin_token'
    // To test non-admin access, use 'Bearer user_token' (which will fail isAdmin check)
    if (authHeader.includes('admin_token')) {
        req.user = { id: 101, username: 'AdminUser', role: 'admin' };
    } else {
        req.user = { id: 102, username: 'RegularUser', role: 'user' };
    }
    // --- END DUMMY AUTHENTICATION ---

    next();
};

// Middleware 2: Checks if the authenticated user has the 'admin' role
const isAdmin = (req, res, next) => {
    // This requires isAuthenticated to run first and set req.user
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ 
            message: 'Forbidden. This action requires Admin privileges.',
            userRole: req.user ? req.user.role : 'none'
        });
    }
    next();
};

module.exports = {
    isAuthenticated,
    isAdmin
};
