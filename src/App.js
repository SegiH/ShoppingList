// TO DO:

import {useEffect, useState} from "react";
import { Redirect, Route } from 'react-router-dom';

import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import ShoppingListPage from './pages/ShoppingListPage';
import PreferredStoreItemsPage from './pages/PreferredStoreItemsPage';
import PreferredStoresPage from './pages/PreferredStoresPage';
import ModalDialog from './components/ModalDialog/ModalDialog';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import axios from 'axios';

/* Theme variables */
import './theme/variables.css';

import editIcon from "./images/edit.png";
import saveIcon from "./images/save.png";
import cancelIcon from "./images/cancel.png";

import { createStore, get, set, remove } from './components/Storage/storage';

setupIonicReact();

const App = () => {
     const [authKey,setAuthKey] = useState('');

     const [backendURL,setBackendURL] = useState('');

     const [isEditing,setIsEditing] = useState(false);

     const [isEditingOptions,setIsEditingOptions] = useState(false);

     const [modalDialogPrompt,setModalDialogPrompt] = useState(false);

     const [modalDialogText,setModalDialogText] = useState('');

     const [modalDialogVisible,setModalDialogVisible] = useState(false);

     const [newAuthKey,setNewAuthKey] = useState('');	 

     const [newBackendURL,setNewBackendURL] = useState('');	 

     const [refreshNeeded,setRefreshNeeded] = useState(false);

     const [preferredStores,setPreferredStores] = useState([]);

     const [previousPreferredStores,setPreviousPreferredStores] = useState([]);

	const [preferredStoreItems,setPreferredStoreItems] = useState([]);

	const [previousPreferredStoreItems,setPreviousPreferredStoreItems] = useState([]);

	const [shoppingList,setShoppingList] = useState([]);

	const [previousShoppingList,setPreviousShoppingList] = useState([]);

     const addPreferredStoreHandler = (newStore) => {		  
          setPreferredStores((prevState) => {
               return [ ...prevState, newStore];
          });
     };

     const addPreferredStoreItemHandler = (newStoreItem) => {
          setPreferredStoreItems((prevState) => {
               return [ ...prevState, newStoreItem];
          });
     };

     const addShoppingListItemHandler = (newShoppingListItem,reloadData) => {
          setShoppingList((prevState) => {
               return [ ...prevState, newShoppingListItem];
          });

          if (reloadData) // After a shopping list item is added, setting this flag will trigger the useEffect that depends on refreshNeeeded which will update the shopping list
               setRefreshNeeded(true);
     };

     const cancelClickHandler = (activeComponent) => {
          switch(activeComponent) {
               case "PreferredStores":
                    setPreferredStores(previousPreferredStores);
                    isEditingHandler()
                    break; 
               case "PreferredStoreItems":
                    setPreferredStoreItems(previousPreferredStoreItems);
                    isEditingHandler()
                    break;
               case "ShoppingList":
                    setShoppingList(previousShoppingList);
                    isEditingHandler()
                    break;
               default:
                    return;
          }
     };

     const cancelIsEditingOptionsHandler = () => {
          setNewBackendURL('');
          setNewAuthKey('');
          setIsEditingOptions(false);
     }

     const getAuthKeyStorage = async () => {
          const authKey = await get('AuthKey');

          if (authKey === "" || authKey === null) {
               showModalDialog("Please set the Auth Key");
               return;
          } else {
               setAuthKey(authKey);
          }
     }

     const getBackendURLStorage = async () => {
          const backendURL = await get('BackendURL');

          if (backendURL === "" || backendURL === null) {
               showModalDialog("Please set the Backend URL");
          } else {
               setBackendURL(backendURL);

               getAuthKeyStorage();
          }
     }

     const getPreferredStores = () => {
          return new Promise((resolve,reject) => {
               handleRequest('/GetPreferredStores',"",true,setPreferredStores);
          })
     }

     const getPreferredStoreItems = () => {
          return new Promise((resolve,reject) => {
	          handleRequest('/GetPreferredStoreItems',"",true,setPreferredStoreItems);
          })
     }

     const getShoppingList = () => {
          return new Promise((resolve,reject) => {
               handleRequest('/GetShoppingList',"",true,setShoppingList);
          })          
     }

     const handleRequest = async (endpoint,params,isSelect,stateCallback) => {
          if (params === "") {
               params=`?auth_key=${authKey}`
          } else {
               params+=`&auth_key=${authKey}`
          }

          await axios.get(`${backendURL}${endpoint}${params != null ? params : ''}`)
          .then(res=> {
                if (isSelect)
                      stateCallback(res.data)
          })
          .catch(err=> {
               showModalDialog(`An error occurred fetching the data`);
          })
     }

     const isEditingHandler = (newActiveComponent) => {
          if (isEditing === false && newActiveComponent != null) {
               switch(newActiveComponent) {
                    case "PreferredStores":
                         const prevPreferredStores=JSON.parse(JSON.stringify(preferredStores)); // Create copy of preferredStores
                         setPreviousPreferredStores(prevPreferredStores);
                         break; 
                    case "PreferredStoreItems":
                         const prevPreferredStoreItems=JSON.parse(JSON.stringify(preferredStoreItems)); // Create copy of preferredStoreItems
                         setPreviousPreferredStoreItems(prevPreferredStoreItems);
                         break;
                    case "ShoppingList":
                         const prevShoppingList=JSON.parse(JSON.stringify(shoppingList));  // Create copy of shoppingList
                         setPreviousShoppingList(prevShoppingList);
                         break; 
                    default:
                         return; 
               }
          }

          setIsEditing(!isEditing);
     };

     const isEditingOptionsHandler = () => {
          if (isEditingOptions === false) {
               setNewBackendURL(backendURL);
               setNewAuthKey(authKey);
          }

          setIsEditingOptions(!isEditingOptions);
     }

     const markShoppingListItemCompleted = (updatedID) => {
          handleRequest('/MarkShoppingListItemCompleted',`?ShoppingListItemID=${updatedID}`,false);

          getShoppingList();
     }

     const modalDialogCancelHandler = () => {
          setModalDialogVisible(false);
     }

     const modalDialogOKHandler = () => {
          setModalDialogVisible(false);
     }

     const reset = () => {
          setIsEditing(false);
          setRefreshNeeded(false);
          setPreferredStores([]);
          setPreferredStoreItems([]);
          setShoppingList([]);
          
          setPreviousPreferredStores([]);
          setPreviousPreferredStoreItems([]);
          setPreviousShoppingList([]);
     }

     const rowUpdatedHandler = (activeComponent,updatedID,fieldName,event) => {
          switch(activeComponent) {
               case "PreferredStores":
                    const preferredStore=preferredStores.filter(preferredStore => preferredStore.PreferredStoreID === updatedID)[0];
                    
                    if (fieldName !== "") {  // If fieldname was provided, then a field was edited
                         preferredStore['IsEdited']=true;

                         preferredStore[fieldName]=event.target.value;
                    } else {
                         preferredStore['IsDeleted']=true;
                    }

                    break; 
               case "PreferredStoreItems":
                    const preferredStoreItem=preferredStoreItems.filter(preferredStoreItem => preferredStoreItem.PreferredStoreItemID === updatedID)[0];
                    
                    if (fieldName !== "") {  // If fieldname was provided, then a field was edited
                         preferredStoreItem['IsEdited']=true;

                         preferredStoreItem[fieldName]=event.target.value;
                    } else {
                         preferredStoreItem['IsDeleted']=true;
                    }

                    break;
               case "ShoppingList":
                    const shoppingListItem=shoppingList.filter(shoppingList => shoppingList.ShoppingListItemID === updatedID)[0];

                    if (fieldName !== "") {  // If fieldname was provided, then a field was edited
                         shoppingListItem['IsEdited']=true;

                         shoppingListItem[fieldName]=event.target.value;
                    } else {
                         shoppingListItem['IsDeleted']=true;
                    }
                      
                    break;
               default:
                    return;

          }
     }

     const saveIsEditingOptionsHandler = () => {
          if (newBackendURL?.length === 0) {
               showModalDialog("Please enter the backend URL");
               return;
          }

          if (newAuthKey?.length === 0) {
               showModalDialog("Please enter the Auth Key");
               return;
          }

          setBackendURLStorage(newBackendURL);
          setAuthKeyStorage(newAuthKey);
       
          setIsEditingOptions(false);
     }

     const savePreferredStoresHandler = () => {
          const addedItems=preferredStores.filter(store => store.IsAdded === true);  
          const editedItems=preferredStores.filter(store => store.IsEdited === true);
          const deletedItems=preferredStoreItems.filter(store => store.IsDeleted === true);

          addedItems.every(preferredStore => {
                return handleRequest('/AddPreferredStore',`?Name=${preferredStore.PreferredStoreName}&Notes=${preferredStore.Notes}`,false);
          });

          editedItems.every(preferredStore => {
               return handleRequest('/UpdatePreferredStore',`?PreferredStoreID=${preferredStore.PreferredStoreID}&Name=${preferredStore.PreferredStoreName}&Notes=${preferredStore.Notes}`,false);
          });

          deletedItems.every(preferredStore => {
                return handleRequest('/DeletePreferredStore',`?PreferredStoreID=${preferredStore.PreferredStoreID}`,false);
          });

          getPreferredStores();
     }

     const savePreferredStoreItemsHandler = () => {
          const addedItems=preferredStoreItems.filter(store => store.IsAdded === true);  
          const editedItems=preferredStoreItems.filter(store => store.IsEdited === true);
          const deletedItems=preferredStoreItems.filter(store => store.IsDeleted === true);

          addedItems.every(preferredStoreItem => {
               return handleRequest('/AddPreferredStoreItem',`?Name=${preferredStoreItem.Name}&PreferredStoreID=${preferredStoreItem.PreferredStoreID}&Notes=${preferredStoreItem.Notes}`,false);
          });

          editedItems.every(preferredStoreItem => {
               return handleRequest('/UpdatePreferredStoreItem',`?PreferredStoreItemID=${preferredStoreItem.PreferredStoreItemID}&Name=${preferredStoreItem.Name}&PreferredStoreID=${preferredStoreItem.PreferredStoreID}&Notes=${preferredStoreItem.Notes != null ? preferredStoreItem.Notes : 'NULL'}`,false);
          });

          deletedItems.every(preferredStoreItem => {
               return handleRequest('/DeletePreferredStoreItem',`?PreferredStoreItemID=${preferredStoreItem.PreferredStoreItemID}`,false);
          });

          getPreferredStoreItems();
     }

     const saveShoppingListHandler = () => {
          const addedItems=shoppingList.filter(shoppingListItem => shoppingListItem.IsAdded === true);  
          const editedItems=shoppingList.filter(shoppingListItem => shoppingListItem.IsEdited === true);
          const deletedItems=shoppingList.filter(shoppingListItem => shoppingListItem.IsDeleted === true);
          
          addedItems.every(shoppingListItem => {
               return handleRequest('/AddShoppingListItem',`${shoppingListItem.Name != null ? `?Name=${shoppingListItem.Name}&` : `?`}${shoppingListItem.PreferredStoreItemID != null ? `PreferredStoreItemID=${shoppingListItem.PreferredStoreItemID}` : ``}&Qty=${shoppingListItem.Qty}${shoppingListItem.Notes != null ? `&Notes=${shoppingListItem.Notes}`: ``}`,false);
          });

          editedItems.every(shoppingListItem => {
               return handleRequest('/UpdateShoppingListItem',`?ShoppingListItemID=${shoppingListItem.ShoppingListItemID}&Name=${shoppingListItem.Name}${shoppingListItem.PreferredStore != null ? `&PreferredStoreItemID=${shoppingListItem.PreferredStore}` : ``}&Qty=${shoppingListItem.Qty}&Notes=${shoppingListItem.Notes}`,false);
          });

          deletedItems.every(shoppingListItem => {
               return handleRequest('/DeleteShoppingListItem',`?ShoppingListItemID=${shoppingListItem.ShoppingListItemID}`,false);
          });

          getShoppingList();
     }

     const setAuthKeyStorage = async (newAuthKey) => {
          if (newAuthKey !== null && newAuthKey !== "") {
               set('AuthKey', newAuthKey);

               setAuthKey(newAuthKey);
           } else {
               await remove('AuthKey');

               setAuthKey('');

               reset();
           }
     }

     const setBackendURLStorage = async (newBackendURL) => {
          if (newBackendURL !== null && newBackendURL !== "") {
               set('BackendURL', newBackendURL);

               setBackendURL(newBackendURL);
          } else {
               await remove('BackendURL');

               setBackendURL('');

               reset();
          }
     }

     const setNewAuthKeyHandler = (event) => {
          setNewAuthKey(event.target.value);
     }

     const setNewBackendURLClickHandler = (event) => {
          setNewBackendURL(event.target.value);
     }

     const showModalDialog = (dialogText,isPrompt,okHandler,cancelHandler) => {
          setModalDialogText(dialogText);

          if (isPrompt === true) {
               setModalDialogPrompt(true);               
          }

          setModalDialogVisible(true);
     }

     useEffect(() => {
          const setupStore = async () => {
			createStore("ShoppingList");
		}

		setupStore();

          getBackendURLStorage();
     },[]);

     useEffect(() => {
         if (refreshNeeded) {
               setRefreshNeeded(false);
            
               saveShoppingListHandler();
         }
     }, [shoppingList,refreshNeeded]);

     useEffect(() => {
          return new Promise( (resolve, reject) => {
               if (authKey.length > 0 && backendURL.length > 0) {
                    getShoppingList();
                    
                    getPreferredStores();
                              
                    getPreferredStoreItems();
               };
          });
     },[authKey,backendURL]);

     return (
          <IonApp id="AppComponent">
               <IonMenu contentId="AppComponent" type="overlay" class="clickable ion-activatable">
                    <IonHeader>
                         <IonToolbar color="primary">
                              <IonTitle>Shopping List</IonTitle>
                         </IonToolbar>
                    </IonHeader>

                    <IonContent>
                         <IonList>
                              {!isEditingOptions && <IonItem><IonImg src={editIcon} alt="edit" className="icon" onClick={isEditingOptionsHandler} /></IonItem> }
                              {isEditingOptions &&
                                   <IonItem>
                                        <IonImg src={saveIcon} alt="save" className="icon rightMargin" onClick={saveIsEditingOptionsHandler} />
                                        <IonImg src={cancelIcon} alt="cancel" className="icon" onClick={cancelIsEditingOptionsHandler} />
                                   </IonItem>
                              }

                              <IonItem>Backend URL</IonItem>

                              <IonItem>
                                   {isEditingOptions ? <IonInput type="text" value={backendURL} value={newBackendURL} onIonChange={setNewBackendURLClickHandler} />
                                                     : <div>{backendURL}</div>
                                   }
                              </IonItem>
                              
                              <IonItem>Auth Key</IonItem>

                              <IonItem>{isEditingOptions ?
                                                         <IonInput type="text" value={authKey} value={newAuthKey} onIonChange={setNewAuthKeyHandler} />
                                                         : <div>{"*".repeat(authKey.length)}</div>
                                        }
                              </IonItem>
                         </IonList>
                    </IonContent>
               </IonMenu>

               <IonButtons id="menuButtons">
                    <IonMenuButton></IonMenuButton>
               </IonButtons>

               <IonReactRouter>
                    <IonTabs>
                         <IonRouterOutlet>
                              <Route exact path="/shoppinglist">
                                  <ShoppingListPage
					              addShoppingListItemHandler={addShoppingListItemHandler}
						         cancelClickHandler={cancelClickHandler}
						         isEditing={isEditing}
                                       isEditingHandler={isEditingHandler}
						         markShoppingListItemCompleted={markShoppingListItemCompleted}
						         preferredStores={preferredStores}
						         rowUpdatedHandler={rowUpdatedHandler}
						         saveShoppingListHandler={saveShoppingListHandler}
					              shoppingList={shoppingList}
                                       showModalDialog={showModalDialog}
					          />
                              </Route>

                              <Route exact path="/preferredstoreitems">
                                   <PreferredStoreItemsPage
                                        addPreferredStoreItemHandler={addPreferredStoreItemHandler}
                                        addShoppingListItemHandler={addShoppingListItemHandler}
                                        cancelClickHandler={cancelClickHandler}
                                        isEditing={isEditing}
                                        isEditingHandler={isEditingHandler}
                                        preferredStores={preferredStores}
                                        preferredStoreItems={preferredStoreItems}
                                        rowUpdatedHandler={rowUpdatedHandler}
                                        savePreferredStoreItemsHandler={savePreferredStoreItemsHandler}
                                        saveShoppingListHandler={saveShoppingListHandler}
                                        showModalDialog={showModalDialog}
                                   />
                              </Route>

                              <Route path="/preferredstores">
                                   <PreferredStoresPage
                                        addPreferredStoreHandler={addPreferredStoreHandler}
                                        cancelClickHandler={cancelClickHandler}
                                        isEditing={isEditing}
                                        isEditingHandler={isEditingHandler}
                                        preferredStores={preferredStores}
                                        rowUpdatedHandler={rowUpdatedHandler}
                                        savePreferredStoresHandler={savePreferredStoresHandler}
                                        showModalDialog={showModalDialog}
                                   />
                              </Route>

                              <Route exact path="/">
                                   <Redirect to="/shoppinglist" />
                              </Route>
                         </IonRouterOutlet>

                         <IonTabBar slot="bottom">
                              <IonTabButton tab="ShoppingList" href="/shoppinglist" disabled={isEditing}>
                                   <IonLabel>Shopping List</IonLabel>
                              </IonTabButton>

                              <IonTabButton tab="PreferredStoreItems" href="/preferredstoreitems" disabled={isEditing}>
                                   <IonLabel>Preferred Store Items</IonLabel>
                              </IonTabButton>
              
                              <IonTabButton tab="PreferredStores" href="/preferredstores" disabled={isEditing}>
                                   <IonLabel>Preferred Stores</IonLabel>
                              </IonTabButton>
                         </IonTabBar>
                    </IonTabs>
               </IonReactRouter>

               <ModalDialog isOpen={modalDialogVisible} title={modalDialogText} okHandler={modalDialogOKHandler} cancelHandler={modalDialogCancelHandler} modalDialogPrompt={modalDialogPrompt} />
          </IonApp>
     )
};

export default App;
