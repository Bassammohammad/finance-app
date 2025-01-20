import Link from 'next/link';
import Image from 'next/image';

export const HeaderLogo = () => {
  return (
    <>
      <Link href="/" className="items-center hidden lg:flex ">
        <Image src={'/logo.svg'} alt={'logo'} width={28} height={28} />
        <p className="pl-3 text-white font-semibold"> Finance</p>
      </Link>
    </>
  );
};
