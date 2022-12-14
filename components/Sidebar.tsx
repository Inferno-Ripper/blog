import React, { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Sidebar: any = () => {
	const { theme, setTheme } = useTheme();
	const [isMounted, setisMounted] = useState(false);

	const router = useRouter();

	// When mounted on client, now we can show the UI
	useEffect(() => setisMounted(true), []);

	const toggleTheme = (): void => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	if (!isMounted) return;

	return (
		<div className='custom-background-color-and-border fixed top-0 left-0 z-40 flex h-screen w-16 flex-col justify-center gap-16 border-r'>
			<Link href='/'>
				<div>
					{router.pathname === '/' ? (
						<SidebarItem text='Home' icon={<AiFillHome />} active={true} />
					) : (
						<SidebarItem text='Home' icon={<AiOutlineHome />} active={false} />
					)}
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
