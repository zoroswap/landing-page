const Spacer = () => {
  return (
    <div className='w-screen overflow-hidden'>
      <div className='hidden md:block'>
        <img
          src='/spacer.svg'
          className='w-screen max-w-screen dark:hidden'
        />
        <img
          src='/spacer_dark.svg'
          className='w-screen max-w-screen hidden dark:block'
        />
      </div>
      <div className='flex items-center min-h-20 md:hidden relative'>
        <img
          src='/spacer.svg'
          className='dark:hidden absolute top-0 bottom-0 left-[50%] translate-x-[-50%] w-4xl max-w-[unset]'
        />
        <img
          src='/spacer_dark.svg'
          className='dark:block hidden absolute top-0 bottom-0 left-[50%] translate-x-[-50%] w-4xl max-w-[unset]'
        />
      </div>
    </div>
  );
};

export default Spacer;
