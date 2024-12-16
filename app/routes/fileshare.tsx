import { useState } from 'react';
import { IconButton } from '~/components/ui/IconButton';
import { classNames } from '~/utils/classNames';
import { Header } from '~/components/header/Header';

export default function FileShare() {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!text && !selectedFile) {
      return;
    }

    if (text) {
      console.log('Uploading text:', text);
    } else if (selectedFile) {
      console.log('Uploading file:', selectedFile);
    }

    // Reset after upload
    setText('');
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setText('');
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#E0E0FF] p-4">
        <div className="w-full max-w-xl">
          <div className="flex gap-4">
            {/* Text Input Section */}
            <div
              className={classNames(
                'flex-1',
                'shadow-[0_0_15px_rgba(138,79,255,0.2)]',
                'border border-[#D8BFD8]',
                'bg-bolt-elements-prompt-background',
                'backdrop-filter backdrop-blur-[8px]',
                'rounded-lg overflow-hidden',
              )}
            >
              <textarea
                className="w-full pl-4 pt-4 pr-4 min-h-[200px] focus:outline-none resize-none text-md 
                         text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setSelectedFile(null); // Clear file selection when text is entered
                }}
                placeholder="Enter your text here..."
                disabled={!!selectedFile} // Disable text input if a file is selected
              />
            </div>

            {/* File Upload Section */}
            <div className="flex flex-col justify-center gap-4">
              <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} disabled={!!text} />
              <label
                htmlFor="file-upload"
                className={classNames(
                  'cursor-pointer',
                  'shadow-[0_0_15px_rgba(138,79,255,0.2)]',
                  'border border-[#D8BFD8]',
                  'bg-bolt-elements-prompt-background',
                  'backdrop-filter backdrop-blur-[8px]',
                  'rounded-lg p-4',
                  'flex flex-col items-center justify-center',
                  'min-h-[100px]',
                  text ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'
                )}
              >
                <div className="i-ph:file text-3xl mb-2" />
                <span className="text-sm">{selectedFile ? selectedFile.name : 'Upload a file'}</span>
              </label>

              {/* Upload Button */}
              <IconButton
                className="bg-purple-400 hover:brightness-94 text-white p-2 w-full"
                disabled={!text && !selectedFile} 
                onClick={handleUpload}
              >
                <div className="flex items-center justify-center gap-2">
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
