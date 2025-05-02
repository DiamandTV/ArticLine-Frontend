import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
import { FaUser, FaBuilding, FaTruck } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";

export function SelectProfileTypePage() {
    const navigate = useNavigate();

    const handleSelect = (profileType: ProfileType) => {
        switch(profileType){
            case 'USER':
                navigate('/user/signin/')
                break
            case 'COMPANY':
                navigate('/company/signin/')
                break
            case 'COURIER':
                navigate('/courier/signin/')
                break
        }
    };

    return (
        <AuthenticationView>
            <div className="font-sans flex flex-col items-center gap-6 p-8">
                <h1 className="font-sans text-2xl font-bold mb-4">SELECT THE ACCOUNT TYPE</h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-6xl justify-between items-center">
                    <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center p-6 gap-2 transition-transform transform hover:scale-105 text-surface-a30 hover:text-surface-a0"
                        onClick={() => handleSelect('USER')}
                    >
                        <FaUser className="transition-transform group-hover:rotate-6 text-5xl group-hover:text-6xl xl:text-6xl xl:group-hover:text-7xl" />
                        <span>Utente</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center p-6 gap-2 transition-transform transform hover:scale-105 text-surface-a30 hover:text-surface-a0"
                        onClick={() => handleSelect('COMPANY')}
                    >
                        <FaBuilding className="transition-transform group-hover:rotate-6 text-5xl group-hover:text-6xl xl:text-6xl xl:group-hover:text-7xl" />
                        <span>Azienda</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center p-6 gap-2 transition-transform transform hover:scale-105 text-surface-a30 hover:text-surface-a0"
                        onClick={() => handleSelect('COURIER')}
                    >
                        <FaTruck className="transition-transform group-hover:rotate-6 text-5xl group-hover:text-6xl xl:text-6xl xl:group-hover:text-7xl" />
                        <span>Corriere</span>
                    </Button>
                </div>
            </div>
        </AuthenticationView>
    );
}
