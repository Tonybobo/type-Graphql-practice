import {
	Resolver,
	Arg,
	Mutation,
	ClassType,
	InputType,
	Field
} from 'type-graphql';
import { User } from './../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { Product } from './../../entity/Product';

function createResolver<T extends ClassType, X extends ClassType>(
	suffix: string,
	returnType: T,
	inputType: X,
	entity: any
) {
	@Resolver()
	class BaseResolver {
		@Mutation(() => returnType, { name: `create${suffix}` })
		async createUser(@Arg('data', () => inputType) data: typeof inputType) {
			return entity.create(data).save();
		}
	}

	return BaseResolver;
}

@InputType()
class ProductInput {
	@Field()
	name: string;
}

export const BaseCreateUser = createResolver('User', User, RegisterInput, User);
export const BaseCreateProduct = createResolver(
	'Product',
	Product,
	ProductInput,
	Product
);
