import {useState} from 'react';
import AddPreferredStoreItem from '../AddPreferredStoreItem/AddPreferredStoreItem';
import PreferredStoreItemsForStore from '../PreferredItemsForStore/PreferredItemsForStore';

import editIcon from "../../../images/edit.png";
import saveIcon from "../../../images/save.png";
import cancelIcon from "../../../images/cancel.png";

import { IonCol, IonGrid,  IonImg, IonRow } from '@ionic/react';

const PreferredStoreItems = (props) => {
     const [deleteDialogVisible,setDeleteDialogVisible] = useState(false);
     const [preferredStoreItemIDToDelete,setPreferredStoreItemIDToDelete] = useState(0);

     const preferredStoreItemsColumnSizes = {
          AddIcon: 1,
          ID: 2,
          Filler: 1,
          Name_IsEditing: 4,
          Name_IsNotEditing: 4,
          Notes_IsEditing: 4,
          Notes_IsNotEditing: 4,
          StoreName_IsEditing: 3,
          DeleteAddShoppingList_IsEditing: 1,
          DeletePreferredStoreItem_IsNotEditing: 2,
          EditingIcon: 1,
          SaveIcon: 2,
          CancelIcon: 2,
          Title_IsEditing: 7,
          Title_IsNotEditing: 10
     }

     const saveHandler = () => {
          // Make sure that there are no empty names
          const emptyName=props.preferredStoreItems.filter(storeItem => storeItem.PreferredStoreItemName === "");

          if (emptyName.length > 0) {
               props.showModalDialog("Please enter a name for all rows")
               return;
          }

          props.savePreferredStoreItemsHandler();
          
          props.isEditingHandler()
     };

     const uniquePreferredStoreNames = [...new Set(props.preferredStoreItems.map(({ PreferredStoreName }) => PreferredStoreName))].sort()     

     return (
          <div>
               <IonGrid className="styled-table">
                    <IonRow>
                         <IonCol size={props.isEditing ? preferredStoreItemsColumnSizes.Title_IsEditing : preferredStoreItemsColumnSizes.Title_IsNotEditing}><h1>Preferred Store Items</h1></IonCol>

                         {!props.isEditing &&
                              <IonCol size={preferredStoreItemsColumnSizes.EditingIcon} className={props.isEditing ? 'isEditing' : ''}>
                                   <IonImg src={editIcon} alt="edit" className="icon" onClick={() => props.isEditingHandler("PreferredStoreItems")} />
                              </IonCol>
                         }
               
                         {props.isEditing &&
                              <IonCol size={preferredStoreItemsColumnSizes.Filler}>
                              </IonCol>
                         }

                         {props.isEditing &&
                              <IonCol size={preferredStoreItemsColumnSizes.SaveIcon}>
                                   <IonImg src={saveIcon} alt="save" className="icon" onClick={saveHandler} />
                              </IonCol>
                         }

                         {props.isEditing &&
                              <IonCol size={preferredStoreItemsColumnSizes.CancelIcon}>
                                   <IonImg src={cancelIcon} alt="cancel" className="icon" onClick={() => props.cancelClickHandler("PreferredStoreItems")} />
                              </IonCol>
                         }
                    </IonRow>

                    {props.isEditing && 
                         <AddPreferredStoreItem
                              addPreferredStoreItemHandler={props.addPreferredStoreItemHandler}
                              preferredStores={props.preferredStores}
                              preferredStoreItemsColumnSizes={preferredStoreItemsColumnSizes}
                              showModalDialog={props.showModalDialog}
                         />
                    }                    

                    {uniquePreferredStoreNames.map(uniquePreferredStoreName =>
                         <div key={uniquePreferredStoreName}>
                              <h2>{uniquePreferredStoreName}</h2>

                              <PreferredStoreItemsForStore
                                   addShoppingListItemHandler={props.addShoppingListItemHandler}
                                   deleteDialogVisible={deleteDialogVisible}
                                   isEditing={props.isEditing}
                                   preferredStoreName={uniquePreferredStoreName}
                                   preferredStoreItemIDToDelete={preferredStoreItemIDToDelete}
                                   preferredStoreItems={props.preferredStoreItems}
                                   preferredStoreItemsColumnSizes={preferredStoreItemsColumnSizes} 
                                   preferredStores={props.preferredStores}
                                   rowUpdatedHandler={props.rowUpdatedHandler}
                                   setDeleteDialogVisible={setDeleteDialogVisible}
                                   setPreferredStoreItemIDToDelete={setPreferredStoreItemIDToDelete}
                                   showModalDialog={props.showModalDialog}
                              />
                         </div>
                    )}
               </IonGrid>                   
          </div>
     );
};

export default PreferredStoreItems;