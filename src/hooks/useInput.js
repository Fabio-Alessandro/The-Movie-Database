const { useState } = require ("react");

const useInput = () => {

    const [value, setValue] = useState ("");

    const onChange = event => {

        setValue (event.target.value);
    }

    return { value, onChange }
}

module.exports = { useInput }