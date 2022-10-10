import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from './store';
import Header from './components/layout/header';

import Dashboard from './components/dashboard/index';
import Leaderboard from './components/leaderboard/index';
import Sidebar from './components/layout/sidebar';

// import Datatable from './components/leaderboard/datatable';
// import Datatable1 from './components/leaderboard/index0';

// import "./css/style.css";
// import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";

// import "./chart.css";
// import "./index.css";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Sidebar />
                <Routes>
                    <Route exact path = "/"             element = {<Dashboard/>} />
                    <Route exact path = "/leaderboard"  element = {<Leaderboard/>} />
                    {/* <Route exact path = "/datatable"    element = {<Datatable/>} />
                    <Route exact path = "/datatable1"   element = {<Datatable1/>} /> */}
                </Routes>
            </Router>
        </Provider>
    );

}

export default App;