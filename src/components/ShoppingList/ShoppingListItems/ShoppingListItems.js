import {useState} from 'react';
import { IonCol, IonGrid, IonImg, IonInput, IonRow } from '@ionic/react';

import AddShoppingListItem from '../AddShoppingListItem/AddShoppingListItem';

import editIcon from "../../../images/edit.png";
import saveIcon from "../../../images/save.png";
import cancelIcon from "../../../images/cancel.png";
import deleteIcon from "../../../images/delete.png";
import ModalDialog from '../../ModalDialog/ModalDialog';


const ShoppingListItems = props => {
     const [deleteShoppingListItemDialogVisible,setDeleteShoppingListItemDialogVisible] = useState(false);
     const [markCompleteDialogVisible,setMarkCompleteDialogVisible] = useState(false);
     const [shoppingListItemIDToDelete,setShoppingListItemIDToDelete] = useState(0);
     const [shoppingListItemIDToMarkCompleted,setShoppingListItemIDToMarkCompleted] = useState(0);

     const shoppingListItemsColumnSizes = {
          DeleteMarkCompleted_IsNotEditing: 1,
          DeleteMarkCompleted_IsEditing: 1,
          EditSaveIcon: 1,
          Filler: 1,
          ID: 1,
          Item: 3,
          Qty_IsEditing: 2,
          Qty_IsNotEditing: 1,
          Notes_IsNotEditing: 4,
          Notes_IsEditing: 3,
          Store: 2,
          Title_IsEditing: 7,
          Title_IsNotEditing: 9,
     }

     const deleteShoppingListItemHandler = (ID) => {
          setShoppingListItemIDToDelete(ID);

          setDeleteShoppingListItemDialogVisible(true);
     }

     const deleteShoppingListItemCancelHandler = () => {
          setDeleteShoppingListItemDialogVisible(false);
     };

     const deleteShoppingListItemOKHandler = () => {
          props.rowUpdatedHandler("ShoppingList", shoppingListItemIDToDelete,"",null);

          setDeleteShoppingListItemDialogVisible(false);
     };

     const markShoppingListItemCompleteHandler = (ID) => {
          setShoppingListItemIDToMarkCompleted(ID);
          
          setMarkCompleteDialogVisible(true);
     };

     const markShoppingListItemCompleteOKHandler = () => {             
          props.markShoppingListItemCompleted(shoppingListItemIDToMarkCompleted,"",null);

          setMarkCompleteDialogVisible(false);
          
     };

     const markShoppingListItemCompleteCancelHandler = () => {             
          setMarkCompleteDialogVisible(false);
          
     };

     const saveHandler = () => {
          // Make sure that there are no empty names
          const emptyNames=props.shoppingList.filter(shoppingListItem => shoppingListItem.Name === "");

          if (emptyNames.length > 0) {
               props.showModalDialog("Please enter a name for all rows")
               return;
          }

          props.saveShoppingListHandler();
    
          props.isEditingHandler()
     };

     return (
          <div>
               <IonGrid className="styled-table">
                    <IonRow>
                         <IonCol size={props.isEditing ? shoppingListItemsColumnSizes.Title_IsEditing : shoppingListItemsColumnSizes.Title_IsNotEditing}><h1>Shopping List</h1></IonCol>

                         {!props.isEditing &&
                              <IonCol size={shoppingListItemsColumnSizes.Filler*2}></IonCol>
                         }

                         {!props.isEditing &&
                              <IonCol size={shoppingListItemsColumnSizes.EditSaveIcon} className="noPadding">
                                   <IonImg src={editIcon} alt="edit" className="icon" onClick={() => props.isEditingHandler("ShoppingList")} />
                              </IonCol>
                         }

                         {props.isEditing &&
                              <IonCol size={shoppingListItemsColumnSizes.Filler*3}></IonCol>
                         }
               
                         {props.isEditing &&
                              <IonCol size={shoppingListItemsColumnSizes.EditSaveIcon} >
                                   <IonImg src={saveIcon} alt="save" className="icon" onClick={saveHandler} />
                              </IonCol>
                         }

                         {props.isEditing &&
                              <IonCol size={shoppingListItemsColumnSizes.DeleteMarkCompleted_IsEditing}>
                                   <IonImg src={cancelIcon} alt="cancel" className="icon" onClick={() => props.cancelClickHandler("ShoppingList")} />
                              </IonCol>
                         }
                    </IonRow>
                    
                    <IonRow>
                         <IonCol size={shoppingListItemsColumnSizes.ID} className="noPadding">ID</IonCol>
                         <IonCol size={shoppingListItemsColumnSizes.Store} className="noPadding">Store</IonCol>
                         <IonCol size={shoppingListItemsColumnSizes.Item}>Item</IonCol>
                         <IonCol size={props.isEditing ? shoppingListItemsColumnSizes.Qty_IsEditing : shoppingListItemsColumnSizes.Qty_IsNotEditing} className="noPadding">Qty</IonCol>
                         <IonCol size={props.isEditing ? shoppingListItemsColumnSizes.Notes_IsEditing : shoppingListItemsColumnSizes.Notes_IsNotEditing}>Notes</IonCol>
                         <IonCol className="noPadding" size={props.isEditing ? shoppingListItemsColumnSizes.DeleteMarkCompleted_IsEditing : shoppingListItemsColumnSizes.DeleteMarkCompleted_IsNotEditing}>
                         {props.isEditing
                              ? <IonImg src={deleteIcon} alt="delete" className="icon" />
                              : props.shoppingList.length > 0 && <IonImg src={cancelIcon} alt="cancel" className="icon" />
                              }
                         </IonCol>
                    </IonRow>

                    {props.isEditing && 
                         <AddShoppingListItem
                              addShoppingListItemHandler={props.addShoppingListItemHandler}
                              preferredStores={props.preferredStores}
                              shoppingList={props.shoppingList}
                              shoppingListItemsColumnSizes={shoppingListItemsColumnSizes}
                              showModalDialog={props.showModalDialog}
                         />
                    }

                    {props.shoppingList.filter(shoppingListItem => shoppingListItem.IsDeleted !== true).map(shoppingListItem =>
                         <IonRow key={shoppingListItem.ShoppingListItemID}>
                              <IonCol size={shoppingListItemsColumnSizes.ID}>
                                   {!shoppingListItem.IsAdded ? shoppingListItem.ShoppingListItemID : '' 
                                   }
                              </IonCol>

                              <IonCol size={shoppingListItemsColumnSizes.Store}>
                                   {shoppingListItem.StoreName} {shoppingListItem.IsDeleted}
                              </IonCol>
             
                              {!props.isEditing &&
                                   <IonCol size={shoppingListItemsColumnSizes.Item}>
                                        {shoppingListItem.Name}
                                   </IonCol>
                              }

                              {props.isEditing &&
                                   <IonCol size={shoppingListItemsColumnSizes.Item}>
                                        <IonInput type="text" value={shoppingListItem.Name} onIonChange={() => props.rowUpdatedHandler("Shopping List", shoppingListItem.ShoppingListItemID,"Name")} />
                                   </IonCol>
                              }

                              {!props.isEditing && <IonCol size={shoppingListItemsColumnSizes.Qty_IsNotEditing}>{shoppingListItem.Qty}</IonCol>}
              
                              {props.isEditing &&
                                   <IonCol size={shoppingListItemsColumnSizes.Qty_IsEditing}>
                                        <IonInput type="number" placeholder={shoppingListItem.Qty}  min="1" defaultValue={shoppingListItem.Qty} onIonChange={() => props.rowUpdatedHandler("Shopping List", shoppingListItem.ShoppingListItemID,"Qty")} />
                                   </IonCol>
                              }

                              {!props.isEditing && <IonCol size={shoppingListItemsColumnSizes.Notes_IsNotEditing}>{shoppingListItem.Notes}</IonCol>}
              
                              {props.isEditing &&
                                   <IonCol size={shoppingListItemsColumnSizes.Notes_IsEditing}>
                                        <IonInput type="text" placeholder={shoppingListItem.Notes} defaultValue={shoppingListItem.Notes} onIonChange={() => props.rowUpdatedHandler("Shopping List", shoppingListItem.ShoppingListItemID,"Notes")} />
                                   </IonCol>
                              }

                              {!props.isEditing &&
                                   <IonCol size={shoppingListItemsColumnSizes.DeleteMarkCompleted_IsNotEditing} className="noPadding">
                                        <IonImg src={cancelIcon} alt="cancel" className="icon" onClick={() => markShoppingListItemCompleteHandler(shoppingListItem.ShoppingListItemID)} />                                        
                                   </IonCol>
                              }

                              {props.isEditing &&
                                   <IonCol size={shoppingListItemsColumnSizes.DeleteMarkCompleted_IsEditing}>
                                        <IonImg src={deleteIcon} alt="delete" className="icon" onClick={() => deleteShoppingListItemHandler(shoppingListItem.ShoppingListItemID)} />
                                   </IonCol>
                              }
                         </IonRow>
                    )}                    
               </IonGrid>

               <ModalDialog isOpen={deleteShoppingListItemDialogVisible} title={"Delete this shopping list item ?"} okHandler={deleteShoppingListItemOKHandler} cancelHandler={deleteShoppingListItemCancelHandler} modalDialogPrompt={true} />

               <ModalDialog isOpen={markCompleteDialogVisible} title={"Mark completed ?"} okHandler={markShoppingListItemCompleteOKHandler} cancelHandler={markShoppingListItemCompleteCancelHandler} modalDialogPrompt={true} />
          </div>
     );
};

export default ShoppingListItems;