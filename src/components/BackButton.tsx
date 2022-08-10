import { IonButton, IonIcon, IonText } from "@ionic/react"
import { useHistory } from "react-router"
import { arrowBack } from "ionicons/icons"

const GoBack=(btnText:string)=>{
    const history = useHistory();
    return(
        <IonButton fill="clear" color="fff" onClick={() =>history.goBack()}>
            <IonIcon icon={arrowBack} color="primary"/>
            &nbsp;
            <IonText color="dark">{btnText}</IonText>
        </IonButton>
    )
}

export default GoBack