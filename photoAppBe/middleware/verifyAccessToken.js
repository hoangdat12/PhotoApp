import jwt from 'jsonwebtoken';

const verifyAccessToken = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    if (!header) {
      return res.status(401).json({ message: 'UnAuthorization!' });
    }
    const token = header.split(' ')[1];

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err) => {
      if (err) {
        console.log(err.name);
        if (err.name === 'TokenExpiredError')
          return res.status(403).json({ message: 'Token Expired!' });
        return res.status(401).json({ message: 'Invalid Token!' });
      }
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const verifyAccessTokenAdmin = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(400).json({ message: 'UnAuthorization!' });
    }
    const bearToken = token.split(' ');
    token = bearToken[1];

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decode) => {
      if (err) {
        console.log(err.name);
        if (err.name === 'TokenExpiredError')
          return res.status(403).json({ message: 'Token Expired!' });
        return res.status(401).json({ message: 'Invalid Token!' });
      }
      if (!decode.isAdmin) {
        return res.status(405).json({ message: 'You not allowed!' });
      }
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { verifyAccessToken, verifyAccessTokenAdmin };
