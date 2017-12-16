import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled, { injectGlobal } from 'styled-components';
// import { createStore } from 'redux'

// import * as rootReducer from './store/reducers'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Transaction from './components/TransactionInterface';

injectGlobal`
    html {
    height: 100%;
    font-size: 16px; /* important - entire UX font size and padding is relative to this value */
    }

    body {
    height: 100%;
    margin: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;      
    user-select: none;
    }

    html,body {
    background-color: white;
    }

    #root {
    height: 100%;
    }

    .container-fluid {
    height: 100%;
    } 
`

const mockTxnData: Transaction[] = [
{ 
    date: new Date('1/1/2018'),    
    account: 'American_Express',
    category: 'Christmas',
    amount: -50.00
},
{ 
    date: new Date('1/2/2018'),
    account: 'American_Express',
    category: 'New Years',
    amount: -500.00
},
{ 
    date: new Date('12/30/2017'),
    account: 'Capital_One',
    category: 'Birthday',
    amount: 200.00
},
{ 
    date: new Date('1/4/2018'),    
    account: 'Capital_One',
    category: 'Stock market',
    amount: -10.00
},
]

// const store = createStore(rootReducer, {})

const Main = () => {
    const Wrapper = styled.div`
        font-family: ${props => props.theme.fontFamily};
        font-size: ${props => props.theme.fontSize};
        color: ${props => props.theme.palette.textColor};
        background-color: ${props => props.theme.palette.canvasColor};
        position: absolute;
        overflow-y: auto;
        height: 100%;	
        width: 100%;
    `;

    return (
        // <Provider store={store}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
                <Wrapper theme={getMuiTheme(darkBaseTheme)}>
                    <App transactions={mockTxnData}/>                
                </Wrapper>
            </MuiThemeProvider>
        // </Provider>
    )}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
