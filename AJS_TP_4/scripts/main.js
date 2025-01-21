import {fetch2numbers} from "./modules/fetch2numbers.js"


document.addEventListener("DOMContentLoaded", init);






function init(){
    // 
    fetch2numbers()



    //
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
            if (e.data.error) {//on repère que le message issu du worker est en fait une remontée d'erreur.
                console.log('Error from Worker:', e.data.error);
                // on peut éventuellement faire un throw ici.
              } else {
                result.textContent = e.data;
                console.log('Message received from worker');
              }
        }

        myWorker.onerror = function(err){
            console.error('Worker error:', e.message); //une erreur dans le cycle de vie du worker est survenue.
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

