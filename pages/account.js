import Head from 'next/head';
import { useContext } from 'react';
import Link from 'next/link';
import Authcontext from '../context/AuthContext';

export default function account() {
    const { user, logoutUser } = useContext(Authcontext);

    if (!user) {
        return (<div>
            <p>PLease login or register</p>
            <Link href="/"><a>Go Back</a></Link>
        </div>)
    }

    return (
        <div>
            <Head>
                <title>Account page</title>
                <meta name="description" content="The account page, view your orders" />
            </Head>
            <h2>Account page</h2>
            <p>Logged in as: {user.email}</p>
            <a href="#" onClick={logoutUser}>Logout</a>
        </div>
    )
}
