import { HomeComponent } from "../components/homePage/homePage";
import { PublicLayout } from "../components/publicLayout";


export default function HomePage () {
    return (
        <PublicLayout>
            <HomeComponent />
        </PublicLayout>
    )
}