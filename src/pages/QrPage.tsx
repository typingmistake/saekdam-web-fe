import qr from '@/assets/qr.svg';
import { Card } from '@/components/ui/card';

const QRPage = () => {
    return (
        <div className="container mx-auto px-4 py-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Scan the
                    <span className="block bg-primary bg-clip-text text-transparent">QR Code</span>
                </h1>

                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-12 border-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-70" />

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30" />

                    <div className="relative">
                        <img
                            src={qr}
                            alt="QR 코드"
                            className="mx-auto w-64 h-64 object-contain hover:scale-105 transition-transform"
                        />
                    </div>
                </Card>

                <p className="text-gray-600 text-lg">
                    카메라로 QR 코드를 스캔하여
                    <br />
                    앱을 다운로드 받으세요
                </p>
            </div>
        </div>
    );
};

export default QRPage;
