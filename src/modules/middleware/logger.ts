import { MyContext } from 'src/types/MyContext';
import { MiddlewareFn } from 'type-graphql';

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
	console.log(args);
	return next();
};
