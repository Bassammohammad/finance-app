'use client';
import { useUser } from '@clerk/nextjs';

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className=" space-Y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back{isLoaded ? ', ' : ' '}
        {user?.fullName}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your financial Overview Report
      </p>
    </div>
  );
};
