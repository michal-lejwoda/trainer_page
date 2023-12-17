import React from 'react'
import ReactDOM from 'react-dom/client'
import Contact from "./components/Contact.jsx";
import Navbar from "./components/Navbar.jsx"
import AboutMe from "./components/AboutMe.jsx"
import './index.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Transformations from "./components/Transformations.jsx";
import Footer from "./components/Footer.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import CookiesPolicy from "./components/CookiesPolicy.jsx";
import PrivatePolicy from "./components/PrivatePolicy.jsx";
import {CookieConsent} from "react-cookie-consent";
import ScrollToTop from "./components/ScrollToTop.jsx"
import {QueryClient, QueryClientProvider} from "react-query";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import {AuthProvider} from "./components/auth/AuthContext.jsx";
import Booking from "./components/booking/Booking.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import ResetPasswordBasedonEmail from "./components/auth/ResetPasswordBasedOnEmail.jsx";


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Navbar/>
                    <ScrollToTop/>
                    <Routes>
                        <Route path="/" element={<Homepage />}/>
                        <Route path="login" element={<LoginForm />}/>
                        <Route path="register" element={<RegisterForm />}/>
                        <Route path="contact" element={<Contact />}/>
                        <Route path="reservation" element={<Booking />}/>
                        <Route path="about-me" element={<AboutMe />}/>
                        <Route path="transformations" element={<Transformations />}/>
                        <Route path="terms-and-conditions" element={<TermsAndConditions />}/>
                        <Route path="cookies-policy" element={<CookiesPolicy />}/>
                        <Route path="private-policy" element={<PrivatePolicy />}/>
                        <Route path="reset_password/:id/:name" element={<ResetPassword />}/>
                        <Route path="password_reminder" element={<ResetPasswordBasedonEmail />} />
                    </Routes>
                    <Footer/>
                    <CookieConsent
                        location="bottom"
                        buttonText="Akceptuję"
                        enableDeclineButton
                        declineButtonText="Nie zgadzam się"
                        cookieName="myAwesomeCookieName2"
                        style={{background: "#2B373B"}}
                        buttonStyle={{color: "#4e503b", fontSize: "13px"}}
                        expires={150}
                    >
                        Ta strona używa plików cookie. Kontynuując jej przeglądanie, wyrażasz zgodę na Politykę
                        Prywatności. <NavLink to="/cookies-policy">Uzykaj więcej informacji o plikach cookie</NavLink>

                    </CookieConsent>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>

        {/*<RouterProvider router={router}/>*/}
    </React.StrictMode>,
)
