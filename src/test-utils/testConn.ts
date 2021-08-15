import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
	return createConnection({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'root',
		database: 'testing',
		synchronize: drop,
		logging: true,
		dropSchema: drop,
		entities: [__dirname + '/../entity/**/*.ts'],
		migrations: [__dirname + '/../migration/**/*.ts'],
		subscribers: [__dirname + '/../subscriber/**/*.ts']
	});
};
