import addIcon from "../../../images/add.png";
import deleteIcon from "../../../images/delete.png";

import ModalDialog from '../../ModalDialog/ModalDialog';

import { IonCol, IonImg, IonInput, IonRow } from '@ionic/react';

// Gets all Preferred Store Items for the given PreferredStoreName passed as a prop
const PreferredStoreItemsForStore = props => {
     const preferredStoreItemsForStore = [...new Set(props.preferredStoreItems.filter(preferredStoreItem => preferredStoreItem.PreferredStoreName === props.preferredStoreName && preferredStoreItem.IsDeleted !== true))];
     
     const addPreferredStoreItemToShoppingListHandler = (preferredStoreItemID,preferredStoreID) => {
          const storeName=props.preferredStores.filter(preferredStore => preferredStore.PreferredStoreID === preferredStoreID).map(preferredStore => preferredStore.PreferredStoreName);

          const newShoppingListItem = {"PreferredStoreItemID": preferredStoreItemID, "StoreName": storeName, "Qty": 1,"IsAdded": true }

          props.addShoppingListItemHandler(newShoppingListItem,true);
  
          props.showModalDialog("This item has been added to the shopping list");
     }

     const deletePreferredStoreItemHandler = (ID) => {
          props.setPreferredStoreItemIDToDelete(ID);

          props.setDeleteDialogVisible(true);
     }

     const deletePreferredStoreItemOKHandler = () => {
          props.rowUpdatedHandler("PreferredStoreItems", props.preferredStoreItemIDToDelete,"",null);

          props.setDeleteDialogVisible(false);
     };

     const deletePreferredStoreItemCancelHandler = () => {
          props.setDeleteDialogVisible(false);
     };     

     return preferredStoreItemsForStore.map(preferredStoreItemForStore =>
          <IonRow key={preferredStoreItemForStore.PreferredStoreItemID}>
                <IonCol size={props.preferredStoreItemsColumnSizes.ID}>
                    {!preferredStoreItemForStore.IsAdded ? preferredStoreItemForStore.PreferredStoreItemID : '' 
                    }
               </IonCol>

               {!props.isEditing &&
                    <IonCol size={props.preferredStoreItemsColumnSizes.Name_IsNotEditing}>{preferredStoreItemForStore.Name}</IonCol>
               }

               {props.isEditing &&
                    <IonCol size={props.preferredStoreItemsColumnSizes.Name_IsEditing}>
                         <IonInput type="text" placeholder={preferredStoreItemForStore.Name} value={preferredStoreItemForStore.Name} onIonChange={() => props.rowUpdatedHandler("PreferredStoreItems", preferredStoreItemForStore.PreferredStoreItemID,"Name")} />
                    </IonCol>
               }

               {!props.isEditing &&
                    <IonCol size={props.preferredStoreItemsColumnSizes.Notes_IsNotEditing}>{preferredStoreItemForStore.Notes}</IonCol>
               }

               {props.isEditing &&
                    <IonCol size={props.preferredStoreItemsColumnSizes.Notes_IsEditing}>
                         <IonInput type="text" placeholder={preferredStoreItemForStore.Notes} value={preferredStoreItemForStore.Notes} onIonChange={() => props.rowUpdatedHandler("PreferredStoreItems", preferredStoreItemForStore.PreferredStoreItemID,"Notes")} />
                    </IonCol>
               }

               {props.isEditing &&
                    <IonCol size={props.preferredStoreItemsColumnSizes.DeletePreferredStoreItem_IsEditing}>
                         <IonImg src={deleteIcon} alt="delete" className="icon" onClick={() => deletePreferredStoreItemHandler(preferredStoreItemForStore.PreferredStoreItemID)} />
                    </IonCol>
               }

               {!props.isEditing &&
                    <IonCol size={props.preferredStoreItemsColumnSizes.DeletePreferredStoreItem_IsNotEditing}>
                         <IonImg src={addIcon} onClick={() => addPreferredStoreItemToShoppingListHandler(preferredStoreItemForStore.PreferredStoreItemID,preferredStoreItemForStore.PreferredStoreID,preferredStoreItemForStore.Notes)} className="icon" />
                    </IonCol>
               }

               <ModalDialog isOpen={props.deleteDialogVisible} title='Delete Preferred Store Item ?' okHandler={deletePreferredStoreItemOKHandler} cancelHandler={deletePreferredStoreItemCancelHandler} modalDialogPrompt={true} />
         </IonRow>
    )
};

export default PreferredStoreItemsForStore;