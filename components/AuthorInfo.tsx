import React, { useEffect, useState } from 'react';
import { urlFor } from '../sanity';
import { IAuthor } from '../typing';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
	allAuthorsSanity: [IAuthor];
}

const AuthorInfo = ({ allAuthorsSanity }: IProps) => {
	const [selectedAuthor, setSelectedAuthor] = useState<IAuthor>(
		allAuthorsSanity[0]
	);
	const [changeSelectedAuthor, setChangeSelectedAuthor] = useState<string>(
		allAuthorsSanity[0]._id!
	);

	useEffect(() => {
		const newSelectedAuthor: IAuthor[] = allAuthorsSanity.filter(
			({ _id }) => _id === changeSelectedAuthor
		);

		const changeAuthor = newSelectedAuthor[0];

		setSelectedAuthor(changeAuthor);
	}, [changeSelectedAuthor]);

	return (
		<div className='hidden p-4 rounded-lg custom-background-color-and-border h-fit w-72 2xl:block '>
			<div className='relative space-y-6 '>
				<h1 className='w-20 p-2 font-semibold tracking-wide text-white transition-all duration-300 bg-blue-500 rounded-lg cursor-pointer peer hover:bg-blue-600'>
					Authors
				</h1>

				<div className='absolute hidden w-20 h-20 peer -top-6 -left-14 peer-hover:block hover:block'></div>

				{/* authors */}
				<div className='absolute hidden p-3 space-y-2 rounded-lg custom-background-color-and-border -top-6 -left-48 whitespace-nowrap peer-hover:block hover:block'>
					{allAuthorsSanity?.map(({ _id, name }) => (
						<p
							onClick={() => setChangeSelectedAuthor(_id!)}
							key={_id}
							className='px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'
						>
							{name}
						</p>
					))}
				</div>

				{/* selected author */}
				<div className='space-y-2 '>
					<img
						src={urlFor(selectedAuthor?.image)?.url()}
						alt=''
						className='h-[250px] w-[250px] rounded-lg object-cover'
					/>

					{/* author name */}
					<h1 className='pt-2 pl-1 text-xl font-semibold cursor-pointer'>
						{selectedAuthor?.name}
					</h1>

					{/* author bio */}
					<p className='pl-1 '>{selectedAuthor?.bio}</p>
				</div>
			</div>
		</div>
	);
};

export default AuthorInfo;
