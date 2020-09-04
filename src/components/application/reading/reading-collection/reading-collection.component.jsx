import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './reading-collection.styles.scss';
import ReadingCard from '../reading-card/reading-card.component';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';

const ReadingCollection = ({ readings, user, isLoading }) => {
  
  return (
    <div className='reading-collectioin'>
      { readings && readings.length > 0 &&
        readings.map(r => <ReadingCard key={r.id} reading={ r } imageCard={ user ? true : false } />)
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

// export default connect(mapStateToProps)(ReadingCollection);
export default compose(
  connect(mapStateToProps), 
  WSpinner
)(ReadingCollection);