import NotFoundIcon from '@/assets/icon/NotFoundIcon.png'
import Logo from '@/assets/icon/Logo.svg'
import Image from 'next/image';
import Link from 'next/link';


export default function NotFound() {
  return (
    <>
      <div className="flex items-center  p-5 ">
        <Image src={Logo} alt="Kelarin Logo" width={40} height={40} />
        <span className="ml-2 text-2xl font-semibold">Kelarin</span>
      </div>

    <div className="flex flex-col items-center justify-center bg-white mt-20 ">
      <div className="flex gap-56 items-center justify-center">
        <Image src={NotFoundIcon} alt="404 Astronaut" width={400} height={400} />
        <div className='flex flex-col items-start justify-start'>
        <h1 className="text-5xl font-bold text-purple-600 mt-8">Oops</h1>
        <p className="text-2xl mt-4 w-80 tracking-wide">
          We couldn’t find the page you were looking for
        </p>
        <Link href="/home" className="bg-purple-600 text-white py-2 px-6 rounded-lg mt-5">
          Go home
        </Link>
        </div>
      </div>
    </div>
    </>
  );
}