import { useState } from 'react';
import { IconButton } from '~/components/ui/IconButton';
import { classNames } from '~/utils/classNames';
import { Header } from '~/components/header/Header';

export default function FileShare() {
  const [text, setText] = useState('');

  const handleUpload = () => {
    if (!text) {
      return;
    }

    console.log('Uploading:', text);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#E0E0FF] p-4">
        <div className="w-full max-w-xl">
          <div
            className={classNames(
              'shadow-[0_0_15px_rgba(138,79,255,0.2)]',
              'border border-[#D8BFD8]',
              'bg-bolt-elements-prompt-background',
              'backdrop-filter backdrop-blur-[8px]',
              'rounded-lg overflow-hidden',
            )}
          >
            <textarea
              className="w-full pl-4 pt-4 pr-16 min-h-[200px] focus:outline-none resize-none text-md 
                       text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
            />
            <div className="flex justify-start p-4 border-t border-[#D8BFD8]">
              <IconButton className="bg-purple-400 hover:brightness-94 text-white p-2 mr-2" onClick={() => {}}>
                <div className="flex items-center gap-2">
                  <div className="i-ph:image text-lg" />
                </div>
              </IconButton>
              <IconButton className="bg-purple-400 hover:brightness-94 text-white p-2 mr-2" onClick={() => {}}>
                <div className="flex items-center gap-2">
                  <div className="i-ph:file text-lg" />
                </div>
              </IconButton>
              <IconButton
                className="bg-purple-400 hover:brightness-94 text-white p-2"
                disabled={!text}
                onClick={handleUpload}
              >
                <div className="flex items-center gap-2">
                  <div className="i-ph:arrow-up text-lg" />
                  <span>Upload</span>
                </div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
