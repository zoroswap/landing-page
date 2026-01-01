import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-between container'>
      <Link to='/'>
        <img src='/zoro-logo-full.svg' title='Zoro logo' alt='Zoro logo' />
      </Link>
      <nav className='flex gap-8 cal-sans'>
        <a href='#socials'>Socials</a>
        <a href='#'>Publications</a>
        <Link to='/media-kit'>Media Kit</Link>
        <Link to='#' className='opacity-50 cursor-auto'>Developers</Link>
      </nav>
      <div className='flex justfiy-center gap-4 items-center'>
        <ModeToggle />
        <a href='https://app.zoroswap.com'>
          <button className='bg-primary text-white w-[180px] text-center py-4 rounded-full hover:bg-primary/80 font-semibold h-[70px]'>
            LAUNCH APP
          </button>
        </a>
      </div>
    </div>
  );
};

export default Header;
