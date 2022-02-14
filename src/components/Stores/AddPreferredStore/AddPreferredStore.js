import {useState} from 'react';

import { IonCol, IonImg, IonInput, IonRow } from '@ionic/react';

import add from "../../../images/add.png";

const AddPreferredStore = props => {
     const [newStoreName, setNewStoreNameHandler] = useState('');

     const savePreferredStoreClickHandler = () => {
          if (newStoreName === '') {
               props.showModalDialog("Please enter a name");
               return;
          }

          const [existingName]=props.preferredStores.filter(store => store.PreferredStoreName === newStoreName).map(store => store.PreferredStoreName);

          if (newStoreName === existingName) {
               props.showModalDialog("This store exists already");
               return;
          }

          const randomID=Math.floor((Math.random() * 20000) + 10000); // Random ID is needed in case we want to delete an added item, in which case there has to be an ID referenced

          const newStore = {PreferredStoreID:randomID,"PreferredStoreName": newStoreName,"IsAdded": true } // New Preferred Store object

          props.addPreferredStoreHandler(newStore);

          setNewStoreNameHandler('');
     };

     const setNewStoreNameClickHandler = (event) => {
          setNewStoreNameHandler(event.target.value);
     };

     return (
          <IonRow class="addRow">
               <IonCol size={props.preferredStoresColumnSizes.ID}>
                    <IonImg src={add} alt="add" className="icon" onClick={savePreferredStoreClickHandler} />
               </IonCol>

               <IonCol size={props.preferredStoresColumnSizes.Name_IsEditing}>
                    <IonInput type="text" value={newStoreName} onIonChange={setNewStoreNameClickHandler} />
               </IonCol>          
          </IonRow>
      );
};

export default AddPreferredStore;