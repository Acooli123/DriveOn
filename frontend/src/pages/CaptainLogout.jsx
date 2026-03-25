import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_BASE_URL}/captains/logout`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('captainToken')}`
                    }
                });
                localStorage.removeItem('captainToken');
                setCaptain(null);
                navigate('/captains/login');
            } catch (error) {
                console.log("Logout error:", error.response?.data || error.message);
                // Still clear local state even if API fails
                localStorage.removeItem('captainToken');
                setCaptain(null);
                navigate('/captains/login');
            }
        };

        logout();
    }, [navigate, setCaptain]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-lg">Logging out...</div>
        </div>
    );
};

export default CaptainLogout;