import Header from '../Header';
import PlatformFlag from '../PlatformFlag';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <PlatformFlag />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
