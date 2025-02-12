import { useEffect } from 'react';

declare global {
    interface Window {
        Kakao: any;
    }
}

export const useKakaoShare = (kakaoKey: string) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
        script.integrity =
            'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
        script.crossOrigin = 'anonymous';
        script.async = true;

        script.onload = () => {
            if (window.Kakao && !window.Kakao.isInitialized()) {
                window.Kakao.init(kakaoKey);
            }
        };

        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const shareKakao = (shareData: any) => {
        if (window.Kakao?.Share) {
            window.Kakao.Share.sendDefault(shareData);
        }
    };

    return { shareKakao };
};
