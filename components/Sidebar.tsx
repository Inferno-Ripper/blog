import React, { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { AiFillHome } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Sidebar: any = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const router = useRouter();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return;

	const toggleTheme = (): void => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<div className='fixed flex h-screen w-16 flex-col justify-center gap-16 border-r border-custom-white-border bg-custom-white-light dark:border-custom-dark-border dark:bg-custom-dark-light'>
			<Link href='/home'>
				<div>
					<SidebarItem
						text='Home'
						icon={<AiFillHome />}
						active={router.pathname === '/' ? true : false}
					/>
				</div>
			</Link>

			<Link href='/bookmarks'>
				<div>
					<SidebarItem
						text='Bookmarks'
						icon={<BsBookmark />}
						active={router.pathname === '/bookmarks' ? true : false}
					/>
				</div>
			</Link>

			<Link href='/about'>
				<div>
					<SidebarItem
						text='About'
						icon={<AiOutlineInfoCircle />}
						active={router.pathname === '/about' ? true : false}
					/>
				</div>
			</Link>

			<div onClick={toggleTheme}>
				{theme === 'dark' ? (
					<SidebarItem text='Light Mode' icon={<BsSun />} active={false} />
				) : theme === 'light' ? (
					<SidebarItem text='Dark Mode' icon={<BsMoon />} active={false} />
				) : (
					<div>hi</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
