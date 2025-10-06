import React from 'react';
import Link from 'next/link';

function Title() {
  return (
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ fontSize: '0.8em', cursor: 'pointer' }}>
        Türkiye Cumhuriyeti Cumhurbaşkanlığı
        <div style={{ fontSize: '1em', marginTop: '5px', fontWeight: 'bold' }}>
          Varlık Yönetim Sistemi
        </div>
      </div>
    </Link>
  );
}

export default Title;