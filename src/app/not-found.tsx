import Link from "next/link";
// import {Header, Footer} from "@/components";
import "@/commons/styles/globals.css";
import {GlobalContextProvider} from "@/context/global";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="bg-bgc font-fontcustom flex flex-col min-h-screen">
            <GlobalContextProvider>
              {/* <Header /> */}
              <h2>There was a problem</h2>
              <p>We could not find the page you are looking for</p>
              <Link href="/" className="bg-blue-500 text-center">
                Home
              </Link>
              {/* <Footer /> */}
            </GlobalContextProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
