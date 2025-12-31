const Spacer = () => {
  return (
    <div className='w-screen overflow-hidden'>
      <img
        src='/spacer.svg'
        className='dark:inverse w-screen max-w-screen hidden md:block'
      />
      <div className='flex items-center min-h-20 md:hidden relative'>
        <img
          src='/spacer.svg'
          className='dark:inverse absolute top-0 bottom-0 left-[50%] translate-x-[-50%] w-4xl max-w-[unset]'
        />
      </div>
    </div>
  );
};

export default Spacer;
