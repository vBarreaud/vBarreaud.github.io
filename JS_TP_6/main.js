window.addEventListener("DOMContentLoaded",init);

let db;
let reverseOrder = false;
 


const DB_STORE_NAME = "notes"
const DB_NAME = "test_indexDb_notes"
const DB_VERSION = 2 //à incrementer quand on change la structure de la base. 

//////////////
let dbReq = indexedDB.open(DB_NAME, DB_VERSION); //Appel asynchrone

dbReq.addEventListener("upgradeneeded",(event)=> {
  // Set the db variable to our database so we can use it!  
  db = event.target.result;

  let notes;
  if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
    // Create an object store named notes. Object stores
    // in databases are where data are stored.
    notes = db.createObjectStore(DB_STORE_NAME, {autoIncrement: true});
  } else {
    notes = dbReq.transaction.objectStore(DB_STORE_NAME);
  }

  // If there isn't already a timestamp index in our notes object
  // store, make one so we can query notes by their timestamps
  if (!notes.indexNames.contains('timestamp')) {
    notes.createIndex('timestamp', 'timestamp');
  }


});

dbReq.addEventListener("success", (event)=> {
  db = event.target.result;

  // Once the database is ready, display the notes we already have!
  getAndDisplayNotes(db);
});

dbReq.addEventListener("error",(event)=> {
  alert('error opening database ' + event.target.errorCode);
});


function clearStore() {
  let tx = db.transaction([DB_STORE_NAME], 'readwrite');
  let store = tx.objectStore(DB_STORE_NAME);
  let req = store.clear();
  req.addEventListener("success",(evt)=> {
    getAndDisplayNotes(db);
  });
  req.addEventListener("error",(evt)=> {
    console.error("clearObjectStore:", evt.target.errorCode);
  });
}

/////////////


function addStickyNote(db, message) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction([DB_STORE_NAME], 'readwrite');
  let store = tx.objectStore(DB_STORE_NAME);

  // Put the sticky note into the object store
  let note = {text: message, timestamp: Date.now()};
  store.add(note);

  // Wait for the database transaction to complete
  tx.addEventListener("complete",()=> { 
    console.log('stored note!') 
    getAndDisplayNotes(db);
  });
  tx.addEventListener("error",(event)=> {
    alert('error storing note ' + event.target.errorCode);
  });
}


////////////Interface
function submitNote() {
  let message = document.getElementById('newmessage');
  addStickyNote(db, message.value);
  message.value = '';
}
function flipNoteOrder() {
  reverseOrder = !reverseOrder;
  getAndDisplayNotes(db);
}



function getAndDisplayNotes(db) {
  let tx = db.transaction([DB_STORE_NAME], 'readwrite');
  let store = tx.objectStore(DB_STORE_NAME);

//VERSION avec ordre selon Timestamp
  // Retrieve the sticky notes index to run our cursor query on; 
  // the results will be ordered by their timestamp
  let index = store.index('timestamp');

  // Create our openCursor request, on the index rather than the main
  // notes object store. If we're going in reverse, then specify the
  // direction as "prev". Otherwise, we specify it as "next".
  let req = index.openCursor(null, reverseOrder ? 'prev' : 'next');
//////////////

/* VERSION ORIGINALE, sans les indexes
  // Create a cursor request to get all items in the store, which 
  // we collect in the allNotes array
  let req = store.openCursor();
*/
  let allNotes = [];

  req.addEventListener("success",(event)=> {
    // The result of req.onsuccess in openCursor requests is an
    // IDBCursor
    let cursor = event.target.result;

    if (cursor != null) {
      // If the cursor isn't null, we got an item. Add it to the
      // the note array and have the cursor continue!
      allNotes.push(cursor.value);
      cursor.continue();
    } else {
      // If we have a null cursor, it means we've gotten
      // all the items in the store, so display the notes we got.
      displayNotes(allNotes);
    }
  });

  req.addEventListener("error",(event)=> {
    alert('error in cursor request ' + event.target.errorCode);
  });
}

function displayNotes(notes) {
  let listHTML = '<ul>';
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    listHTML += '<li>' + note.text + ' ' + 
      new Date(note.timestamp).toString() + '</li>';
  }

  document.getElementById('notes').innerHTML = listHTML; //pas beau
}





function init(){
  document.getElementById("addBtn").addEventListener("click", submitNote);
  document.getElementById("clearBtn").addEventListener("click", clearStore);
  document.getElementById("flipBtn").addEventListener("click", flipNoteOrder);
}