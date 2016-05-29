import { Store, Combiner } from 'strikejs';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as Immutable from 'immutable';
import { AppCtrl } from './controllers/App/App';
(function () {
    //create a new store instance, setting both tracking changes and readiness flags to false. 
    //a store can track actions that happen within the application such that they can be played later on to get the application to a specific state. 
    //a store can also be configured as not ready, in which case any actions received before it becomes ready, will be added to the queue and executed in turn when the store is ready. 
    let store = Store.create(Immutable.Map({}), Combiner.combine(), [], false, false);
    //render the application 
    ReactDOM.render(React.createElement(AppCtrl, {store: store}), document.getElementById("SiteContainer"), () => {
        //mark the store as ready to dispatch actions, and dispatch any actions that are currently in the queue.  
        store.ready();
    });
}());
//# sourceMappingURL=main.js.map