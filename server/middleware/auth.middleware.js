const jwt = require("jsonwebtoken");


const secret_key = process.env.JWT_SECRET || "your_secret_key";

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
};

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
   return  res.status(500).json({ message: 'Internal Server Error' });
};


const authMiddleware = (req,res,next)=>{

    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token,secret_key);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        console.log(error)
            return res.status(401).json({ message: "Invalid or expired token",
                err:error
             });
    }



}


module.exports={loggerMiddleware,errorMiddleware,authMiddleware}


