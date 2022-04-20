import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AxiosAPI()
{
    var [loading, setLoading] = useState(false);
    var [stateError, setStateError] = useState(null);
    var [responseData, setResponseData] = useState(null);

    const fetch = async () => {
        try {
            setStateError(null);
            setLoading(true);        
            const response = await axios.get('https://api.github.com/repos/sungbumv/payhere_rest');
            setResponseData(response.data);
        }
        catch(e){
            setStateError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    }, []);

    if(loading)
    {
        return <h3> 로딩중입니다 </h3>;
    } 
    if(stateError)
    {
        return <h3> 에러가 발생했습니다.</h3>;
    }

    if(!responseData)
    {
        return <h3> ResponseData is NULL </h3>;
    }

    return (
        <>
	    <h3>
	      {responseData.id} 
          <hr/>
          {responseData.node_id}
          <hr/>
          {responseData.name}
          <hr/>
          {responseData.full_name}
          <hr/>
          {responseData.private}
	    </h3>
			
			<button onClick={ fetch }>다시 불러오기</button>
		</>
    );
}

export default AxiosAPI;