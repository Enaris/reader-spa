import { compose } from 'redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import WSpinner from '../../general/spinner/w-spinner/w-spinner.component';
import './tags-table.styles.scss'
import { Link } from 'react-router-dom';

const TagsTable = ({ tags, user, isLoading }) => {

  return (
    <React.Fragment>
      { !tags || tags.length === 0 ? 
        <div> There are no tags yet. </div> 
        :
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Readings Count</TableCell>
                { user &&
                  <TableCell>Mean cpm</TableCell>
                }
                { user &&
                  <TableCell>Mean wpm</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              { tags.map((tag) => (
                <TableRow key={ tag.id }>
                  <TableCell component="th" scope="row">
                    <Link to={ `/tags/${tag.id}` } className='simple-link'>
                      { tag.name }
                    </Link>
                  </TableCell>
                  <TableCell>{ tag.tagedCount }</TableCell>
                  { user &&
                    <TableCell>{ tag.meanCpm > 0 ? tag.meanCpm.toFixed(2) : '-' }</TableCell>
                  }
                  { user &&
                    <TableCell>{ tag.meanWpm > 0 ? tag.meanWpm.toFixed(2) : '-' }</TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </React.Fragment>
  )
}

export default compose(
  WSpinner
)(TagsTable);