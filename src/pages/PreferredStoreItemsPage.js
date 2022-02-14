import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import PreferredStoreItems from '../components/Stores/PreferredStoreItems/PreferredStoreItems';

const PreferredStoreItemsPage = (props) => {
     return (
          <IonPage>               
               <IonHeader>
                    <IonToolbar></IonToolbar>
               </IonHeader>
               
               <IonContent fullscreen scrollX={true}>
                    <IonHeader collapse="condense">
                         <IonToolbar>
                              <IonTitle size="large">Preferred Store Items</IonTitle>
                         </IonToolbar>
                    </IonHeader>

                    <PreferredStoreItems
                         addPreferredStoreItemHandler={props.addPreferredStoreItemHandler}
                         addShoppingListItemHandler={props.addShoppingListItemHandler}
                         cancelClickHandler={props.cancelClickHandler}
                         isEditing={props.isEditing}
                         isEditingHandler={props.isEditingHandler}
                         preferredStores={props.preferredStores}
                         preferredStoreItems={props.preferredStoreItems}
                         rowUpdatedHandler={props.rowUpdatedHandler}
                         savePreferredStoreItemsHandler={props.savePreferredStoreItemsHandler}
                         saveShoppingListHandler={props.saveShoppingListHandler}
                         showModalDialog={props.showModalDialog}
                    />
               </IonContent>
          </IonPage>
     );
};

export default PreferredStoreItemsPage;