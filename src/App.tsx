import Providers from "./components/providers";
import { AppRoutes } from "./libs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main-page/main-page";
import Footer from "./components/layout/footer";
import NotFoundPage from "./pages/not-found/not-found";


function App() {
  return (
    <Providers>
      <Router>
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <Routes>
              <Route
                path={AppRoutes.MainPage}
                caseSensitive={true}
                element={<MainPage />}
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
