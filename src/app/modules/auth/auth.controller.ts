import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.services';
import config from '../../config';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.registerUserIntoDB(req?.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  // Expire the previous token if it exists
  // if (req.cookies.token) {
  //   res.clearCookie('token');
  // }

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successful',
    data: {
      token: accessToken,
    },
  });
});



export const AuthController = {
  registerUser,
  loginUser,
};
