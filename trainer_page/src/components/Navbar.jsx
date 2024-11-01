import {Fragment, useEffect} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {NavLink} from "react-router-dom";
import {useAuth} from "./auth/AuthContext.jsx";
import {checkIfUserLogged} from "./auth/api.jsx";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {LANGUAGES} from "../languages.jsx";
import {useTranslation} from "react-i18next";
import {t} from "i18next";


const navigation = [{name: t('Homepage'), href: '/', current: false},
    {
        name: t('About me'),
        href: '/about-me',
        current: false
    },
    {
        name: t('Reservation'),
        href: '/reservation/',
        current: false
    },
    {
        name: t('Transformations'),
        href: '/transformations/',
        current: true
    },
    {
        name: t('Contact'),
        href: '/contact/',
        current: false
    },
    {
        name: t('Account'),
        href:'/account/',
        current: false
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const [cookies, setCookie, removeCookie] = useCookies(['jwt_trainer_auth']);
    const navigate = useNavigate();
    const {i18n, t} = useTranslation();

    const moveToLogin = () => {
        removeCookie("jwt_trainer_auth")
        setAuthUser(null)
        setIsLoggedIn(false)
        navigate("/login")
    }
    const handleLogout = () => {
        removeCookie("jwt_trainer_auth")
        setAuthUser(null)
        setIsLoggedIn(false)
    }

    const onChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.value)
    };

    const handleAuthentication = async () => {
        try {
            let logged_user = await checkIfUserLogged()
            setAuthUser(logged_user)
            setIsLoggedIn(true)
        } catch (err) {
            setAuthUser(null)
            setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        handleAuthentication()
    }, [])

    return (<Disclosure as="nav" className="bg-background-black-color">
        {({open}) => (<>
            <div className="mx-auto max-w-7xl">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ml-2">
                        <Disclosure.Button
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">{t("Open main menu")}</span>
                            {open ? (<XMarkIcon className="block h-6 w-6" aria-hidden="true"/>) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>)}
                        </Disclosure.Button>
                    </div>
                    <div
                        className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start px-2">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="block h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (<NavLink
                                    to={item.href}
                                    key={item.name}
                                    className={({isActive}) => classNames(isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </NavLink>))}
                                {authUser && <NavLink
                                    className="text-gray-300 cursor-default hover:text-gray-300 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    {t("Welcome")} {authUser.name}
                                </NavLink>}
                                {authUser ? <NavLink
                                    className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
                                    onClick={handleLogout}
                                >
                                    {t("Log out")}
                                </NavLink> : <NavLink
                                    to="/login"
                                    className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
                                    onClick={moveToLogin}
                                >
                                    {t("Log in")}
                                </NavLink>}
                                <select className="menu__language--select navbar__select"
                                        value={i18n.language}
                                        onChange={onChangeLanguage}
                                >
                                    {LANGUAGES.map(({code, label}) => (
                                        <option key={code} value={code}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Disclosure.Panel className="sm:hidden">
                {({close}) => (<div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (<NavLink
                            key={item.name}
                            to={item.href}
                            onClick={() => {
                                close();
                            }}
                            className={({isActive}) => classNames(isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </NavLink>

                    ))}
                    {authUser && <NavLink
                        className="text-gray-300 cursor-default hover:text-gray-300 rounded-md px-3 py-2 text-sm font-medium"
                    >
                        {t("Welcome")} {authUser.name}
                    </NavLink>}
                    {authUser ? <NavLink
                        onClick={handleLogout}
                        className={({isActive}) => classNames(isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                    >
                        {t("Log out")}
                    </NavLink> : <NavLink
                        to="/login"
                        className={({isActive}) => classNames(isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                    >
                        {t("Log in")}
                    </NavLink>}
                    <select className="menu__language--select navbar__select"
                            value={i18n.language}
                            onChange={onChangeLanguage}
                    >
                        {LANGUAGES.map(({code, label}) => (<option key={code} value={code}>
                            {label}
                        </option>))}
                    </select>
                </div>)}
            </Disclosure.Panel>
            <hr/>
        </>)}
    </Disclosure>)
}