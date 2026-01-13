"use client";

import { useState } from "react";
import { portfolioData } from "@/lib/data";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { chatData } = portfolioData;

  const toggleOpen = () => setIsOpen(!isOpen);

  // If no chat data is present, don't render anything
  if (!chatData) return null;

  const socialActions = [
    {
      name: "WhatsApp",
      url: chatData.whatsapp,
      color: "bg-[#25D366]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      url: chatData.telegram,
      color: "bg-[#0088cc]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.69.508 1.287 1.21 1.64.933.474 1.656-.327 2.03-.701.484-.486.92-.958 1.302-1.359.132-.132.227-.247.397-.417l4.756 3.36c.551.391 1.101.832 1.791.737.646-.088 1.032-.767 1.226-1.547L23.36 4.66a2.01 2.01 0 0 0-.016-.852 1.78 1.78 0 0 0-1.006-1.298 12.15 12.15 0 0 0-1.14-.077z" />
        </svg>
      ),
    },
    {
      name: "Discord",
      url: chatData.discord,
      color: "bg-[#5865F2]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.815 5.567a16.205 16.205 0 0 0-4.04-1.25 7.828 7.828 0 0 0-.17.653 14.881 14.881 0 0 0-5.21 0 7.818 7.818 0 0 0-.17-.653 16.22 16.22 0 0 0-4.04 1.25c-2.55 3.86-2.55 7.636-2.55 11.23a16.61 16.61 0 0 0 5.09 2.57 11.77 11.77 0 0 0 1.94-3.17c-1.11-.42-2.09-1.02-2.95-1.78.27-.2.53-.41.77-.63 3.42 1.6 7.11 1.6 10.46 0 .25.21.52.43.79.63-.8.71-1.79 1.31-2.9 1.73a11.79 11.79 0 0 0 1.94 3.17 16.62 16.62 0 0 0 5.09-2.57c0-3.69 0-7.37-2.55-11.23ZM8.34 14.89c-1.16 0-2.11-1.07-2.11-2.39S7.17 10.11 8.34 10.11c1.17 0 2.12 1.07 2.12 2.39s-.94 2.39-2.11 2.39Zm7.32 0c-1.16 0-2.11-1.07-2.11-2.39S14.49 10.11 15.66 10.11c1.17 0 2.12 1.07 2.12 2.39s-.95 2.39-2.12 2.39Z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: chatData.linkedin,
      color: "bg-[#0077b5]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {/* Menu Items */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-0 pointer-events-none"
        }`}
      >
        {socialActions.map((action) => (
          <a
            key={action.name}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 pr-1 group"
            aria-label={`Chat on ${action.name}`}
          >
            <span className="bg-surface border border-border text-foreground text-xs py-1 px-2 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.name}
            </span>
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg hover:scale-110 transition-transform ${action.color}`}
            >
              {action.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform relative"
        aria-label="Toggle chat options"
      >
        <div
          className={`absolute transition-all duration-300 ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div
          className={`absolute transition-all duration-300 ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </button>
    </div>
  );
}
