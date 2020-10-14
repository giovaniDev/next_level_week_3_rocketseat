import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Orfanates from './pages/Orfanates';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/app' component={Orfanates} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;