import { Route, Routes } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainPage from './pages/MainPage';
import QRPage from './pages/QrPage';
import BoardPage from './pages/BoardPage';
import NotFound from './pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import logo from '@/assets/logo.svg';
import PostPage from './pages/PostViewPage';
import FindPasswordPage from './pages/FindPasswordPage';
import PostWritePage from './pages/PostWritePage';

import './App.css';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="w-full p-4 border-b">
                <div className="container mx-auto flex justify-between items-center">
                    {/* 왼쪽 상단 - 홈 버튼 */}
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Home"
                            className="h-10 w-20 object-contain hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    {/* 오른쪽 상단 - 로그인 버튼 */}
                    <Link to="/login" className="hidden md:block">
                        <Button variant="outline">Login</Button>
                    </Link>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

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
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/qr" element={<QRPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
