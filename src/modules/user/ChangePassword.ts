import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { redis } from './../../redis';
import { User } from './../../entity/User';

import { forgotPassword } from '../constant/redisPrefix';
import { ChangePasswordInput } from './ChangePassword/ChangePasswordInput';
import bcrypt from 'bcryptjs';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class ChangePasswordResolver {
	@Mutation(() => User, { nullable: true })
	async changePassword(
		@Arg('data') { token, password }: ChangePasswordInput,
		@Ctx() ctx: MyContext
	): Promise<User | null> {
		const userId = await redis.get(forgotPassword + token);

		if (!userId) {
			return null;
		}

		await redis.del(forgotPassword + token);
		const user = await User.findOne(userId);
		if (!user) {
			return null;
		}
		user.password = await bcrypt.hash(password, 12);

		user.save();

		ctx.req.session!.userId = user.id;

		return user;
	}
}
