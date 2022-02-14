import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PreferredStores from '../components/Stores/PreferredStores/PreferredStores';
const PreferredStoresPage = (props) => {
     return (
          <IonPage>
               <IonHeader>
                    <IonToolbar></IonToolbar>
               </IonHeader>

               <IonContent fullscreen scrollX={true}>
                    <PreferredStores
                         addPreferredStoreHandler={props.addPreferredStoreHandler}
                         cancelClickHandler={props.cancelClickHandler}
                         isEditing={props.isEditing}
                         isEditingHandler={props.isEditingHandler}
                         preferredStores={props.preferredStores}
                         rowUpdatedHandler={props.rowUpdatedHandler}
                         savePreferredStoresHandler={props.savePreferredStoresHandler}
                         showModalDialog={props.showModalDialog}
                    />                     
               </IonContent>
          </IonPage>
     );
};

export default PreferredStoresPage;
