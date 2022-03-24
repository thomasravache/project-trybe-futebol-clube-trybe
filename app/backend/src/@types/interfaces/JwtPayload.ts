import { JwtPayload } from 'jsonwebtoken';

interface IJwtPayload extends JwtPayload {
  userId: number;
  email: string;
}

export default IJwtPayload;
