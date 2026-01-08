import { Card } from './ui/card';

const Quote = () => {
  return (
    <div className='container md:my-20 m-0'>
      <Card className='p-10 border-foreground/20 m-0'>
        <figure className='max-w-screen-md mx-auto text-center'>
          <svg
              className='w-11 h-11 text-heading mb-4 mx-auto opacity-30'
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="-5.0 -10.0 110.0 135.0"
          >
              <path fill='currentColor' d="m42.848 17.477v34.645c0 22.281-16.176 31.801-29.949 32.32-3.5156 0.13281-6.4102-2.8164-6.4102-6.3359 0-3.3594 2.6172-5.5039 5.8828-6.2852 4.207-1.0039 7.7031-2.2773 10.105-5.125 2.2109-2.6211 3.4453-6.5156 3.6602-12.496l-19.902-0.12891c-1.0742-0.007812-1.9414-0.87891-1.9414-1.9531v-34.645c0-1.0781 0.875-1.9531 1.9531-1.9531h34.645c1.0781 0 1.9531 0.875 1.9531 1.9531z" fill-rule="evenodd"/>
              <path fill='currentColor' d="m95.672 17.477v34.645c0 22.281-16.176 31.801-29.949 32.32-3.5156 0.13281-6.4102-2.8164-6.4102-6.3359 0-3.3594 2.6172-5.5039 5.8828-6.2852 4.207-1.0039 7.7031-2.2773 10.105-5.125 2.2109-2.6211 3.4453-6.5156 3.6602-12.496l-19.902-0.12891c-1.0742-0.007812-1.9414-0.87891-1.9414-1.9531v-34.645c0-1.0781 0.875-1.9531 1.9531-1.9531h34.645c1.0781 0 1.9531 0.875 1.9531 1.9531z" fill-rule="evenodd"/>
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
              alt='ZoroSwap logo'
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
