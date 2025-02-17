import { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { fetchApi } from '@/lib/utils';

const KakaoCallback = () => {
    const [searchParams] = useSearchParams();
    const { setIsLoggedIn } = useContext(AuthContext);
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
                setIsLoggedIn(true);
                alert('카카오 로그인이 완료되었습니다.');
                navigate('/');
            } catch (error) {
                console.error(error);
                alert('카카오 로그인 처리 중 오류가 발생했습니다.');
                navigate('/');
            }
        })();
    }, [searchParams]);

    return null;
};

export default KakaoCallback;
