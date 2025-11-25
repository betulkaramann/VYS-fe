'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "./lib/router";

import arac from './assets/home/arac.png';
import ariza from './assets/home/ariza.png';
import is from './assets/home/is.jpg';
import malzeme from './assets/home/malzeme.png';
import temizlik from './assets/home/temizlik.png';

import { ArrowRight, TrendingUp, Users, Clock, Bot, Send, X, Sparkles, Lightbulb, Zap } from 'lucide-react';
import { FadeIn, SlideInLeft, ScaleIn } from './components/common/PageTransition';
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatModel } from './chatbot/models/AIModel';

// Initialize AI
const aiModel = new ChatModel();

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    suggestions?: string[];
    entities?: Array<{ type: string; value: string }>;
};

export default function Home() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: 1, 
            text: "👋 Merhaba! Varlık Yönetim Sistemi asistanıyım.\n\nÇalışan komutlar:\n• \"Klima bozuldu\" - Arıza bildirme\n• \"Kalem lazım\" - Malzeme talebi\n• \"Kızılay'a araç istiyorum\" - Şehir içi araç talebi\n• \"İstanbul araç\" - Şehir dışı araç talebi\n• \"Yeni iş talebi\" - Yeni iş talebi\n• \"Temizlik istiyorum\" - Temizlik talebi\n• \"Taleplerimi göster\" - Talep sorgulama\n• \"Envanter durumu\" - Envanter sorgulama\n• \"İstatistikler\" - Dashboard", 
            sender: 'bot',
            suggestions: ["Klima bozuldu", "Kalem lazım", "Kızılay'a araç istiyorum", "Yeni iş talebi", "Temizlik istiyorum"]
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const jobRequests = [
        { title: "Arıza Talebi", icon: ariza, description: "Ekipman veya sistem arızaları için talep oluşturun.", path: ROUTES.ARIZA_TALEBI },
        { title: "Malzeme Talebi", icon: malzeme, description: "Gerekli malzemeler için talepte bulunun.", path: ROUTES.MALZEME_TALEBI },
        { title: "Şehir Dışı Araç Talebi", icon: arac, description: "Şehir dışı araç ihtiyaçlarınızı bildirin.", path: ROUTES.SEHIR_DISI_ARAC_TALEBI },
        { title: "Şehir İçi Araç Talebi", icon: arac, description: "Şehir içi araç taleplerinizi oluşturun.", path: ROUTES.SEHIR_ICI_ARAC_TALEBI },
        { title: "Temizlik Talebi", icon: temizlik, description: "Temizlik hizmetleri için talep gönderin.", path: ROUTES.TEMIZLIK_TALEBI },
        { title: "Yeni İş Talebi", icon: is, description: "Yeni projeler için iş talebi oluşturun.", path: ROUTES.YENI_IS_TALEBI },
    ];

    const stats = [
        { label: 'Aktif Talepler', value: '47', icon: TrendingUp, color: 'text-blue-600' },
        { label: 'Toplam Kullanıcı', value: '245', icon: Users, color: 'text-green-600' },
        { label: 'Ort. Çözüm Süresi', value: '2.3 gün', icon: Clock, color: 'text-purple-600' },
    ];

    const filteredRequests = jobRequests.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!chatInput.trim()) return;

        const userText = chatInput;

        setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
        setChatInput('');
        setIsTyping(true);

        // Basit ve hızlı işleme
        setTimeout(() => {
            try {
                const prediction = aiModel.predict(userText);
                console.log('🔍 Prediction:', prediction);

                let responseText = "";
                let targetRoute: string | null = null;

                if (prediction.intent) {
                    // Intent bulundu - cevap ve route al
                    responseText = aiModel.getResponse(prediction.intent, prediction.data, userText);
                    targetRoute = prediction.intent.route;
                    
                    console.log('✅ Intent:', prediction.intent.id, 'Route:', targetRoute);
                } else {
                    // Intent bulunamadı
                    responseText = "Üzgünüm, bunu anlayamadım. Lütfen şu örneklerden birini deneyin:\n• \"Klima bozuldu\" - Arıza bildirme\n• \"Kalem lazım\" - Malzeme talebi\n• \"Kızılay'a araç istiyorum\" - Şehir içi araç\n• \"İstanbul araç\" - Şehir dışı araç\n• \"Yeni iş talebi\" - Yeni iş talebi\n• \"Temizlik istiyorum\" - Temizlik talebi\n• \"Taleplerimi göster\" - Talep sorgulama\n• \"Envanter durumu\" - Envanter sorgulama\n• \"İstatistikler\" - Dashboard";
                    console.warn('❌ No intent found for:', userText);
                }

                // Mesajı ekle
                setMessages(prev => [...prev, { 
                    id: Date.now() + 1, 
                    text: responseText, 
                    sender: 'bot'
                }]);
                setIsTyping(false);

                // Yönlendirme - HEMEN YAP (setTimeout kaldırıldı)
                if (targetRoute && prediction.intent) {
                    // Route'u düzelt
                    let fullRoute = targetRoute;
                    if (!fullRoute.startsWith('/')) {
                        fullRoute = `/${fullRoute}`;
                    }
                    
                    // URL oluştur (navigate intent'ler için desc parametresi)
                    let url = fullRoute;
                    if (['ariza', 'malzeme', 'sehir-ici-arac', 'sehir-disi-arac', 'yeni-is', 'temizlik'].includes(prediction.intent.id)) {
                        url = `${fullRoute}?desc=${encodeURIComponent(userText)}`;
                    }
                    
                    console.log('🚀 Navigating to:', url);
                    
                    // İstatistikler için 10 saniye bekle, diğerleri için 500ms
                    const delay = prediction.intent.id === 'istatistik' ? 10000 : 500;
                    
                    setTimeout(() => {
                        router.push(url);
                    }, delay);
                }

            } catch (error) {
                console.error('Chatbot error:', error);
                setMessages(prev => [...prev, { 
                    id: Date.now() + 1, 
                    text: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.", 
                    sender: 'bot'
                }]);
                setIsTyping(false);
            }
        }, 500);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setChatInput(suggestion);
        // Hemen gönder
        setTimeout(() => {
            const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
            handleSendMessage(fakeEvent);
        }, 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-gray-100 relative">

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <SlideInLeft>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Varlık Yönetim Sistemi'ne Hoş Geldiniz
                        </h1>
                        <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl">
                            Kurumsal varlıklarınızı etkin bir şekilde yönetin, taleplerinizi kolayca oluşturun ve takip edin.
                        </p>
                    </SlideInLeft>

                    <FadeIn delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
                                    <stat.icon className="w-10 h-10 text-red-100" />
                                    <div>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-sm text-red-100">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <FadeIn delay={0.3}>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hızlı İşlemler</h2>
                        <p className="text-gray-600">İhtiyacınız olan talebi seçin ve hızlıca oluşturun</p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Talep türü ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                        />
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredRequests.map((request, index) => (
                        <ScaleIn key={index} delay={0.1 * index}>
                            <Link href={request.path}>
                                <div
                                    className="relative bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer h-full"
                                    style={{ minHeight: 320 }}
                                >
                                    <div className="p-6 flex flex-col items-center text-center h-full">
                                        <div className="relative w-20 h-20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={request.icon}
                                                alt={request.title}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                                            {request.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                                            {request.description}
                                        </p>
                                        <div className="flex items-center text-red-600 font-medium group-hover:gap-2 transition-all">
                                            <span>Talep Oluştur</span>
                                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </Link>
                        </ScaleIn>
                    ))}
                </div>

                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aradığınız talep türü bulunamadı.</p>
                    </div>
                )}

                <FadeIn delay={0.5}>
                    <div className="bg-white rounded-xl shadow-md p-8 mt-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Diğer İşlemler</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href={ROUTES.DASHBOARD} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                                <div className="text-blue-600 font-semibold">→ Yönetim Paneli</div>
                            </Link>
                            <Link href={ROUTES.REQUESTS} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                                <div className="text-purple-600 font-semibold">→ Taleplerim</div>
                            </Link>
                            <Link href={ROUTES.INVENTORY} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                                <div className="text-green-600 font-semibold">→ Envanter</div>
                            </Link>
                            <Link href={ROUTES.ANALYTICS} className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                                <div className="text-orange-600 font-semibold">→ Raporlar</div>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Chat Assistant */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-2xl w-[350px] h-[450px] flex flex-col overflow-hidden mb-4 border border-red-100"
                        >
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex items-center justify-between text-white shadow-md">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 p-1.5 rounded-full animate-pulse">
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Akıllı Asistan</h3>
                                        <p className="text-xs text-red-100">VYS - Varlık Yönetim Sistemi</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => {
                                            setMessages([{ 
                                                id: 1, 
                                                text: "👋 Merhaba! Varlık Yönetim Sistemi asistanıyım.\n\nÇalışan komutlar:\n• \"Klima bozuldu\" - Arıza bildirme\n• \"Kalem lazım\" - Malzeme talebi\n• \"Taleplerimi göster\" - Talep sorgulama\n• \"Envanter durumu\" - Envanter sorgulama\n• \"İstatistikler\" - Dashboard", 
                                                sender: 'bot',
                                                suggestions: ["Klima bozuldu", "Kalem lazım", "Taleplerimi göster", "Envanter durumu", "İstatistikler"]
                                            }]);
                                        }} 
                                        className="hover:bg-white/20 p-1.5 rounded transition" 
                                        title="Konuşmayı Sıfırla"
                                    >
                                        <Sparkles size={16} />
                                    </button>
                                    <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Quick Actions */}
                            {messages.length <= 1 && (
                                <div className="px-4 pt-3 pb-2 bg-red-50 border-b border-red-100">
                                    <p className="text-xs text-gray-600 mb-2 font-medium">Hızlı İşlemler:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleSuggestionClick("Taleplerimi göster")}
                                            className="px-3 py-1.5 bg-white hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors border border-red-200"
                                        >
                                            📋 Taleplerim
                                        </button>
                                        <button
                                            onClick={() => handleSuggestionClick("Envanter durumu")}
                                            className="px-3 py-1.5 bg-white hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors border border-red-200"
                                        >
                                            📦 Envanter
                                        </button>
                                        <button
                                            onClick={() => handleSuggestionClick("İstatistikler")}
                                            className="px-3 py-1.5 bg-white hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors border border-red-200"
                                        >
                                            📊 İstatistikler
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                                                msg.sender === 'user'
                                                    ? 'bg-red-600 text-white rounded-br-none'
                                                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                                            }`}
                                        >
                                            <div className="whitespace-pre-line">{msg.text}</div>
                                        </div>
                                        
                                        {/* Suggestions */}
                                        {msg.suggestions && msg.suggestions.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2 max-w-[80%]">
                                                {msg.suggestions.map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-full text-xs font-medium transition-colors flex items-center gap-1 border border-red-200 cursor-pointer"
                                                    >
                                                        <Zap size={12} />
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 flex gap-1 items-center shadow-sm">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Mesajınızı yazın... (Örn: 'Klima bozuldu', 'Taleplerimi göster')"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                        className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-red-500 rounded-xl px-4 py-2 text-sm outline-none transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!chatInput.trim() || isTyping}
                                        className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                                        title="Gönder (Enter)"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 px-1">
                                    💡 İpucu: "Kaç talep var?", "Düşük stok var mı?", "Bilgisayar nerede?" gibi sorular sorabilirsiniz
                                </p>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg shadow-red-600/30 flex items-center gap-2 group"
                >
                    {isChatOpen ? (
                        <X size={24} />
                    ) : (
                        <>
                            <Bot size={24} className="animate-pulse" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium">
                                Asistan
                            </span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}