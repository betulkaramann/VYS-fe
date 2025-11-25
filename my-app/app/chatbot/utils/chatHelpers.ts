// Chatbot yardımcı fonksiyonları

export const formatMessage = (text: string): string => {
    // Markdown benzeri formatlamayı destekle
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
};

export const extractQuickInfo = (text: string): {
    hasNumbers: boolean;
    hasQuestions: boolean;
    urgency: 'low' | 'medium' | 'high';
} => {
    const hasNumbers = /\d+/.test(text);
    const hasQuestions = text.includes('?') || text.includes('kaç') || text.includes('nerede') || text.includes('kim');
    
    const lowerText = text.toLowerCase();
    let urgency: 'low' | 'medium' | 'high' = 'low';
    if (lowerText.includes('acil') || lowerText.includes('hemen') || lowerText.includes('çok önemli')) {
        urgency = 'high';
    } else if (lowerText.includes('önemli') || lowerText.includes('hızlı')) {
        urgency = 'medium';
    }
    
    return { hasNumbers, hasQuestions, urgency };
};

export const generateQuickResponse = (intent: string, data?: any): string => {
    const responses: Record<string, string> = {
        'greeting': 'Merhaba! Size nasıl yardımcı olabilirim?',
        'ariza': 'Arıza talebinizi oluşturuyorum...',
        'temizlik': 'Temizlik talebinizi kaydediyorum...',
        'malzeme': 'Malzeme talebinizi işleme alıyorum...',
    };
    
    return responses[intent] || 'İşleminiz gerçekleştiriliyor...';
};

