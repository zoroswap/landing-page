import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

function NotFound() {
  return (
    <div className='flex-1 bg-background text-foreground flex flex-col dotted-bg'>
      <title>Page not found | ZoroSwap</title>
      <meta name='robots' content='noindex' />
      <meta name='description' content='The page you are looking for does not exist.' />
      <meta property='og:title' content='Page not found | ZoroSwap' />
      <meta name='twitter:title' content='Page not found | ZoroSwap' />
      <main className='flex-1 flex items-center justify-center p-4 mt-10'>
        <div className='text-center space-y-6'>
          <div className='space-y-2 font-cal-sans'>
            <h1 className='text-6xl font-bold'>404</h1>
            <p className='text-xl'>
              Page not found
            </p>
          </div>
          <div className='pt-4'>
            <Link to='/'>
              <Button
                variant='secondary'
                size='sm'
                className='text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                ← Back to Swap
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
