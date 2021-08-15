import { Resolver, Mutation, Arg } from 'type-graphql';

import { redis } from './../../redis';
import { User } from './../../entity/User';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { forgotPassword } from '../constant/redisPrefix';

@Resolver()
export class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(@Arg('email') email: string): Promise<boolean> {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return true;
		}
		const token = v4();
		await redis.set(forgotPassword + token, user.id, 'ex', 60 * 60 * 24); // 1 day expiration

		await sendEmail(
			email,
			`http://localhost:3000/user/change-password/${token}`
		);

		return true;
	}
}
