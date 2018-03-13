import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';


import "./App.css";
import "./css/responsive.css";
import "./css/material-design-iconic-font.css"
import "./css/animate.css";
import "./css/animate-text.css";
import "./css/nivo-slider.css";
import "./css/slick.css";
import "./css/font-awesome.min.css";
import "./css/shortcode/default.css";
import "./css/shortcode/header.css";
import "./css/shortcode/slider.css";
import "./css/shortcode/get-touch.css";
import "./css/shortcode/app-benefits.css";
import "./css/shortcode/feature.css";
import "./css/shortcode/info.css";
import "./css/shortcode/footer.css";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
