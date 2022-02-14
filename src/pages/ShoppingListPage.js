import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import ShoppingListItems from '../components/ShoppingList/ShoppingListItems/ShoppingListItems';

const ShoppingListPage = (props) => {
     return (
          <IonPage>
               <IonHeader>
                    <IonToolbar></IonToolbar>
               </IonHeader>
               
               <IonContent fullscreen scrollX={true}>
                    <IonHeader collapse="condense">
                         <IonToolbar>
                              <IonTitle size="large">Shopping List</IonTitle>  
                         </IonToolbar>
                    </IonHeader>
             
                    <ShoppingListItems
                         addShoppingListItemHandler={props.addShoppingListItemHandler}
                         cancelClickHandler={props.cancelClickHandler}
                         isEditing={props.isEditing}
                         isEditingHandler={props.isEditingHandler}
                         markShoppingListItemCompleted={props.markShoppingListItemCompleted}
                         preferredStores={props.preferredStores}
                         rowUpdatedHandler={props.rowUpdatedHandler}
                         saveShoppingListHandler={props.saveShoppingListHandler}
                         shoppingList={props.shoppingList}
                         showModalDialog={props.showModalDialog}
                    />
                </IonContent>
          </IonPage>
  );
};

export default ShoppingListPage;
