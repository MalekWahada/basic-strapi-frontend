import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { MAGIC_PUBLIC_KEY } from '../utils/urls';

const AuthContext = createContext();
let magic;

export const AuthProvider = props => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    /**
     * Add email to user
     * @param {string} email 
     */
    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({ email });
            setUser({ email });
            router.push('/');
        } catch (error) {
            setUser(null);
        }
        setUser({ email });
        router.push('/');
    }

    /**
     * Sets the user to null
     */
    const logoutUser = async () => {
        try {
            await magic.user.logout();
            setUser(null);
            router.push('/');
        } catch (error) { }
        setUser(null);
        router.push('/');
    }

    const checkLoggedInUser = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn();
            if (isLoggedIn) {
                const { email } = await magic.user.getMetadata();
                setUser({ email });
                // Just for testing purposes
                const token = await getToken();
                console.log('checkedInUser token:', token);
            }
        } catch (error) {

        }
    }

    /**
     * Retrieve the Magic Issues bearer token,
     * It allows user to make authenticated requests.
     */
    const getToken = async () => {
        try {
            const token = await magic.user.getIdToken();
            return token;
        } catch (error) {
            
        }
    }
    useEffect(() => {
        magic = new Magic(MAGIC_PUBLIC_KEY);
        checkLoggedInUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
