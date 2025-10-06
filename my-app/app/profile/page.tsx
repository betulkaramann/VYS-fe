import React from "react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border p-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden border bg-gray-100 mb-2">
              <Image
                src="/profile.jpg"
                alt="Profil"
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
            </div>
            <button className="text-xs text-gray-500 flex items-center gap-1 mt-1 hover:underline">
              <svg width="16" height="16" fill="currentColor" className="inline"><path d="M13.5 1.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h11zm-11-1A2.5 2.5 0 0 0 0 3v10A2.5 2.5 0 0 0 2.5 15h11A2.5 2.5 0 0 0 16 12.5v-10A2.5 2.5 0 0 0 13.5.5h-11z"/></svg>
              Paylaş
            </button>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="col-span-1 flex flex-col gap-1">
              <div className="text-2xl font-bold text-gray-800">BETÜL KARAMAN</div>
              <div className="text-base text-gray-700">Mühendis</div>
              <div className="text-base text-gray-700">YAZILIM DAİRE BAŞKANLIĞI</div>
              <a href="mailto:betul.karaman@TCCB.GOV.TR" className="text-blue-600 text-sm hover:underline">betul.karaman@TCCB.GOV.TR</a>
              <div className="text-base text-gray-700">Güney Bina I Blok Z Kat 09</div>
            </div>
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-2 text-base text-gray-700 border-l md:pl-8">
              <div className="flex flex-col gap-1">
                <div><span className="font-medium">Dahili:</span> 4119</div>
                <div><span className="font-medium">Harici:</span> <a href="tel:03125254119" className="text-blue-600 hover:underline">03125254119</a></div>
                <div><span className="font-medium">Cep:</span> <a href="tel:05383086361" className="text-blue-600 hover:underline">05383086361</a></div>
                <div><span className="font-medium">Cep 2:</span></div>
                <div><span className="font-medium">Fax:</span></div>
              </div>
              <div className="flex flex-col gap-1">
                <div>Tarabya Dahili</div>
                <div>Konut Dahili</div>
                <div>Lojman</div>
                <div>Telsiz</div>
                <div>Çankaya Dahili</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
