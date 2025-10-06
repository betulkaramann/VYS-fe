import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from './../../assets/cumhurbaskanligi-logo/cumhurbaskanligi-seeklogo.png';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={logoImage}
        alt="My Logo"
        width={50}
        height={50}
        style={{ cursor: 'pointer' }}
      />
    </Link>
  );
};

export default Logo;