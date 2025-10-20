
"use client";

import React, { useState, ReactNode } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBadges?: boolean;
  scrollable?: boolean;
}

export default function Tabs({
  tabs,
  defaultTabId,
  onTabChange,
  variant = 'default',
  size = 'md',
  className = '',
  showBadges = true,
  scrollable = true,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab?.disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentIndex = enabledTabs.findIndex((t) => t.id === activeTab);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevTab = enabledTabs[Math.max(0, currentIndex - 1)];
      if (prevTab) handleTabClick(prevTab.id);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextTab = enabledTabs[Math.min(enabledTabs.length - 1, currentIndex + 1)];
      if (nextTab) handleTabClick(nextTab.id);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    default: 'border-b-2 border-transparent hover:border-gray-300 data-[active=true]:border-red-500 data-[active=true]:text-red-600',
    pills: 'rounded-full border border-gray-300 data-[active=true]:bg-red-500 data-[active=true]:text-white data-[active=true]:border-red-500',
    underline: 'border-b-2 border-transparent data-[active=true]:border-red-500 data-[active=true]:text-red-600 data-[active=true]:font-bold',
    cards: 'rounded-lg border border-gray-200 bg-white data-[active=true]:bg-red-50 data-[active=true]:border-red-400 data-[active=true]:shadow-md',
  };

  const activeTab_ = tabs.find((t) => t.id === activeTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab List */}
      <div className="flex items-center gap-2">
        {scrollable && scrollPosition > 0 && (
          <button
            onClick={() => setScrollPosition(Math.max(0, scrollPosition - 100))}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="flex-1 overflow-x-auto">
          <div className={`flex gap-2 border-b border-gray-200 pb-0 ${variant !== 'cards' ? 'border-b' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                disabled={tab.disabled}
                data-active={activeTab === tab.id}
                className={`
                  flex items-center gap-2 font-medium whitespace-nowrap transition-all
                  ${sizeClasses[size]}
                  ${variantClasses[variant]}
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded
                `}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {showBadges && tab.badge && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {scrollable && (
          <button
            onClick={() => setScrollPosition(scrollPosition + 100)}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-6 animate-fadeIn">
        {activeTab_ && (
          <div role="tabpanel" className="w-full">
            {activeTab_.content}
          </div>
        )}
      </div>
    </div>
  );
}
