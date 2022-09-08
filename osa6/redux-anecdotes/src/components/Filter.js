import { connect } from 'react-redux'
import { applyFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {          
      props.applyFilter(event.target.value.toLowerCase())
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapStateToProps = (state) => {
    return state.filtering
  }

  const mapDispatchToProps = {
    applyFilter
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filter)