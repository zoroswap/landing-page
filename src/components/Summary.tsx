const ValueProposition = ({ title, text }: { title: string; text: string }) => (
  <div>
    <h3 className='text-xl text-primary mb-3'>{title}</h3>
    <p>{text}</p>
  </div>
);

const Summary = () => {
  return (
    <div className='py-10 md:py-30 text-left container'>
      <h1 className='text-3xl md:text-[63px] mb-10 text-left md:leading-[6rem]'>
        An AMM your banker will use.
      </h1>
      <div className='my-10 gap-10 flex flex-col'>
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
    </div>
  );
};

export default Summary;
