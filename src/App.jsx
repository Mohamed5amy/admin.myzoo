import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, RequireAuth } from "react-auth-kit";

// Users Pages
import Users_List from "./pages/Users/List";
import Users_Edit from "./pages/Users/Edit";

// Countries Pages
import Countries_List from "./pages/Countries/List";
import Countries_Add from "./pages/Countries/Add";
import Countries_Edit from "./pages/Countries/Edit";
// Cities Pages
import Cities_List from "./pages/Cities/List";
import Cities_Add from "./pages/Cities/Add";
import Cities_Edit from "./pages/Cities/Edit";
// Categories Pages
import Categories_List from "./pages/Categories/List";
import Categories_Add from "./pages/Categories/Add";
import Categories_Edit from "./pages/Categories/Edit";
// Subcategories Pages
import SCategories_List from "./pages/SCategories/List";
import SCategories_Add from "./pages/SCategories/Add";
import SCategories_Edit from "./pages/SCategories/Edit";
// Ads Pages
import Ads_List from "./pages/Ads/List";
import Ads_Edit from "./pages/Ads/Edit";
import Ads_Profile from "./pages/Ads/Profile";

function App() {

  const theme = createTheme({
      direction : "ltr",
      palette : {
          primary : {
              main : "#3D7EC1",
              secondary : "#F4F7FB",
              border : "#DEE3E2",
              icons : "#4d5b8f",
              logo : "#818282",
              whiteBg : "#FCFDFD",
              bg : "#f4f6f5",
              inputs : "#EEF1F1",
              errorBg : "#F7E8F1",
              successBg : "#E0F5E6",
              background: "#ECEFF9",
              white: "#FBFCFE",
          },
          secondary : {
              main : "#F4F7FB",
          },
          text : {
              primary : "#050F0D",
              secondary : "#35413E",
              third : "#6E7775",
              placeholder : "#E6EAE9",
              light : "#e9efff"
          }
      },
      typography : {
          fontFamily : "'Poppins', sans-serif",
          h1 : {
              fontSize : "64px",
              fontWeight : "600",
              lineHeight : "140%"
          },
          h2 : {
              fontSize : "32px",
              fontWeight : "600",
              lineHeight : "140%"
          },
          h3 : {
              fontSize : "24px",
              fontWeight : "600",
              lineHeight : "150%"
          },
          h4 : {
              fontSize : 22,
              fontWeight : "500",
              lineHeight : "160%"
          },
          h5 : {
              fontSize : "20px",
              fontWeight : "500",
              lineHeight : "140%"
          },
          title : {
              fontSize : "18px",
              fontWeight : "500",
              lineHeight : "140%",
          },
          subtitle : {
              fontSize : "16px",
              fontWeight : "500",
              lineHeight : "140%",
          },
          button : {
              fontSize : "16px",
              fontWeight : "500",
              textTransform : "capitalize",
              lineHeight : "auto",
              color : "text.light"
          },
          breadcrumbs : {
              fontSize : "14px",
              fontWeight : "500",
              lineHeight : "auto",
          },
          body : {
              fontSize : "14px",
              fontWeight : "400",
              lineHeight : "140%",
          },
          inputs : {
              fontSize : "14px",
              fontWeight : "400",
              lineHeight : "auto",
          },
          label : {
              fontSize : "14px",
              fontWeight : "400",
              lineHeight : "140%"
          },
      },
      spacing : 2
  })
    
  return (
    <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        // cookieSecure={window.location.protocol === "https:"}
    >
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <MyApp />
              <ToastContainer position="bottom-right" />
          </Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}

const MyApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/" />
                {/* Users */}
                <Route path="/users" element={<RequireAuth loginPath="/"><Users_List /></RequireAuth>} />
                <Route path="/users/edit/:id" element={<RequireAuth loginPath="/"><Users_Edit /></RequireAuth>} />
                {/* Countries */}
                <Route path="/countries" element={<RequireAuth loginPath="/"><Countries_List /></RequireAuth>} />
                <Route path="/countries/edit/:id" element={<RequireAuth loginPath="/"><Countries_Edit /></RequireAuth>} />
                <Route path="/countries/add" element={<RequireAuth loginPath="/"><Countries_Add /></RequireAuth>} />
                {/* Cities */}
                <Route path="/cities" element={<RequireAuth loginPath="/"><Cities_List /></RequireAuth>} />
                <Route path="/cities/edit/:id" element={<RequireAuth loginPath="/"><Cities_Edit /></RequireAuth>} />
                <Route path="/cities/add" element={<RequireAuth loginPath="/"><Cities_Add /></RequireAuth>} />
                {/* Categories */}
                <Route path="/categories" element={<RequireAuth loginPath="/"><Categories_List /></RequireAuth>} />
                <Route path="/categories/edit/:id" element={<RequireAuth loginPath="/"><Categories_Edit /></RequireAuth>} />
                <Route path="/categories/add" element={<RequireAuth loginPath="/"><Categories_Add /></RequireAuth>} />
                {/* Subcategories */}
                <Route path="/sub-categories" element={<RequireAuth loginPath="/"><SCategories_List /></RequireAuth>} />
                <Route path="/sub-categories/edit/:id" element={<RequireAuth loginPath="/"><SCategories_Edit /></RequireAuth>} />
                <Route path="/sub-categories/add" element={<RequireAuth loginPath="/"><SCategories_Add /></RequireAuth>} />
                {/* Ads */}
                <Route path="/ads" element={<RequireAuth loginPath="/"><Ads_List /></RequireAuth>} />
                <Route path="/ads/edit/:id" element={<RequireAuth loginPath="/"><Ads_Edit /></RequireAuth>} />
                <Route path="/ads/:id" element={<RequireAuth loginPath="/"><Ads_Profile /></RequireAuth>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
