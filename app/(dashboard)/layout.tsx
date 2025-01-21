import { Header } from '@/components/header';
import { SuspenseWrapper } from '@/components/suspense-wrapper';

type Props = {
  children: React.ReactNode;
};

export default function dashboardLayout({ children }: Props) {
  return (
    <SuspenseWrapper>
      <Header />
      <div>{children}</div>
    </SuspenseWrapper>
  );
}
