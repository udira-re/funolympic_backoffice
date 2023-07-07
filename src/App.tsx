import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPaswordPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/headers/Navbar";
import HighlightListPage from "./pages/highlight/Highlightlist";
import AddHighLightPage from "./pages/highlight/AddHighLight";
import UserListPage from "./pages/users/UserListPage";
import LiveListPage from "./pages/live/LiveList";
import AddLivePage from "./pages/live/AddLive";
import FixtureListPage from "./pages/fixture/fixturelist";
import AddFixturePage from "./pages/fixture/AddFixture";
import { useAuth } from "./context/useAuth";
import NewsListPage from "./pages/news/Newslist";
import AddNewsPage from "./pages/news/AddNewsPage";
import LiveCommnetListPage from "./pages/live/CommentList";

function App() {
  interface PrivateRoutesProps {
    isAuthenticated: boolean;
    authenticationPath: string;
  }

  interface PublicRoutesProps {
    isAuthenticated: boolean;
    authenticationPath: string;
  }

  const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
    isAuthenticated,
    authenticationPath,
  }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={authenticationPath} />;
  };

  const PublicRoutes: React.FC<PublicRoutesProps> = ({
    isAuthenticated,
    authenticationPath,
  }) => {
    return isAuthenticated ? <Navigate to={authenticationPath} /> : <Outlet />;
  };
  const { isAuthenticated, signOut } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} signOut={signOut} />

        <Routes>
          <Route
            path="/auth/forgotPassword"
            element={
              <>
                <ForgetPasswordPage />
              </>
            }
          />
          <Route path="/auth/resetPassword" element={<ResetPasswordPage />} />
          <Route
            element={
              <PublicRoutes
                isAuthenticated={isAuthenticated}
                authenticationPath="/"
              />
            }
          >
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>
          <Route
            element={
              <PrivateRoutes
                isAuthenticated={isAuthenticated}
                authenticationPath="/auth/login"
              />
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/highlight" element={<HighlightListPage />} />
            <Route path="/add-highlight" element={<AddHighLightPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/live" element={<LiveListPage />} />
            <Route path="/add-live" element={<AddLivePage />} />
            <Route path="/add-fixture" element={<AddFixturePage />} />
            <Route path="/fixture" element={<FixtureListPage />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/add-news" element={<AddNewsPage />} />
            <Route path="/live/:id" element={<LiveCommnetListPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
