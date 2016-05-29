/**
 * Notes:
 * 1. Store class is very similar to Flux stores except that in an application there is only one store managing the application state.
 * 2. Combiner class is used by the store to construct the final state from the results of individual reducer functions. 
 * 3. Injectable is a middleware that allows for service-actions [i.e. actions that requires access to services] to be intercepted and for the required services to be injected into the action service receiver function. 
 * 4. IntegerPromisify is an implementation of the Promisify middleware that uses integer flags instead of appending/prepending string to the action.
 * 5. Injector class is a dependency injection module, uses similar formats to the one used in AngularJS.    
 */
import {Store,Combiner,Injectable,Injector,IntegerPromisify} from 'strikejs'; 
import * as ReactDOM from 'react-dom'; 
import * as React from 'react';
import * as Immutable from 'immutable';
import {AppCtrl} from './controllers/App/App';  
(function(){
    //create a new instance of the dependency injection module 
    let inj = new Injector(); 
    //register any services here 
    
    //create a new store instance, setting both tracking changes and readiness flags to false. 
    //a store can track actions that happen within the application such that they can be played later on to get the application to a specific state. 
    //a store can also be configured as not ready, in which case any actions received before it becomes ready, will be added to the queue and executed in turn when the store is ready. 
    let store = Store.create(Immutable.Map({}),Combiner.combine(),[Injectable(inj),IntegerPromisify],false,false);
     
    //add the store to the injector such that it can be injected when needed. 
    inj.addInstance('store',store);
     
    //render the application 
    ReactDOM.render(<AppCtrl store={store} injector={inj} />,document.getElementById("SiteContainer"),()=>{
        //mark the store as ready to dispatch actions, and dispatch any actions that are currently in the queue.  
        store.ready(); 
    });
    
}());