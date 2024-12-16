import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { chatStore } from '~/lib/stores/chat';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';
import { deployToIPFS } from '~/lib/ipfs/deploy';
import type { Message } from 'ai';

interface HeaderActionButtonsProps {
  messages?: Message[];
}

export function HeaderActionButtons({ messages = [] }: HeaderActionButtonsProps) {
  const showWorkbench = useStore(workbenchStore.showWorkbench);
  const { showChat } = useStore(chatStore);
  const [isDeploying, setIsDeploying] = useState(false);

  const canHideChat = showWorkbench || !showChat;

  const handleDeploy = async () => {
    // Find the last message that contains HTML content
    const htmlMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === 'assistant' && msg.content.includes('<!DOCTYPE html>'));

    if (!htmlMessage) {
      toast.error('No HTML content found in the chat. Please generate a website first.');
      return;
    }

    try {
      setIsDeploying(true);

      // Extract HTML content from the message
      const content = htmlMessage.content;
      const htmlMatch = content.match(/<!DOCTYPE html>[\s\S]*<\/html>/);

      if (!htmlMatch) {
        toast.error('Could not extract HTML content from the message.');
        return;
      }

      const htmlContent = htmlMatch[0];

      // Deploy to IPFS using server-side API key
      const result = await deployToIPFS(htmlContent, import.meta.env.VITE_LIGHTHOUSE_API_KEY);

      // Show success message with the IPFS URL
      toast.success(
        <div>
          Deployed to IPFS!
          <br />
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline"
          >
            View website
          </a>
        </div>,
      );
    } catch (error) {
      toast.error('Failed to deploy to IPFS. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDeploy}
        disabled={isDeploying}
        className={classNames(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
          'bg-gradient-to-r from-purple-600 to-purple-700 text-white',
          'hover:from-purple-700 hover:to-purple-800',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {isDeploying ? (
          <>
            <div className="i-svg-spinners:90-ring-with-bg text-lg" />
            Deploying...
          </>
        ) : (
          <>
            <div className="i-ph:cloud-arrow-up text-lg" />
            Deploy to IPFS
          </>
        )}
      </button>

      <div className="flex border border-bolt-elements-borderColor rounded-md overflow-hidden">
        <Button
          active={showChat}
          disabled={!canHideChat}
          onClick={() => {
            if (canHideChat) {
              chatStore.setKey('showChat', !showChat);
            }
          }}
        >
          <div className="i-bolt:chat text-sm" />
        </Button>
        <div className="w-[1px] bg-bolt-elements-borderColor" />
        <Button
          active={showWorkbench}
          onClick={() => {
            if (showWorkbench && !showChat) {
              chatStore.setKey('showChat', true);
            }

            workbenchStore.showWorkbench.set(!showWorkbench);
          }}
        >
          <div className="i-ph:code-bold" />
        </Button>
      </div>
    </div>
  );
}

interface ButtonProps {
  active?: boolean;
  disabled?: boolean;
  children?: any;
  onClick?: VoidFunction;
}

function Button({ active = false, disabled = false, children, onClick }: ButtonProps) {
  return (
    <button
      className={classNames('flex items-center p-1.5', {
        'bg-bolt-elements-item-backgroundDefault hover:bg-bolt-elements-item-backgroundActive text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary':
          !active,
        'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': active && !disabled,
        'bg-bolt-elements-item-backgroundDefault text-alpha-gray-20 dark:text-alpha-white-20 cursor-not-allowed':
          disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
