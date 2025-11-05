'use client';

import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { useDebounce } from '@/app/hooks/useDebounce';

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 300);

  useClickOutside(searchRef, () => setIsOpen(false));

  // Mock search data - in production, this would come from an API
  const searchData: SearchResult[] = [
    { title: 'Yönetim Paneli', description: 'İstatistikler ve özet bilgiler', path: '/dashboard', category: 'Sayfa' },
    { title: 'Talepler', description: 'İş emirleri ve talepler', path: '/requests', category: 'Sayfa' },
    { title: 'Envanter', description: 'Malzeme ve stok yönetimi', path: '/inventory', category: 'Sayfa' },
    { title: 'İnsan Kaynakları', description: 'Personel yönetimi', path: '/hr', category: 'Sayfa' },
    { title: 'Varlıklar', description: 'Demirbaş ve araç yönetimi', path: '/pages/assets', category: 'Sayfa' },
    { title: 'Analitik', description: 'Raporlar ve analizler', path: '/analytics', category: 'Sayfa' },
    { title: 'Bildirimler', description: 'Sistem bildirimleri', path: '/notifications', category: 'Sayfa' },
    { title: 'Ayarlar', description: 'Uygulama ayarları', path: '/settings', category: 'Sayfa' },
    { title: 'Bakım', description: 'Sistem bakımı', path: '/maintenance', category: 'Sayfa' },
    { title: 'Arıza Talebi', description: 'Yeni arıza talebi oluştur', path: '/pages/ariza', category: 'Form' },
    { title: 'Malzeme Talebi', description: 'Malzeme talep formu', path: '/pages/malzeme', category: 'Form' },
    { title: 'Araç Talebi', description: 'Araç kiralama talebi', path: '/pages/arac/sehir-ici-arac', category: 'Form' },
    { title: 'Temizlik Talebi', description: 'Temizlik hizmeti talebi', path: '/pages/temizlik', category: 'Form' },
  ];

  React.useEffect(() => {
    if (debouncedQuery.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleSelect = (path: string) => {
    router.push(path);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Ara..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelect(result.path)}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-red-600">
                      {result.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.description}
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-2">
                    {result.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-gray-500 text-center">Sonuç bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
