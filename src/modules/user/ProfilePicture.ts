import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Upload } from 'src/types/Upload';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class ProfilePictureResolver {
	@Mutation(() => Boolean)
	async addProfilePicture(
		@Arg('picture', () => GraphQLUpload) { createReadStream, filename }: Upload
	): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			createReadStream()
				.pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
				.on('finish', () => resolve(true))
				.on('error', () => reject(false));
		});
	}
}
