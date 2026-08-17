import {  useState } from "react"
import Button from "../../ui/Button";


function EventsFilter() {

    const [filterString, setFilterString] = useState("")

    function handleChange(e){
        setFilterString(e.target.value);

        //submit filter, cancelling any prior filter
    }

 console.log("filterstring", filterString); // Check if this prints
    return (
        <div className="filter">
            <span className="text-xl font-semibold">Filter:</span>          
<input type="text" placeholder="Begin typing event name or performer or venue or category or city" defaultValue = {filterString} value={filterString} onChange={(e) => handleChange(e)} /><Button type="secondary" onClick={() => setFilterString("")}>Reset</Button>
        </div>
    )
}

export default EventsFilter
