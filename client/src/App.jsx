import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LogInPage from "./pages/LogInPage";
import Layout from "./components/LayoutComponents/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./store/UserContext";
import AcountPage from "./pages/AccountPage";
import AccomodationPage from "./pages/AccomodationPage";
import AccomodationFormPage from "./pages/AccomodationFormPage";
import AccomodationDetailsPage from "./pages/AccomodationDetailsPage";
import BookingsPage from "./pages/BookingsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AcountPage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route
            path='/account/bookings/:id'
            element={<BookingDetailsPage />}
          />
          <Route path='/account/accomodations' element={<AccomodationPage />} />
          <Route
            path='/account/accomodations/new'
            element={<AccomodationFormPage />}
          />
          <Route
            path='/account/accomodations/:id'
            element={<AccomodationFormPage />}
          />
          <Route
            path='accomodation/:id'
            element={<AccomodationDetailsPage />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
