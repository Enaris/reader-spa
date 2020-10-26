import React, { useEffect } from 'react';
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
import { checkTokenStart } from './redux/auth/auth.actions';
import NonAuthRoute from './components/general/route/non-auth-route/non-auth-route.component';
import { selectCheckingToken } from './redux/auth/auth.selectors';
import TextAddPage from './pages/text-add-page/text-add-page.component';
import LoadingRoute from './components/general/route/loading-route/loading-route.component';
import ReadingPage from './pages/reading-page/reading-page.component';
import ReaderNewTextPage from './pages/reader-new-text-page/reader-new-text-page.component';
import ReadingEditPage from './pages/reading-edit-page/reading-edit-page.component';
import TagsPage from './pages/tags-page/tags-page.component';
import TagDetailsPage from './pages/tag-details-page/tag-details-page.component';

const muiTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App({ theme, checkToken, checkingToken }) {
  useEffect(() => {
    checkToken(sessionStorage.getItem('token'));
  }, [checkToken])

  return (
    <ThemeProvider theme={ theme }>
      <MuiThemeProvider theme={ muiTheme }>
        <CssBaseline />
        <div className="App">
          <NavBar />
          <Switch className='flex_wh100'>
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/lib/:readingId/edit' component={ ReadingEditPage } />
            <Route exact path='/lib/:readingId' component={ ReadingPage } />
            <Route exact path='/tags/:tagId' component={ TagDetailsPage } />
            <Route exact path='/tags' component={ TagsPage } />
            <LoadingRoute exact isLoading={ checkingToken } path='/lib' component={ LibraryPage } />
            <Route exact path='/reader' component={ ReaderPage } />
            <Route exact path='/reader/new' component={ ReaderNewTextPage } />
            <LoadingRoute exact isLoading={ checkingToken } path='/text/add' component={ TextAddPage } />
            <NonAuthRoute exact isLoading={ checkingToken } path='/login' Component={ LoginPage } redirectTo='/' />
            <NonAuthRoute exact isLoading={ checkingToken } path='/register' Component={ RegisterPage } redirectTo='/' />
          </Switch>
        </div>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  theme: selectTheme, 
  checkingToken: selectCheckingToken
});

const mapDispatchToProps = dispatch => ({
  checkToken: token => dispatch(checkTokenStart(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
