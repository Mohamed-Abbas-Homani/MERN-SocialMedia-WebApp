import { useEffect, useState } from "react";

const SearchTag = ({description, token}) => {
    const atIndex = description.indexOf('@');
    const wordAfter =  atIndex !== -1 ? description.substring(atIndex + 1).split(' ')[0] : description;
    const [tId, setTId] = useState("");
    useEffect(() => {
      (async () => { await fetch(
        `http://localhost:3001/users/tag/${wordAfter}`,
        {method: "GET", headers: {Authorization: `Bearer ${token}`
        }})
      .then(response => response.json()).then(data => setTId(data.tId))}
     
      )()
    }, [wordAfter, token])
  
        return wordAfter !== description ? (<>{description.substring(0, atIndex)}{!!wordAfter && !!tId ? <a
         href={`/profile/${tId}`}
         style={{textDecoration: "none"}}
         >@{wordAfter}</a>: <>{`@${wordAfter}`}</>}
         <SearchTag description={description.substring(atIndex + wordAfter.length +1)} token={token}/></>)
         : <>{description}</>
}

export default SearchTag;