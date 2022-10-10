import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { urlFor } from '../sanity';
import { IPost } from '../typing';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
	postData: IPost;
}

const Post = ({ postData }: IProps) => {
	return (
		<div className='group  flex w-96 flex-col gap-2 overflow-hidden rounded-lg border border-custom-white-border bg-custom-white-light text-black dark:border-custom-dark-border dark:bg-custom-dark-light  dark:text-white lg:h-60 lg:w-[850px] lg:flex-row'>
			{/* post image */}

			<Link href={postData?.slug?.current!}>
				<img
					src={urlFor(postData?.mainImage).url()}
					className='flex items-center object-cover object-center h-56 transition-all duration-200 bg-black rounded-t-lg w-96 group-hover:scale-105 lg:h-full lg:w-80 lg:rounded-tr-none lg:rounded-bl-lg'
					alt=''
				/>
			</Link>

			<div className='p-2 space-y-2'>
				{/* post categories small screen size*/}
				<div className='flex flex-wrap items-center justify-center w-full h-auto gap-4 gap-x-6 lg:hidden '>
					{postData.categories?.slice(0, 4)?.map(({ _id, title }) => (
						<button
							key={uuidv4()}
							className='px-3 py-2 text-xs font-medium text-white transition-all duration-300 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 '
						>
							{title}
						</button>
					))}
				</div>
				{/* post categories large screen size*/}
				<div className='flex-wrap hidden w-full h-auto gap-4 lg:flex '>
					{postData.categories?.slice(0, 3)?.map(({ _id, title }) => (
						<button
							key={uuidv4()}
							className='px-3 py-2 text-xs font-medium text-white transition-all duration-300 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 '
						>
							{title}
						</button>
					))}
				</div>

				{/* post title */}
				<Link href={postData?.slug?.current!}>
					<h1 className='w-full truncate  break-words text-xl font-semibold lg:w-[500px]'>
						{postData?.title}
					</h1>
				</Link>

				{/* post description */}
				<Link href={postData?.slug?.current!}>
					<p className='h-20 w-full truncate whitespace-normal break-words text-sm   lg:w-[500px]'>
						{postData?.description?.trim()}
					</p>
				</Link>

				{/* post author */}
				<div className='relative flex items-center gap-4 p-2 lg:p-0'>
					{/* post author image */}
					<img
						src={urlFor(postData?.author?.image).url()}
						alt=''
						className='h-10 rounded-full'
					/>

					<div className=''>
						{/* post author's name */}
						<p className='font-medium '>{postData?.author?.name}</p>

						{/* post created at */}
						<p className='text-xs font-medium'>
							Posted On {moment(postData?._createdAt).format('MMM Do YY')}
						</p>
					</div>

					{/* read button */}
					<Link href={postData?.slug?.current!}>
						<button className='absolute right-0 flex items-center justify-center px-4 py-1 font-semibold tracking-wider text-white transition-all duration-500 bg-blue-500 rounded-lg cursor-pointer read-btn hover:bg-blue-600'>
							Read
							<span className='text-2xl transition-all duration-300 arrow'>
								<BiChevronRight />
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Post;
