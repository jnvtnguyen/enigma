import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto-js';

import SignupRequest from '@/api/requests/SignupRequest';
import LoginRequest from '@/api/requests/LoginRequest';
import { SignupError, LoginError, CommonError, LogoutError } from '@/api/errors';
import User from '@/api/models/User';
import UserService from '@/api/services/UserService';
import AccessToken from '@/api/models/AccessToken';
import AccessTokenService from '@/api/services/AccessTokenService';
import environment from '@/environment';
import SetDefaultWorkspaceRequest from '@/api/requests/SetDefaultWorkspaceRequest';

@Controller('user')
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  @Get('/')
  public async user(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const user: User = await this.userService.findOneById(request.user.id);

      const successResponse = {
        message: 'Find user successfully',
        user: instanceToPlain(user)
      };

      return response.status(200).send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };
      return response.status(500).send(errorResponse);
    }
  }

  @Post('/signup')
  public async signup(
    @Body() signupRequest: SignupRequest,
    @Res() response: Response
  ): Promise<any> {
    try {
      const user: User = await this.userService.findOneByEmail(signupRequest.email);

      if (user) {
        const errorResponse = {
          error: SignupError.EMAIL_DUPLICATE
        };

        return response.status(400).send(errorResponse);
      }

      const newUser: User = new User();
      newUser.firstName = signupRequest.firstName;
      newUser.lastName = signupRequest.lastName;
      newUser.email = signupRequest.email;
      newUser.password = signupRequest.password;

      const createUserResponse = await this.userService.create(newUser);

      if (createUserResponse) {
        const successResponse: any = {
          message: 'Signup user successfully'
        };

        return response.status(200).send(successResponse);
      } else {
        const errorResponse = {
          error: CommonError.UNKNOWN
        };

        return response.status(400).send(errorResponse);
      }
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }

  @Post('/login')
  public async login(@Body() loginRequest: LoginRequest, @Res() response: Response): Promise<any> {
    try {
      const user: User = await this.userService.findOneByEmail(loginRequest.email);

      if (user) {
        if (await User.comparePassword(user.password, loginRequest.password)) {
          const token = jwt.sign({ id: user.id }, environment.app.jwtSecret, {
            expiresIn: '4h'
          });
          if (token) {
            const newAccessToken = new AccessToken();
            newAccessToken.userId = user.id;
            newAccessToken.token = token;
            await this.accessTokenService.create(newAccessToken);
            const cipherToken = crypto.AES.encrypt(token, environment.app.cryptoSecret).toString();
            const successResponse = {
              message: 'Log in user successfully',
              data: {
                accessToken: cipherToken,
                user: instanceToPlain(user)
              }
            };

            return response.status(200).send(successResponse);
          }
        }
      }

      const errorResponse = {
        error: LoginError.INCORRECT_EMAIL_PASSWORD
      };

      return response.status(400).send(errorResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }

  @Post('/landing/finish')
  public async finishLanding(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      await this.userService.finishLanding(request.user.id);

      const successResponse = {
        message: 'Successfully finished landing.'
      };

      return response.status(200).send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }

  @Post('/workspace/set-default')
  public async setDefaultWorkspace(
    @Body() setDefaultWorkspaceRequest: SetDefaultWorkspaceRequest,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    try {
      await this.userService.setDefaultWorkspace(
        request.user.id,
        setDefaultWorkspaceRequest.workspaceId
      );

      const successResponse = {
        message: 'Successfully set user default workspace.'
      };
      return response.status(200).send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }

  @Post('/logout')
  public async logout(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const token =
        request.headers.authorization.split(' ')[0] === 'Bearer'
          ? request.headers.authorization.split(' ')[1]
          : '';

      const deleteTokenResponse = await this.accessTokenService.deleteByToken(token);

      if (!deleteTokenResponse) {
        const errorResponse = {
          error: LogoutError.INVALID_TOKEN
        };

        return response.status(400).send(errorResponse);
      }

      const successResponse = {
        message: 'Successfully logout user'
      };

      return response.status(200).send(successResponse);
    } catch (error) {
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }
}
