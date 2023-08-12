const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try
    {
        const token=req.cookies.token
        console.log(token);
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, "random string");
        req.user=decoded;
        console.log(decoded)
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};