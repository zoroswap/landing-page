const ValueProposition = ({ title, text }: { title: string; text: string }) => (
  <div>
    <h3 className='text-xl text-primary mb-3'>{title}</h3>
    <p>{text}</p>
  </div>
);

const Summary = () => {
  return (
    <div className='py-10 md:py-30 text-left container relative'>
      <h1 className='text-3xl md:text-[63px] mb-10 text-left md:leading-[6rem]'>
        An AMM your banker will use.
      </h1>
      <div className='my-10 gap-10 flex flex-col relative z-2'>
        <ValueProposition
          title='Privacy'
          text='Your onchain trades are not broadcasted just like in traditional finance.'
        />
        <ValueProposition
          title='Efficiency'
          text='CEX slippage, DeFi summer yields and laughable fees.'
        />
        <ValueProposition
          title='Self-custody'
          text='You retain the custody of your assets.'
        />
        <ValueProposition
          title='Compliance'
          text='Yeah for real.'
        />
        <a href='https://app.zoroswap.com'>
          <button className='text-primary border-1 border-color-primary w-[180px] text-center py-4 rounded-full hover:bg-primary/10 font-semibold h-[70px]'>
            Launch App →
          </button>
        </a>
      </div>
      <div className='lg:hidden border-1 overflow-hidden rounded-2xl border-foreground/20 border-dashed'>
        <img src='./app.png' title='Screenshot of zoro app' className='dark:hidden' />
        <img
          src='./dark_theme_app.png'
          title='Screenshot of zoro app'
          className='hidden dark:block'
        />
      </div>
      <div className='hidden lg:block absolute z-1 right-[-30%] w-[640px] top-[70%] translate-x-[-50%] translate-y-[-50%] h-[450px] border-1 border-dashed overflow-hidden rounded-2xl dark:opacity-70 border-foreground/20'>
        <img src='./app.png' title='Screenshot of zoro app' className='dark:hidden' />
        <img
          src='./dark_theme_app.png'
          title='Screenshot of zoro app'
          className='hidden dark:block'
        />
      </div>
    </div>
  );
};

export default Summary;
