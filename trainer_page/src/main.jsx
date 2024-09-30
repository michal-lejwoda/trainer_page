import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CookieConsent} from "react-cookie-consent";
import {AuthProvider} from "./components/auth/AuthContext.jsx";
import {Triangle} from 'react-loader-spinner';
import "./i18n.jsx"

import './index.css'

const RegisterForm = lazy(() => import("./components/auth/RegisterForm.jsx"))
const LoginForm = lazy(() => import("./components/auth/LoginForm.jsx"))
const ResetPassword = lazy(() => import("./components/auth/ResetPassword.jsx"))
const ResetPasswordBasedonEmail = lazy(() => import("./components/auth/ResetPasswordBasedOnEmail.jsx"))
const Navbar = lazy(() => import("./components/Navbar.jsx"))
const Booking = lazy(() => import("./components/booking/Booking.jsx"))
const AboutMe = lazy(() => import("./components/AboutMe.jsx"))
const Homepage = lazy(() => import("./components/Homepage.jsx"))
const Contact = lazy(() => import("./components/Contact.jsx"))
const Transformations = lazy(() => import("./components/Transformations.jsx"))
const Footer = lazy(() => import("./components/Footer.jsx"))
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions.jsx"))
const PrivatePolicy = lazy(() => import("./components/PrivatePolicy.jsx"))
const CookiesPolicy = lazy(() => import("./components/CookiesPolicy.jsx"))
const ScrollToTop = lazy(() => import("./components/ScrollToTop.jsx"))


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Suspense fallback={
                    <div className="absolute h-screen w-screen flex items-center justify-center">
                        <Triangle
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            radius="9"
                            // ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>}>
                    <BrowserRouter>
                        <div className="min-h-screen">
                            <Navbar/>
                            <ScrollToTop/>
                            <Routes>
                                <Route path="/" element={<Homepage/>}/>
                                <Route path="login" element={<LoginForm/>}/>
                                <Route path="register" element={<RegisterForm/>}/>
                                <Route path="contact" element={<Contact/>}/>
                                <Route path="reservation" element={<Booking/>}/>
                                <Route path="about-me" element={<AboutMe/>}/>
                                <Route path="transformations" element={<Transformations/>}/>
                                <Route path="terms-and-conditions" element={<TermsAndConditions/>}/>
                                <Route path="cookies-policy" element={<CookiesPolicy/>}/>
                                <Route path="private-policy" element={<PrivatePolicy/>}/>
                                <Route path="reset_password/:id/:name" element={<ResetPassword/>}/>
                                <Route path="password_reminder" element={<ResetPasswordBasedonEmail/>}/>
                            </Routes>
                            <Footer/>
                        </div>
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
                            Prywatności. <NavLink to="/cookies-policy">Uzykaj więcej informacji o plikach
                            cookie</NavLink>

                        </CookieConsent>
                    </BrowserRouter>

                </Suspense>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
