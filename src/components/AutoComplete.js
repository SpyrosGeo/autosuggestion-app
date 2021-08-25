
import React from 'react'
import './AutoComplete.css'
export default function AutoComplete({isVisible,suggestions,handleSuggestionClick}) {
    return (
        <div className={`${isVisible}?'show suggestion-box':'suggestion-box' `}>
            <ul className="list">
                {suggestions.map((country,index)=>(
                    <li className="list-item" key={index} onClick={()=> handleSuggestionClick(country)}>
                        {country}
                    </li>
                ))}
            </ul>
            
        </div>
    )
}
