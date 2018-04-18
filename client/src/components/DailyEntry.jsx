import React from 'react'

class DailyEntry extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      exercises: []
    }
  }

  render() {
    return(
      <div>
        List of exercises for that day
      </div>
    )
  }

}

export default DailyEntry

//debating on whether this one needs state
//most likely not, will be like videolistentry from recastly
