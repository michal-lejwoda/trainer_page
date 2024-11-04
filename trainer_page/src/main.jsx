import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CookieConsent} from "react-cookie-consent";
import {AuthProvider} from "./components/auth/AuthContext.jsx";
import "./i18n.jsx"
import './index.css'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Account from "./components/Account.jsx";
import BoxLoading from "./components/BoxLoading.jsx";
import PaymentPage from "./components/payments/PaymentPage.jsx";

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
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    appearance: {
        theme: 'night',
        labels: 'floating'
    },
};


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Suspense fallback={
                    <BoxLoading />
                }>
                    <BrowserRouter>
                        <div className="min-h-screen">
                            <Navbar/>
                            <ScrollToTop/>
                            <Elements stripe={stripePromise} options={options}>
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
                                </Routes>
                            </Elements>
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
