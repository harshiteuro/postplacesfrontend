import React from "react";
import UsersList from "../components/UsersList";

const Users=()=>{
    const USERS=[{id:'u1',name:'marcos',image:'https://media.istockphoto.com/id/1344252964/photo/dedicated-female-student-of-asian-ethnicity-having-online-class-via-laptop-from-the-modern.jpg?s=612x612&w=0&k=20&c=5bIhF1CMi7YEF3EL1wNx7btMdreRijS6URaD4DscZ18=',places:3}];
    return (<UsersList items={USERS}></UsersList>);
}

export default Users;