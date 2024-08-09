import Providers from "./components/providers";
import { AppRoutes } from "./libs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/main-page";
import Footer from "./components/layout/footer";
import NotFoundPage from "./pages/not-found/not-found";
import MainHeader from "./components/layout/main-header";
import TradePage from "./pages/trade/trade-page";

function App() {
  return (
    <Providers>
      <Router>
        <div className="flex flex-col min-h-full text-neutral-700 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-900">
          <MainHeader />
          <div className="flex-1 container px-6 md:px-8">
            <Routes>
              <Route
                path={AppRoutes.MainPage}
                caseSensitive={true}
                element={<MainPage />}
              ></Route>
              <Route
                path={AppRoutes.Trade + "/:id"}
                caseSensitive={true}
                element={<TradePage />}
              ></Route>

              <Route path={"*"} element={<NotFoundPage />}></Route>
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </Providers>
  );
}

export default App;
