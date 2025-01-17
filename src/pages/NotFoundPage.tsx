import { Button, Typography } from '@material-tailwind/react';
import { FlagIcon } from '@heroicons/react/24/solid';
import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

type MyButtonProps = ComponentProps<typeof Button>;
type MyTypographyProps = ComponentProps<typeof Typography>;

export function NotFound() {
    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div>
                <FlagIcon className="w-20 h-20 mx-auto" />
                <Typography
                    {...({} as MyTypographyProps)}
                    variant="h1"
                    color="blue-gray"
                    className="mt-10 !text-3xl !leading-snug md:!text-4xl"
                >
                    Error 404 <br /> 존재하지 않는 페이지입니다.
                </Typography>
                <Typography
                    {...({} as MyTypographyProps)}
                    className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm"
                >
                    죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
                </Typography>
                <Link to="/">
                    <Button
                        {...({} as MyButtonProps)}
                        color="gray"
                        className="w-full px-4 md:w-[8rem]"
                    >
                        back home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
