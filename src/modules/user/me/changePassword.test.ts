import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../../../test-utils/testConn';
import { User } from '../../../entity/User';
import { redis } from './../../../redis';
import { v4 } from 'uuid';
import { forgotPassword } from '../../constant/redisPrefix';
import { gCall } from './../../../test-utils/gCall';

let conn: Connection;

beforeAll(async () => {
	conn = await testConn();
});
afterAll(async () => {
	await conn.close();
});

const changePasswordMutation = (token: string, password: string) => `
	mutation{
  changePassword(data:{token:"${token}" , password:"${password}"}){
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe('change user password', () => {
	it('create a user and change password', async () => {
		const user = await User.create({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		}).save();

		const token = v4();
		await redis.set(forgotPassword + token, user.id, 'ex', 60 * 60 * 24); // 1 day expiration

		const response = await gCall({
			source: changePasswordMutation(token, faker.internet.password())
		});

		expect(response).toMatchObject({
			data: {
				changePassword: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email
				}
			}
		});
	});
});
