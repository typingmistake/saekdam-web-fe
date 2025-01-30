import { Route, Routes, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/80 border-b shadow-sm">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Home"
                            className="h-10 w-20 object-contain hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    <div className="hidden md:flex gap-4">
                        {isLoggedIn ? (
                            <Button variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="mt-16">
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
