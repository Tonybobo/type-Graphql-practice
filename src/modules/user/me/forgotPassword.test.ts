import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../../../test-utils/testConn';
import { User } from '../../../entity/User';
import { gCall } from './../../../test-utils/gCall';

let conn: Connection;

beforeAll(async () => {
	conn = await testConn();
});
afterAll(async () => {
	await conn.close();
});

const forgetPasswordMutation = (email: string) => `
    mutation {
        forgotPassword (email : "${email}")
    }

`;

describe('check forgotPassword API', () => {
	it('get user', async () => {
		const user = await User.create({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		}).save();

		const response = await gCall({
			source: forgetPasswordMutation(user.email)
		});
		expect(response.data!.forgotPassword).toBeTruthy();
	});
});
