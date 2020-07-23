import React from 'react';
import './App.scss';
import ReaderApp from './components/application/reader-app/reader-app.component';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTheme } from './redux/reader-theme/reader-theme.selectors';

function App({ theme }) {
  return (
    <ThemeProvider theme={ theme }>
      <div className="App">
        <ReaderApp />
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  theme: selectTheme
});

export default connect(mapStateToProps)(App);
