'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHome = true }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {showHome && (
        <>
          <Link href="/" className="flex items-center hover:text-red-600 transition-colors">
            <Home size={16} className="mr-1" />
            <span>Ana Sayfa</span>
          </Link>
          {items.length > 0 && <ChevronRight size={16} className="text-gray-400" />}
        </>
      )}
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className="hover:text-red-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight size={16} className="text-gray-400" />}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
