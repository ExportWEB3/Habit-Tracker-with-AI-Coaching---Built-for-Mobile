import { LoginComponent } from "../components/login/login"
import { PublicLayout } from "../components/publicLayout"


export default function LoginPage () {
    return (
        <PublicLayout>
            <LoginComponent />
        </PublicLayout>
    )
}