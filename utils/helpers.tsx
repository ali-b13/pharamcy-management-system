
import dayjs from 'dayjs';
import { jwtVerify } from 'jose';
export const calculateRemainingDays = (expiryDate:Date) => {
    return dayjs(expiryDate).diff(dayjs(), 'day');
  };

  export const calculateRemainingDaysWithText = (expiryDate: Date): string => {
    const numOfDays = dayjs(expiryDate).diff(dayjs(), 'day');
    return numOfDays < 0 ? ` منتهي منذ ${Math.abs(numOfDays)} من الايام ` : ` ${numOfDays} من الايام متبقي`;
  };



const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Use the correct secret format

export const verifyJWT = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // Return the decoded payload
  } catch (error) {
    console.error('JWT verification error:', error);
    throw new Error('Invalid token');
  }
};




 
