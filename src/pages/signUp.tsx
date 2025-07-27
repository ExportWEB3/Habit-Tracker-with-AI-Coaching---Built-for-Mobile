import { LayoutComponent } from "../components/layout";
import { PublicLayout } from "../components/publicLayout";
import { SignUp } from "../components/signUp/signUp";


export default function SignUpPage () {
    return (
        <PublicLayout>
            <SignUp />
        </PublicLayout>
    )
}