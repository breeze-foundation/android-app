import { IonCol, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import "./AppHeader.css";
import logo from "../images/logo-main.png";
import compose from "../images/icons/compose.png";

const AppHeader: React.FC = () => {
    return(
        <IonHeader>
            <IonToolbar>
              <div className="row">
                <div className="col">
                  <img src={logo} alt="logo" width="25"/>
                </div>
                <div className="col">
                  <h2>TipMeACoffee<sup>beta</sup></h2>
                </div>
                <div className="col">
                  <img src={compose} alt="post" />
                </div>
              </div>
            </IonToolbar>
        </IonHeader>
    )
}

export default AppHeader