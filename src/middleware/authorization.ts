import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

export class Authorization {
  // Function to generate a JWT token
  static generateJwt(userId: string, email: string): string {
    // Payload: You can add other claims like email, username, etc.
    const payload = { userId, email };

    // Options: Set token expiration, e.g., 1 hour
    const options = { expiresIn: '1h' };

    // Generate the token using JWT secret key and the payload
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn:'1h'});

    return token;
  }


  // Function to verify the JWT token
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    // Get token from Authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret is not defined' });
    }

    // Verify the token using the secret key
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      next();  // Pass control to the next handler
    });
  }



}
