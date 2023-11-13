import {useState} from "react";
import {postRegistration} from "./api.jsx";

function Register() {
    const [name, setName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [repeat_password, setRepeatPassword] = useState("")

    const handleRegistration = (e) =>{
        e.preventDefault()
        console.log("handleRegistration")
        let form = new FormData()
        form.append("name", name)
        form.append("last_name", last_name)
        form.append("email", email)
        form.append("phone_number", phone_number)
        form.append("password", password)
        form.append("repeat_password", repeat_password)
        postRegistration(form)
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>


                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Imię
                            </label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nazwisko
                            </label>
                            <div className="mt-2">
                                <input
                                    value={last_name}
                                    onChange={(e)=>setLastName(e.target.value)}
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                                Numer Telefonu
                            </label>
                            <div className="mt-2">
                                <input
                                    value={phone_number}
                                    onChange={(e)=>setPhoneNumber(e.target.value)}
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    // autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Hasło
                                </label>
                                <div className="text-sm">
                                    {/*<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                                    {/*  Forgot password?*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="repeat_password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Powtórz hasło
                                </label>
                                <div className="text-sm">
                                    {/*<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                                    {/*  Forgot password?*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={repeat_password}
                                    onChange={(e)=>setRepeatPassword(e.target.value)}
                                    id="repeat_password"
                                    name="repeat_password"
                                    type="password"
                                    // autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleRegistration}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register