import React, {useEffect, useState} from 'react';

import add from "../../../images/add.png";

import { IonCol, IonImg, IonInput, IonRow, IonSelect, IonSelectOption } from '@ionic/react';

const AddShoppingListItem = props => {
     const [newShoppingListItemName, setNewShoppingListItemNameHandler] = useState('');
     const [newShoppingListQty, setNewShoppingListQtyHandler] = useState(0);
     const [newShoppingListItemNotes, setNewShoppingListItemNotesHandler] = useState('');
     const [newShoppingListItemStoreID, setNewShoppingListItemStoreIDHandler] = useState(0);

     const setNewShoppingListItemNameClickHandler = (event) => {
          //console.log(`Here when val = ${event.target.value} and newShoppingListItemName=${newShoppingListItemName}`)
          setNewShoppingListItemNameHandler(event.target.value);
     }

     const setNewShoppingListItemQtyClickHandler = (event) => {
          setNewShoppingListQtyHandler(event.target.value);
     }
     
     const setNewShoppingListItemNotesClickHandler = (event) => {
          setNewShoppingListItemNotesHandler(event.target.value);
     }     

     const setNewShoppingListItemStoreIDClickHandler = (event) => {
          if (typeof event.target.value === "number") {
               setNewShoppingListItemStoreIDHandler(event.target.value);
          }
     }

     const savePreferredStoreItemClickHandler = () => {
          if (newShoppingListItemName === '') {
               props.showModalDialog("Please enter a name");
               return;
          }

          if (newShoppingListQty === 0) {
               props.showModalDialog("Please enter a qty");
               return;
          }

          const randomID=Math.floor((Math.random() * 20000) + 10000); // Random ID is needed in case we want to delete an added item, in which case there has to be an ID referenced

          const newStoreName=props.preferredStores.filter(store => store.PreferredStoreID === newShoppingListItemStoreID).map(store => store.PreferredStoreName);

          const newShoppingListItem = {"ShoppingListItemID": randomID, "Name": newShoppingListItemName, "PreferredStoreID": newShoppingListItemStoreID, "StoreName": newStoreName, "Qty": parseInt(newShoppingListQty), "Notes": newShoppingListItemNotes,"IsAdded": true }

          props.addShoppingListItemHandler(newShoppingListItem);          
     };

     useEffect(() => {
          setNewShoppingListItemNameHandler('');

          setNewShoppingListQtyHandler(0);

          setNewShoppingListItemNotesHandler('')

          setNewShoppingListItemStoreIDHandler('');
     }, [props.shoppingList]);

     return (
          <IonRow>
               <IonCol size={props.shoppingListItemsColumnSizes.ID}>
                    <IonImg src={add} alt="add" className="icon" onClick={savePreferredStoreItemClickHandler}  />
               </IonCol>

               <IonCol size={props.shoppingListItemsColumnSizes.Store}>
                    <IonSelect onIonChange={setNewShoppingListItemStoreIDClickHandler} className="myDropdown">
                         {props.preferredStores.map(preferredStore =>
                              <IonSelectOption key={preferredStore.PreferredStoreID} eventKey={preferredStore.PreferredStoreID} value={preferredStore.PreferredStoreID}>{preferredStore.PreferredStoreName}</IonSelectOption>
                         )}
                    </IonSelect>
               </IonCol>

               <IonCol size={props.shoppingListItemsColumnSizes.Item}>
                    <IonInput type="text" placeholder="Name" value={newShoppingListItemName} onIonChange={setNewShoppingListItemNameClickHandler} />
               </IonCol>

               <IonCol size={props.shoppingListItemsColumnSizes.Qty}>
                    <IonInput type="number" placeholder="Qty" value={newShoppingListQty} min="1" onIonChange={setNewShoppingListItemQtyClickHandler} />
               </IonCol>

               <IonCol size={props.shoppingListItemsColumnSizes.Notes_IsEditing}>
                    <IonInput type="text" placeholder="Notes" value={newShoppingListItemNotes} onIonChange={setNewShoppingListItemNotesClickHandler} />
               </IonCol>

               <IonCol size={props.shoppingListItemsColumnSizes.DeleteMarkCompleted_IsEditing}>                    
               </IonCol>
          </IonRow>
     );
};

export default AddShoppingListItem;