import { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import _ from 'lodash'
import { Form } from 'react-bootstrap'
import AutoComplete from './AutoComplete';
import useOutsideClick from './useOutsideClick';


export default function InputControl({ name, label, placeholder }) {
    const [documentRef, isVisible, setIsVisible] = useOutsideClick()
    const [suggestions, setSuggestions] = useState([])
    const [selectCountry, setSelectCountry] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const ref = useRef()

    useEffect(() => {
        ref.current = _.debounce(process, 300);
    })


    const processRequest = async (searchValue) => {
        try {
            const response = await axios.get('/countries.json')
            const countries = response.data
            const result = countries.filter((country) =>
                country.toLowerCase().includes(searchValue.toLowerCase())
            )
            setSuggestions(result)
            if (result.length > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false)
            }
            setErrorMsg('')

        } catch (error) {
            setErrorMsg('Something went wrong. Try again later')
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const { value } = e.target;
        setSearchTerm(value)
        ref.current(value)
    }
    const handleSuggestionClick = (countryValue) =>{
        setSelectCountry(countryValue)
        setIsVisible(false)
    }
    return (
        <Form.Group controlId="searchTerm">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="input-control"
        type="text"
        value={searchTerm}
        name={name}
        onChange={handleSearch}
        autoComplete="off"
        placeholder={placeholder}
      />
      <div ref={documentRef}>
        {isVisible && (
          <AutoComplete
            isVisible={isVisible}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
      {selectedCountry && (
        <div className="selected-country">
          Your selected country: {selectedCountry}
        </div>
      )}
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </Form.Group>
    )
}
