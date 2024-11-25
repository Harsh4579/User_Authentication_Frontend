import React,{useEffect, useState} from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const Users=()=>{
    // const USERS = [{ id: '1', name: 'Harsh', place: 'Jamshedpur', image: '../../../public/harsh.jpg', places: 3 }];
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    const [loadedUser,setLoadedUser]=useState();
    useEffect(()=>{
        const fetchUsers=async ()=>{
            // setisLoding(true);
            try{
                const responseData=await sendRequest('http://localhost:5000/api/users');

                setLoadedUser(responseData.users);
            }catch(err){
                
            }
        };
        fetchUsers();
    },[sendRequest])
    // const errorHandler=()=>{
    //     setError(null);
    // }
    return <React.Fragment> 
        <ErrorModal error={error} onClick={clearError}/>
        {isLoading && <div className="center">
            <LoadingSpinner/>
            </div>
        }
    {!isLoading && loadedUser && <UserList items={loadedUser} />}
    </React.Fragment>;
};
export default Users;