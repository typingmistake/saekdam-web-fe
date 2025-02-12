import React from 'react';
import { useKakaoShare } from '../hooks/use-kakao-share';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
    kakaoKey: string;
    title: string;
    imageUrl: string;
    webUrl: string;
    social?: {
        likeCount?: number;
        commentCount?: number;
        viewCount?: number;
    };
    className?: string;
    buttonText?: string;
}

export const KakaoShareButton: React.FC<ShareButtonProps> = ({
    kakaoKey,
    title,
    imageUrl,
    webUrl,
    social = {
        likeCount: 0,
        commentCount: 0,
        viewCount: 0,
    },
    className = '',
    buttonText = '공유하기',
}) => {
    const { shareKakao } = useKakaoShare(kakaoKey);

    const handleShare = () => {
        shareKakao({
            objectType: 'feed',
            content: {
                title,
                imageUrl,
                link: {
                    mobileWebUrl: webUrl,
                    webUrl: webUrl,
                },
            },
            social,
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: webUrl,
                        webUrl: webUrl,
                    },
                },
            ],
        });
    };

    return (
        <Button
            onClick={handleShare}
            variant={'ghost'}
            className={`flex items-center gap-2 px-4 py-2 ${className}`}
        >
            <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 보내기 버튼"
                className="w-6 h-6"
            />
            <span>{buttonText}</span>
        </Button>
    );
};
