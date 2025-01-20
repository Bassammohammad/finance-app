import { Header } from '@/components/header';

type Props = {
  children: React.ReactNode;
};

export default function dashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
