import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default (req, res, next) => {
    const authHeader = req.headers.authorization;
    // const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
     
        verify(token, process.env.SECRET , (err, user) => {
            if (err) {
                return res.status(401).send('Invalid token!');
            }
            req.user = user;
            next();
        });
    
    } else {
        res.status(401).send('You are not authenticated!');
    }
};