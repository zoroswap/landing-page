import { CodeBlock } from './CodeBlock';

interface CollapsibleCodeBlockProps {
  code: string;
  language?: string;
  title: string;
  defaultOpen?: boolean;
}

export function CollapsibleCodeBlock({
  code,
  language = 'typescript',
  title,
  defaultOpen = false,
}: CollapsibleCodeBlockProps) {
  return (
    <details
      className='border border-foreground/20 rounded-lg overflow-hidden mb-2 group'
      open={defaultOpen}
    >
      <summary className='flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden'>
        <span className='text-sm font-medium'>{title}</span>
        <svg
          className='w-4 h-4 transition-transform group-open:rotate-180'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </summary>
      <div className='border-t border-foreground/20 [&>pre]:mb-0'>
        <CodeBlock code={code} language={language} />
      </div>
    </details>
  );
}
