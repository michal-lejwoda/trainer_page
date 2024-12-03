import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CookieConsent} from "react-cookie-consent";
import {AuthProvider} from "./components/auth/AuthContext.jsx";
import "./i18n.jsx"
import './index.css'
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Account from "./components/Account.jsx";
import BoxLoading from "./components/BoxLoading.jsx";
import PaymentPage from "./components/payments/PaymentPage.jsx";
import TryAgainPaymentPage from "./components/payments/TryAgainPaymentPage.jsx";
import ResetPasswordBasedonEmail from "./components/auth/ResetPasswordBasedOnEmail.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./components/Homepage.jsx";
import Contact from "./components/Contact.jsx";
import Booking from "./components/booking/Booking.jsx";
import AboutMe from "./components/AboutMe.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import {t} from "i18next";

const Transformations = lazy(() => import("./components/Transformations.jsx"))
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions.jsx"))
const PrivatePolicy = lazy(() => import("./components/PrivatePolicy.jsx"))
const CookiesPolicy = lazy(() => import("./components/CookiesPolicy.jsx"))


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Suspense fallback={
                    <BoxLoading/>
                }>
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
                                <Route path="account" element={<Account/>}/>
                                <Route path="payment_page" element={<PaymentPage/>}/>
                                <Route path="pay_the_order" element={<TryAgainPaymentPage/>}/>
                            </Routes>
                            <Footer/>
                        </div>
                        <CookieConsent
                            location="bottom"
                            buttonText={t("Accept")}
                            enableDeclineButton
                            declineButtonText={t("I don't agree")}
                            cookieName="CookieConsent"
                            style={{background: "#2B373B"}}
                            buttonStyle={{color: "#4e503b", fontSize: "13px"}}
                            expires={150}
                        >
                            {t("This website uses cookies. By continuing to browse it, you agree to the Privacy" +
                                " Policy.")}<NavLink
                            to="/cookies-policy"> {t("Use more information about cookies.")}</NavLink>

                        </CookieConsent>
                    </BrowserRouter>

                </Suspense>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
