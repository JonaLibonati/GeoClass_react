import { HashRouter, Route, Routes } from "react-router-dom";
import { Aashto } from "./components/aashto/Aashto";
import { GlobalFooter } from "./components/globalFooter/GlobalFooter";
import { GlobalNav } from "./components/globalNav/GlobalNav";
import { Home } from "./components/home/Home";
import { Uscs } from "./components/uscs/Uscs";
import { LangProvider } from "./contexts/LangContext";
import { AashtoProvider } from "./contexts/AashtoContext";
import { UscsProvider } from "./contexts/UscsContext";

function App() {

  return (

      <HashRouter basename="/">
        <LangProvider>
          <AashtoProvider>
            <UscsProvider>
              <div className="bg-[#F5F5F5]">
                <GlobalNav />
                  <div className="flex h-[calc(100dvh-3rem-3rem-2rem)] m-4 overflow-y-scroll">
                    <div className='flex flex-wrap justify-center content-center w-full  lg:max-w-screen-lg md:max-w-screen-md sm:max-w-sm max-w-72 m-auto text-center' >
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/uscs" element={<Uscs />} />
                          <Route path="/aashto" element={<Aashto />} />
                      </Routes>
                    </div>
                  </div>
                <GlobalFooter />
              </div>
            </UscsProvider>
          </AashtoProvider>
        </LangProvider>
      </HashRouter>

  )
}

export default App
