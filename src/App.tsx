import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import QRPage from './pages/QrPage';
import BoardPage from './pages/BoardPage';
import NotFound from './pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostViewPage from './pages/PostViewPage';
import FindPasswordPage from './pages/FindPasswordPage';
import PostWritePage from './pages/PostWritePage';
import KakaoCallback from './pages/KaKaoLoginCallback';
import { Layout } from '@/components/Layout';

import './App.css';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/board/write" element={<PostWritePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/find-password" element={<FindPasswordPage />} />
                <Route path="/post/:id" element={<PostViewPage />} />
                <Route path="/qr" element={<QRPage />} />
                <Route path="/oauth2/kakao/callback" element={<KakaoCallback />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
