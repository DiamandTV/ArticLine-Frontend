import { LoaderResponse } from "../components/Loader/LoaderResponse";
import { StartView } from "../views/StartView";
export function PasswordResetSend(){
    return (
        <StartView>
            <LoaderResponse
                isSuccess={true}
                isWarning={false}
                isError={false}
                messages={{
                    error:"",
                    warning:"",
                    success:"An password reset link is sent to your email"
                }}
                isLoading={false}
                redirect={true}
                counterInitialValue={10}
            />
        </StartView>
    )
}