import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FormStyled } from "../Components/styledComponents";
import {useNavigate} from 'react-router-dom'

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate()

    function submitEvent(e) {
        e.preventDefault();
        navigate(`/searched/${input}`)


    }
    return (
        <FormStyled onSubmit={submitEvent}>
            <div>
                <FaSearch />
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                />
            </div>
        </FormStyled>
    );
}

export default Search;
