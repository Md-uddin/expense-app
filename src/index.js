import React from "react";
import ReactDOM from "react-dom";

import App from './App'
import './index.css'
import { SpeechProvider } from "@speechly/react-client";
import { Provider } from './Constext.js/Context';

ReactDOM.render(
    <SpeechProvider appId="cfbcc8be-04b8-4596-8ba7-1f6a9626e7f2" language="en-US">

    <Provider>
        <App />
    </Provider>
    </SpeechProvider>,
     document.getElementById('root'))
