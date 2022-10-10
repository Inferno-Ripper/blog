export interface IFeaturedPost {
	author?: { bio: string; image; name: string };
	body?: any;
	categories?: [{ _id; title: string; description: string }];
	imagesGallery?: [IImage];
	mainImage?: IImage;
	slug?: { current: string };
	title?: string;
	description?: string;
	_createdAt?: string;
	_updatedAt?: string;
	_id?: string;
}

export interface IPost {
	author?: { bio: string; image; name: string };
	body?: any;
	categories?: [{ _id; title: string; description: string }];
	imagesGallery?: [IImage];
	mainImage?: IImage;
	slug?: { current: string };
	title?: string;
	description?: string;
	_createdAt?: string;
	_updatedAt?: string;
	_id?: string;
}

export interface IAuthor {
	_id?: string;
	name?: string;
	bio?: string;
	image?: any;
}

export interface IImage {
	image: {
		asset: { ref: string; _type: string };
	};
	_type: string;
}
