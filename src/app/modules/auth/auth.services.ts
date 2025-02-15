import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser, IRegisterUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const result = await User.create(payload);
  return {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
  };
};

const loginUser = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  // checking if the user is already deleted

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))){
    console.log(user?.password);
    console.log(payload?.password);
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentialss');

  }
  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role as string,
  };

  
  
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    24 * 60 * 60,
  
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    1000 * 60 * 60 * 24 * 365,
  );

  // console.log('Generated Acces Token ', accessToken);
  //   console.log("JWT Secret:", config.jwt_access_secret);
  // console.log("JWT Expiry:", config.jwt_access_expires_in);

  return {
    accessToken,
    refreshToken
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
};
