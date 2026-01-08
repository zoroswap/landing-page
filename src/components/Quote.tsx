import { Card } from './ui/card';

const Quote = () => {
  return (
    <div className='container md:my-20 m-0'>
      <Card className='p-10 border-foreground/20 m-0'>
        <figure className='max-w-screen-md mx-auto text-center'>
          <svg
            className='w-11 h-11 text-heading mb-4 mx-auto opacity-30'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M10 11V8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1Zm0 0v2a4 4 0 0 1-4 4H5m14-6V8a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1Zm0 0v2a4 4 0 0 1-4 4h-1'
            />
          </svg>
          <blockquote>
            <p className='text-xl italic tracking-tight text-heading'>
              "ZoroSwap is set to become the central liquidity hub on Miden, combining the
              best of both passive and active market-making paradigms. The project is
              proudly supported by a development grant from Miden."
            </p>
          </blockquote>
          <figcaption className='flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse'>
            <img
              className='w-12 h-12 rounded-full'
              src='./zoro-logo.svg'
              alt='profile picture'
            />
            <div className='flex items-center divide-x rtl:divide-x-reverse divide-default'>
              <cite className='ps-3 text-sm text-body'>
                from article{'  '}
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://paragraph.com/@zoroswap/introducing-zoroswap'
                  className='font-semibold text-primary underline'
                >
                  Introducing ZoroSwap
                </a>
              </cite>
            </div>
          </figcaption>
        </figure>
      </Card>
    </div>
  );
};

export default Quote;
