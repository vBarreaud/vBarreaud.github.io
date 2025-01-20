import {fetch2numbers} from "./modules/fetch2numbers.js"


document.addEventListener("DOMContentLoaded", init);


function doItRight(){
    fetch2numbers()
    .then(([...args])=>{
        console.log(`values are : `)
        for(const val of args){
            console.log(`... ${val}`)
        }
    })
    .catch( (err) => {
        if(err.name == 'Fetch2NumbersH2G2Error'){
            console.log('One again');
            doItRight();
        } else {
            throw err;
        }

    } )


}




function init(){
    doItRight();


    const first = document.querySelector('#number1');
    const second = document.querySelector('#number2');

    const result = document.querySelector('.result');

    if (window.Worker) {
        const myWorker = new Worker("./scripts/worker.js");

        first.onchange = function() {
            myWorker.postMessage([first.value, second.value]);
            console.log('Message posted to worker');
        }

        second.onchange = function() {
            myWorker.postMessage([first.value, second.value]);
            console.log('Message posted to worker');
        }

        myWorker.onmessage = function(e) {
            if (e.data.error) {
                console.log('Error from Worker:', e.data.error);
              } else {
                result.textContent = e.data;
                console.log('Message received from worker');
              }
        }

        myWorker.onerror = function(err){
            console.error('Worker error:', e.message);
        }


    } else {
        console.log('Your browser doesn\'t support web workers.');
    }

}










/*

///////////////////////////////
function doAsyncOperation1_cb(callback,delay){
    console.log("doAsyncOperation1_cb");
    setTimeout(callback,delay);
}
function doAsyncOperation2_cb(callback,delay){
    console.log("doAsyncOperation2_cb");
    throw new Error("Erreur de doAsyncOperation2_cb");
    setTimeout(callback,delay);
}

function cb1(){
    console.log("Je suis la callback 1");
}

function cb2(){
    console.log("Je suis la callback 2, j'appelle doAsyncOperation2_cb");
    doAsyncOperation2_cb(cb1,1000);
}

try{
    doAsyncOperation1_cb(cb2,3000)
}catch (err){
    console.log('caught error '+err);
}

//////////////////////////





const doAsyncOperation1 = (delay) => {
    return new Promise((resolve, reject) => {
        console.log("doAsyncOperation1");
        setTimeout(resolve, delay);
    });
}



const doAsyncOperation2 = (delay) => {
    return new Promise((resolve, reject) => {
        console.log("doAsyncOperation2");
        throw new Error("Ooooops");
        setTimeout(resolve, delay); //pas exécuté car lancement de l'erreur
    });
}




   
doAsyncOperation1(1000)
    .then(() => {
        return doAsyncOperation2(1000);
    })
    .then( () => { console.log('final'); } )
    .catch((err) => {
        throw new Error("high-level error "+err.message);
    })
    .catch((err) => {
        console.log('caught error '+err);
    });
*/

