const Header = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-between container'>
      <img src='/zoro-logo-full.svg' title='Zoro logo' alt='Zoro logo' />
      <nav className='flex gap-8 cal-sans'>
        <a href='#'>Publications</a>
        <a href='#'>About</a>
      </nav>
      <a href='https://app.zoroswap.com'>
        <button className='bg-primary text-white w-[180px] text-center py-4 rounded-full hover:bg-primary/80 font-semibold h-[70px]'>
          LAUNCH APP
        </button>
      </a>
    </div>
  );
};

export default Header;
