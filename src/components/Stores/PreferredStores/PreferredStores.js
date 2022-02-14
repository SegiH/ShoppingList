import {useState} from 'react';
import AddPreferredStore from '../AddPreferredStore/AddPreferredStore';
import ModalDialog from '../../ModalDialog/ModalDialog';

import editIcon from "../../../images/edit.png";
import saveIcon from "../../../images/save.png";
import cancelIcon from "../../../images/cancel.png";
import deleteIcon from "../../../images/delete.png";

import '../../../index.css';

import { IonCol, IonGrid, IonImg, IonInput, IonRow } from '@ionic/react';

const PreferredStores = props => {
     const [deleteDialogVisible,setDeleteDialogVisible] = useState(false);
     const [preferredStoreIDToDelete,setPreferredStoreIDToDelete] = useState(0);

     const preferredStoresColumnSizes = {
          ID: 2,
          Name_IsEditing: 6,
          Name_IsNotEditing: 10,
          Title_IsEditing: 7,
          Title_IsNotEditing: 10,
          Filler: 1,
          Delete: 4
     }

     const deletePreferredStoreHandler = (ID) => {
          setPreferredStoreIDToDelete(ID);

          setDeleteDialogVisible(true);
     }

     const deletePreferredStoreOKHandler = () => {
          props.rowUpdatedHandler("PreferredStores", preferredStoreIDToDelete,"",null);

          setDeleteDialogVisible(false);
     };

     const deletePreferredStoreCancelHandler = () => {
          setDeleteDialogVisible(false);
     };

     const saveHandler = () => {
          // Make sure that there are no empty names
          const emptyName=props.preferredStores.filter(preferredStore => preferredStore.PreferredStoreName === "");

          if (emptyName.length > 0) {
               props.showModalDialog("Please enter a name for all rows")
               return;
          }

          // Make sure that there are no duplicate names
          let duplicatefound = false;
          let duplicateName = "";
          
          props.preferredStores.every((preferredStore) => {
               const duplicateNames=props.preferredStores.filter(allStores => allStores.PreferredStoreName === preferredStore.PreferredStoreName);
               
               if (duplicateNames.length > 1) {
                    duplicatefound=true;
                    duplicateName=duplicateNames[0].PreferredStoreName;
                    return false;
               }

               return true;
          });

          if (duplicatefound) {
               props.showModalDialog(`Duplicate name ${duplicateName} found. Names must be unique`)
               return;
          }

          props.savePreferredStoresHandler();

          props.isEditingHandler()
     };     

     return (
          <div className="action">               
               <IonGrid className="noBorder styled-table">
                    <IonRow className="header">
                         <IonCol size={props.isEditing ? preferredStoresColumnSizes.Title_IsEditing : preferredStoresColumnSizes.Title_IsNotEditing}>
                              <h1>Preferred Stores</h1>
                         </IonCol>
                         
                         {!props.isEditing &&
                              <IonCol size="1">
                                   <IonImg src={editIcon} alt="edit" className="icon" onClick={() => props.isEditingHandler("PreferredStores")} />
                              </IonCol>
                         }
               
                         {props.isEditing &&
                              <IonCol size="2">
                                   <IonImg src={saveIcon} alt="save" className="icon" onClick={saveHandler} />
                              </IonCol>
                         }

                         {props.isEditing &&
                              <IonCol size={preferredStoresColumnSizes.Filler}>                              
                              </IonCol>
                         }

                         {props.isEditing &&
                              <IonCol size="2">
                                   <IonImg src={cancelIcon} alt="cancel" className="icon" onClick={() => props.cancelClickHandler("PreferredStores")} />
                              </IonCol>
                         }
                    </IonRow>

                    <IonRow>
                         <IonCol size={preferredStoresColumnSizes.ID}>ID</IonCol>
                         <IonCol size={props.isEditing ? preferredStoresColumnSizes.Name_IsEditing : preferredStoresColumnSizes.Name_IsNotEditing}>Name</IonCol>
                         {props.isEditing && <IonCol size="4">Delete</IonCol>}                         
                    </IonRow>

                    {props.isEditing &&
                         <AddPreferredStore
                              addPreferredStoreHandler={props.addPreferredStoreHandler}
                              preferredStores={props.preferredStores}
                              preferredStoresColumnSizes={preferredStoresColumnSizes}
                              showModalDialog={props.showModalDialog}
                         />
                    }

                    {props.preferredStores.length > 0 && props.preferredStores.filter(preferredStore => preferredStore.IsDeleted !== true).map(preferredStore =>
                         <IonRow key={preferredStore.PreferredStoreID}>
                              <IonCol size={preferredStoresColumnSizes.ID}>
                                   {!preferredStore.IsAdded ? preferredStore.PreferredStoreID : '' 
                                   }
                              </IonCol>

                              {!props.isEditing &&
                                   <IonCol size={preferredStoresColumnSizes.Name_IsNotEditing}>{preferredStore.PreferredStoreName}</IonCol>}

                              {props.isEditing &&
                                   <IonCol size={preferredStoresColumnSizes.Name_IsEditing}>
                                        <IonInput type="text" value={preferredStore.PreferredStoreName} onIonChange={() => props.rowUpdatedHandler("PreferredStores", preferredStore.PreferredStoreID,"PreferredStoreName")} />
                                   </IonCol>
                              }

                              {props.isEditing &&
                                   <IonCol size={preferredStoresColumnSizes.Delete}>
                                        <IonImg src={deleteIcon} alt="delete" className="icon" onClick={() => deletePreferredStoreHandler(preferredStore.PreferredStoreID)} />
                                   </IonCol>
                              }
                         </IonRow>
                    )}
               </IonGrid>

               <ModalDialog isOpen={deleteDialogVisible} title='Delete Preferred Store ?' okHandler={deletePreferredStoreOKHandler} cancelHandler={deletePreferredStoreCancelHandler} modalDialogPrompt={true} />
          </div>
     );
};

export default PreferredStores;