import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from '@/components/ui/sheet';
import { AuthContext } from '@/context/AuthContext';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { fetchApi } from '@/lib/utils';
import logo from '@/assets/logo.svg';

interface User {
    username: string;
    email: string;
    avatar: string | null;
}

export const Layout = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { toast } = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setIsLoggedIn(!!token);
        if (token) {
            fetchApi('/users/me', { method: 'GET' }).then((data) => {
                setUser({
                    ...data,
                    avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${data.username}`,
                });
            });
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setUser(null);
        setIsOpen(false);
        navigate('/');
        toast({
            title: '로그아웃 되었습니다.',
        });
    };

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        navigate(path);
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

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>메뉴</SheetTitle>
                                <SheetDescription>색담 : 색을 담다</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-6">
                                {isLoggedIn && user && (
                                    <div className="flex items-center gap-4 p-4 border-b">
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${
                                                    user?.username || '익명'
                                                }`}
                                            />
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.username}</span>
                                            <span className="text-sm text-gray-500">
                                                {user?.email || '이메일 없음'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {isLoggedIn ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleNavigation('/board')}
                                        >
                                            게시판
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleNavigation('/qr')}
                                        >
                                            앱다운로드
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={handleLogout}
                                        >
                                            로그아웃
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleNavigation('/login')}
                                        >
                                            로그인
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleNavigation('/signup')}
                                        >
                                            회원가입
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleNavigation('/board')}
                                        >
                                            게시판
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleNavigation('/qr')}
                                        >
                                            앱다운로드
                                        </Button>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <main className="mt-16">
                <Outlet />
            </main>
        </div>
    );
};
