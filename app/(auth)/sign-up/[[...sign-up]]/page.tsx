import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      <div className=" h-full lg:flex flex-col items-center justify-center px-4 ">
        <div className="flex flex-col items-center justify-center px-4 space-y-4">
          <h1 className="text-3xl font-bold  text-[#2E2A47]">welcome back!</h1>
          <p className="text-[#7E8CA0]">
            Log in or Create an account to get back to dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 ">
          <ClerkLoaded>
            <SignUp />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-forground" />
          </ClerkLoading>
        </div>
      </div>

      <div className="bg-blue-600 h-full hidden lg:flex items-center justify-center   ">
        <Image src="logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
