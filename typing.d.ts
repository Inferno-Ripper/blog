export interface IFeaturedPost {
	author?: { bio; image; name };
	body?: any;
	categories?: [{ _id; title: string; description: string }];
	imagesGallery?: any;
	mainImage?: any;
	slug?: { current: string };
	title?: string;
	description?: string;
	_createdAt?: string;
	_updatedAt?: string;
	_id?: string;
}
