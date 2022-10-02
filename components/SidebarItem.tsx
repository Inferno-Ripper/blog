import React from 'react';

const SidebarItem = ({
	icon,
	text,
	active,
}: {
	icon: any;
	text: string;
	active: boolean;
}) => {
	return (
		<div
			className={`${
				active ? 'text-blue-500' : ''
			} group flex h-10 w-full cursor-pointer items-center transition-all duration-300 ease-in-out`}
		>
			<div
				className={`${
					active ? '' : 'group-hover:text-blue-600'
				} ml-[30%] text-3xl transition-all  duration-300  ease-in-out group-hover:text-4xl  `}
			>
				{icon}
			</div>
			<p className='px-6 py-2 ml-2 text-xl font-semibold transition-all duration-300 ease-in-out border border-l-0 opacity-0 whitespace-nowrap rounded-br-md rounded-tr-md border-custom-white-border bg-custom-white-light group-hover:flex group-hover:opacity-100 dark:border-custom-dark-border dark:bg-custom-dark-light'>
				{text}
			</p>
		</div>
	);
};

export default SidebarItem;
