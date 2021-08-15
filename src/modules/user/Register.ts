import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from './../middleware/isAuth';
import { logger } from '../middleware/logger';
import { sendEmail } from '../utils/sendEmail';
import { confirmationUrl } from '../utils/confirmationUrl';

@Resolver()
export class RegisterResolver {
	@Query(() => String)
	@UseMiddleware(isAuth, logger)
	async hello() {
		return 'Hello World!';
	}

	@Mutation(() => User)
	async register(
		@Arg('data')
		{ email, firstName, lastName, password }: RegisterInput
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword
		}).save();

		await sendEmail(email, await confirmationUrl(user.id));

		return user;
	}
}
