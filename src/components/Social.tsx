const Social = () => {
  return (
    <div className='container flex flex-col md:flex-row gap-10 py-10' id='socials'>
      <div className='text-left flex-grow justify-between items-center flex gap-10 border-1 border-dashed border-foreground/20 p-10 rounded-[30px]'>
        <h2 className='opacity-50'>
          Join our<br />community
        </h2>
        <div className='flex gap-10 flex-col md:flex-row'>
          <a
            href='https://x.com/zoroswap'
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-300 hover:text-white transition-colors'
            title='X Account of ZoroSwap'
          >
            <div className='w-[92px] h-[92px] border-foreground/20 border-1 rounded-xl relative hover:border-primary'>
              <img
                src='/x.svg'
                alt='x twitter icon'
                className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[48px]'
              />
            </div>
          </a>

          <a
            href='https://t.me/+KyKHHuIxxPdmOTky'
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-300 hover:text-white transition-colors'
            title='Telegram Group for ZoroSwap'
          >
            <div className='w-[92px] h-[92px] border-foreground/20 border-1 rounded-xl relative hover:border-primary'>
              <img
                src='/telegram.svg'
                alt='telegram icon'
                className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[48px]'
              />
            </div>
          </a>
        </div>
      </div>
      <div className='text-left flex items-center flex gap-10 border-1 border-dashed border-foreground/20 p-10 rounded-[30px]'>
        <h2 className='opacity-50'>
          Explore<br />our technology
        </h2>
        <div className='flex gap-10'>
          <a
            href='https://github.com/zoroswap'
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-300 hover:text-white transition-colors'
            title='ZoroSwap on GitHub'
          >
            <div className='w-[92px] h-[92px] border-foreground/20 border-1 rounded-xl relative hover:border-primary'>
              <img
                src='/github.svg'
                alt='github icon'
                className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[48px]'
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
