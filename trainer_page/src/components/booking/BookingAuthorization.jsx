import React from 'react';

const BookingAuthorization = props => {
    return (
        <div>
            <h1>Zarezerwuj wizytę</h1>
            <h2>Mam już konto. Zaloguj się</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                onChange={handleChange}
                value={values.email}
                id="email"
                name="email"
                type="email"
                required
                className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p>{errors.email}</p>}
            <label htmlFor="password">Hasło</label>
            <input
                value={values.password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={errors.password ? "input-error" : ""}
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && <p>{errors.password}</p>}
            <button type="submit">Zaloguj się</button>
        </form>
        </div>
    );
};



export default BookingAuthorization;
