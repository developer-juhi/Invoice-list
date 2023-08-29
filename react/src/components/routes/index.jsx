import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

const RoutePage = () => {
    return (
        <Router>
            <Routes>
                {routes.map(({ path, component: Component }, key) => {
                    return (
                        <Route exact path={path} element={Component} key={key} />
                    )
                })
                }
            </Routes>
        </Router>
    )
}
export default RoutePage;