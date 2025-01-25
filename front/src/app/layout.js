import './styles/global.css';
import Header from '@/app/_components/Header/Header';
import Footer from "@/app/_components/Footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header/>
        {children}
      <Footer/>
      </body>
    </html>
  );
}
