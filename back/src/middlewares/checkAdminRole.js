const checkAdminRole = (req, res, next) => {
    try {
        const user = req.user;

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        next();

    } catch (error) {
        console.error("Error in admin role check:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = checkAdminRole;