import { IonHeader, IonToolbar } from "@ionic/react";
import "./AppHeader.css";
import logo from "../images/logo-main.png";
import compose from "../images/icons/compose.png";
import { useHistory } from "react-router";

const AppHeader: React.FC = () => {

  const history = useHistory();

  const navigateToHomeFeedPage = () => {
    history.push('/');
  }

    return(
        <IonHeader>
            <IonToolbar>
              <div className="row">
                <div onClick={() => navigateToHomeFeedPage()} className="col">
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