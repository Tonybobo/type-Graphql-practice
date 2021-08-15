import { buildSchema } from 'type-graphql';
import { MeResolver } from './../user/Me';

import { LoginResolver } from './../user/Login';
import { ConfirmResolver } from './../user/confirmUser';
import { ForgotPasswordResolver } from './../user/forgotPassword';
import { ChangePasswordResolver } from './../user/ChangePassword';
import { LogoutResolver } from './../user/Logout';
import { RegisterResolver } from './../user/Register';
import { BaseCreateProduct, BaseCreateUser } from './../user/CreateUser';
import { ProfilePictureResolver } from './../user/ProfilePicture';

export const createSchema = () =>
	buildSchema({
		resolvers: [
			MeResolver,
			RegisterResolver,
			LoginResolver,
			ConfirmResolver,
			ForgotPasswordResolver,
			ChangePasswordResolver,
			LogoutResolver,
			BaseCreateUser,
			BaseCreateProduct,
			ProfilePictureResolver
		]
	});
