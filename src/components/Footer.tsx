import { poweredByMiden } from './PoweredByMiden';

const Footer = () => {
  return (
    <div className='items-center justify-center flex relative py-[70px]'>
      <div className='absolute left-[50%] translate-x-[-50%] w-screen top-0 bottom-0 bg-background' />
      <div className='absolute left-[50%] translate-x-[-50%] w-screen top-0 bottom-0 bg-foreground/20' />
      <div className='relative'>{poweredByMiden}</div>
    </div>
  );
};

export default Footer;
