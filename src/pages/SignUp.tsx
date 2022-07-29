import { IonContent, IonPage } from "@ionic/react"
import AppHeader from "../components/AppHeader"

const SignUpPage: React.FC = () => {

    return (
        <IonPage>
            <AppHeader />
            <IonContent fullscreen>
                Sign up
            </IonContent>
        </IonPage>
    )
}

export default SignUpPage