import React from 'react'

const rent = ({ location, setLocation, date, setDate, typeofhouse, setType, price, setPrice }) => {
  return (
    <div className="rent">
    <div className="innercontent">
     <label>Enter City/Dzongkhag/Location</label>
     <input type='text' placeholder="location"
     value={location}
     onChange={(e)=>setLocation(e.target.value)}/>
     
     </div>
    <div className="innercontent">
     <label>Check-In</label>
     <input type="date" placeholder="select date"
     value={date}
     onChange={(e)=>setDate(e.target.value)}
     />
     </div>
    <div className="innercontent">
     <label>Type of house</label>
     <input type="text" placeholder="type"
     value={typeofhouse}
     onChange={(e)=>setType(e.target.value)}
     />
     </div>
    <div className="innercontent">
     <label>Price Per Month</label>
     <input type="number" placeholder="price"
     value={price}
     onChange={(e)=> setPrice(e.target.value)}/>
     </div>
    </div>
  )
}

export default rent