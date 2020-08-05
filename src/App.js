import React from 'react';
import './App.scss';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTheme } from './redux/reader-theme/reader-theme.selectors';
import ReaderPage from './pages/reader-page/reader-page.component';
import { Switch, Route } from 'react-router-dom';
import LibraryPage from './pages/library-page/library-page.component';
import NavBar from './components/general/nav-bar/nav-bar.component';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomePage from './pages/home-page/home-page.component';
import LoginPage from './pages/login-page/login-page.component';
import RegisterPage from './pages/register-page/register-page.component';

const muiTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App({ theme }) {
  return (
    <ThemeProvider theme={ theme }>
      <MuiThemeProvider theme={ muiTheme }>
        <CssBaseline />
        <div className="App">
          <NavBar />
          <Switch className='flex_wh100'>
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/lib' component={ LibraryPage } />
            <Route exact path='/reader' component={ ReaderPage } />
            <Route exact path='/login' component={ LoginPage } />
            <Route exact path='/register' component={ RegisterPage } />
          </Switch>
        </div>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  theme: selectTheme
});

export default connect(mapStateToProps)(App);
