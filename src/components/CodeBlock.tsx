import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className='p-4 rounded-lg overflow-x-auto text-xs mb-4'
          style={{ ...style, marginTop: 0 }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
