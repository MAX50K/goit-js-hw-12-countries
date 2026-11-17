function fetchCountries(searchValue){
    return fetch(`https://countries.dev/name/${searchValue}`)
  .then(res => res.json())
 
}

export default fetchCountries;