import {useEffect, useState} from 'react';

import add from "../../../images/add.png";

import { IonCol, IonGrid, IonImg, IonInput, IonRow, IonSelect, IonSelectOption } from '@ionic/react';

const AddPreferredStoreItem = props => {
     const [newStoreID, setNewStoreIDHandler] = useState(0);
     const [newStoreName, setNewStoreNameHandler] = useState('');
     const [newItemName, setNewItemNameHandler] = useState('');
     const [newItemNotes, setNewItemNotesHandler] = useState('');
     
     const savePreferredStoreItemClickHandler = () => {
          if (newStoreID === '') {
               props.showModalDialog("Please select the preferred store");
               return;
          }

          if (newItemName === '') {
               props.showModalDialog("Please enter a name");
               return;
          }

          const randomID=Math.floor((Math.random() * 20000) + 10000); // Random ID is needed in case we want to delete an added item, in which case there has to be an ID referenced

          const newStoreItem = {"PreferredStoreItemID": randomID, "Name": newItemName, "PreferredStoreID": parseInt(newStoreID), "PreferredStoreName": newStoreName.toString().trim(), "Notes": newItemNotes,"IsAdded": true }

          props.addPreferredStoreItemHandler(newStoreItem);

          setNewStoreIDHandler('');

          setNewStoreNameHandler('');

          setNewItemNameHandler('');

          setNewItemNotesHandler('');
     };

     const setNewStoreIDClickHandler = (event) => {
          try {
               const isThisInt=parseInt(event.target.value);

               if (!isNaN(isThisInt)) {
                    setNewStoreIDHandler(event.target.value);
               }
          } catch (e) {

          }
     };

     const setNewItemNameClickHandler = (event) => {
          setNewItemNameHandler(event.target.value);
     };

     const setNewItemNotesClickHandler = (event) => {
          setNewItemNotesHandler(event.target.value);
     };

     useEffect(() => {
          if (newStoreID != null && newStoreID != 0) {
               // Get Store name for selected ID
               const localNewStoreName=props.preferredStores.filter(store => store.PreferredStoreID === newStoreID).map(store => store.PreferredStoreName);
               setNewStoreNameHandler(localNewStoreName);
          }
     },[newStoreID]);

     return (
          <IonGrid>
               <IonRow class="addRow">
                    <IonCol size={props.preferredStoreItemsColumnSizes.AddIcon} className="noPadding">
                         <IonImg src={add} className="icon" onClick={savePreferredStoreItemClickHandler} />
                    </IonCol>

                    <IonCol size={props.preferredStoreItemsColumnSizes.StoreName_IsEditing}>
                        
                             <IonSelect 
                             value={newStoreName} placeholder={newStoreName} onIonChange={setNewStoreIDClickHandler} className="myDropdown">
                              {props.preferredStores.map(preferredStore =>
                                   <IonSelectOption key={preferredStore.PreferredStoreID} eventKey={preferredStore.PreferredStoreID} value={preferredStore.PreferredStoreID}>{preferredStore.PreferredStoreName}</IonSelectOption>
                              )}
                         </IonSelect>
                    </IonCol>

                    <IonCol size={props.preferredStoreItemsColumnSizes.Name_IsEditing}>
                         <IonInput type="text" placeholder="Enter item name" value={newItemName} onIonChange={setNewItemNameClickHandler} />
                    </IonCol>

                    <IonCol size={props.preferredStoreItemsColumnSizes.Notes_IsEditing}>
                         <IonInput type="text" placeholder="Enter item notes" value={newItemNotes} onIonChange={setNewItemNotesClickHandler} />
                    </IonCol>
               </IonRow>
          </IonGrid>
     );
};

export default AddPreferredStoreItem;