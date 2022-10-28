import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header: any = () => {
	const [mounted, setMounted] = useState(false);
	const { data: session } = useSession();
	const user = session?.user;

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return;

	return (
		<div className='custom-background-color-and-border fixed top-0 left-0 z-50 flex h-16 w-screen items-center justify-between gap-16 border-b px-4 pr-6'>
			<Link href='/'>
				<img
					src='/assets/images/blog-logo-blue.svg'
					alt=''
					className='w-20 cursor-pointer object-contain'
				/>
			</Link>

			<div className='group  flex items-center gap-5'>
				{user ? (
					<p
						onClick={() => signOut()}
						className='cursor-pointer text-xl font-medium text-blue-500 transition-all duration-300 hover:text-blue-600'
					>
						Sign Out
					</p>
				) : (
					<p
						onClick={() => signIn()}
						className='cursor-pointer text-xl font-medium text-blue-500 transition-all duration-300 hover:text-blue-600'
					>
						Sign In
					</p>
				)}
				{user ? (
					<img
						src={user?.image!}
						alt=''
						className='peer h-10 cursor-pointer rounded-full transition-all duration-300 group-hover:scale-110'
					/>
				) : (
					<RiAccountCircleLine className='cursor-pointer text-4xl transition-all duration-300 group-hover:scale-110' />
				)}

				<div className='peer absolute top-6 -right-0 hidden h-20 w-20  peer-hover:block hover:block'></div>

				{/* dropdown */}
				{user && (
					<div className='custom-background-color-and-border absolute top-20 right-7 hidden space-y-2 whitespace-nowrap rounded-lg p-3 peer-hover:block hover:block'>
						<p className='cursor-pointer rounded-lg px-4 py-2 text-lg font-semibold hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'>
							{user?.name}
						</p>
						<p className='cursor-pointer rounded-lg px-4 py-2 text-lg font-semibold hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'>
							{user?.email}
						</p>

						<p
							onClick={() => signOut()}
							className='cursor-pointer rounded-lg px-4 py-2 text-lg font-semibold hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'
						>
							Sign Out
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
