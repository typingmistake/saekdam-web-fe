import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '@/lib/utils';

const KakaoCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');
        if (!code) {
            alert('인증 코드가 없습니다.');
            navigate('/');
            return;
        }

        (async () => {
            try {
                // 백엔드 엔드포인트에 code를 전달하여 JWT를 받아옴
                const jwt = await fetchApi(`/auth/oauth2/kakao/callback?code=${code}`);
                localStorage.setItem('jwt', jwt);
                navigate('/');
            } catch (error) {
                console.error(error);
                alert('카카오 로그인 처리 중 오류가 발생했습니다.');
                navigate('/');
            }
        })();
    }, [searchParams, navigate]);

    return <div>로그인 중입니다. 잠시만 기다려주세요...</div>;
};

export default KakaoCallback;
