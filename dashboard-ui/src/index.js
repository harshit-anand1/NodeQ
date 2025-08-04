import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as router } from "react-router-dom";
import App from "../dashboard-ui/src/App";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)