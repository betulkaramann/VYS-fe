import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "./lib/router";
import arac from './assets/home/arac.png';
import ariza from './assets/home/ariza.png';
import is from './assets/home/is.jpg';
import malzeme from './assets/home/malzeme.png';
import temizlik from './assets/home/temizlik.png';

export default function Home() {
  const jobRequests = [
    { title: "Arıza Talebi", icon: ariza, description: "Ekipman veya sistem arızaları için talep oluşturun.", path: ROUTES.ARIZA_TALEBI },
    { title: "Malzeme Talebi", icon: malzeme, description: "Gerekli malzemeler için talepte bulunun.", path: ROUTES.MALZEME_TALEBI },
    { title: "Şehir Dışı Araç Talebi", icon: arac, description: "Şehir dışı araç ihtiyaçlarınızı bildirin.", path: ROUTES.SEHIR_DISI_ARAC_TALEBI },
    { title: "Şehir İçi Araç Talebi", icon: arac, description: "Şehir içi araç taleplerinizi oluşturun.", path: ROUTES.SEHIR_ICI_ARAC_TALEBI },
    { title: "Temizlik Talebi", icon: temizlik, description: "Temizlik hizmetleri için talep gönderin.", path: ROUTES.TEMIZLIK_TALEBI },
    { title: "Yeni İş Talebi", icon: is, description: "Yeni projeler için iş talebi oluşturun.", path: ROUTES.YENI_IS_TALEBI },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {jobRequests.map((request, index) => (
          <Link href={request.path} key={index}>
            <div
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer h-full flex flex-col items-center justify-center w-full max-w-xs"
              style={{ minHeight: 340 }}
            >
              <div className="p-6 flex flex-col items-center text-center flex-1 justify-center w-full h-full">
                <div className="relative w-16 h-16 mb-4 mx-auto">
                  <Image
                    src={request.icon}
                    alt={request.title}
                    layout="fill"
                    objectFit="contain"
                    className="group-hover:animate-pulse"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 w-full text-center">{request.title}</h2>
                <p className="text-gray-600 text-sm break-words w-full text-center">{request.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}