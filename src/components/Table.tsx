import * as React from "react";
import { Type } from "./Edit";
import { AddUser } from "./AddUser";
import {AddRegular} from '@fluentui/react-icons'
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
} from "@fluentui/react-components";
import { useRouter } from "next/router";


const columns = [
  { columnKey: "id", label: "id" },
  { columnKey: "firstname", label: "firstname" },
  {columnKey:"lastname", label:"lastname"},
  { columnKey: "email", label: "email" },
  { columnKey: "role", label: "role" },
  { columnKey: "action", label: "action" },

];

 const  CustomTable= ({allUser, setAllUser}) => {
    const [editid, setEditid] = React.useState(0);
    const [editToggle, setEditToggle] = React.useState(false);
    const [updateToggle, setUpdateToggle] = React.useState(false)
    const [currentpage, setCurrentPage] = React.useState(1);
    const router = useRouter();
    React.useEffect(()=>{
        let token = JSON.parse(localStorage.getItem('dummyToken'));
        if(!token){
          router.push('/login');
        }
      },[])

     const handleDelete= (id) =>{
      fetch(`https://dummyjson.com/users/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => setAllUser(allUser.filter(item => item.id !== data.id)));
     }

     const handleEdit = (id) =>{
      setEditToggle(true)
      setEditid(id)
     }

     const ITEM_PER_PAGE = 5;
     const handleNextPage = () =>{
      if(currentpage * ITEM_PER_PAGE < allUser.length){
        setCurrentPage(currentpage + 1);
        console.log("next is workign..........")
      }
     }
     const handlePrevPage = () =>{
      if(currentpage > 1){
        setCurrentPage(currentpage - 1);
        console.log("previous is working..................")
      }
     }
  return (
    <>
    {editToggle &&  <div className="ml-5">
       <Type allData={allUser} currentId = {editid} setAllUser={setAllUser} setEditToggle={setEditToggle} />
    </div>}
   
    {updateToggle &&  <div className="ml-5">
      <AddUser setAddToggle={setUpdateToggle}  setAllUser={setAllUser} />
    </div> }
   
    
    <Table className="ml-5" arial-label="Default table" style={{ minWidth: "510px" }}>
      <div> 
          <h1 className='text-4xl text-center mt-5 mb-4 '>All USers</h1>
      </div>
      <Button onClick={()=> setUpdateToggle(true)} icon={<AddRegular />}>Add</Button>

      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell className="font-bold text-xl" key={column.columnKey}>
              {column.label}
            </TableHeaderCell>
          ))}
         
        </TableRow>
    
      </TableHeader>
      <TableBody>
        {allUser?.slice((currentpage-1)* ITEM_PER_PAGE ,currentpage*ITEM_PER_PAGE).map((user) => (
          <TableRow key={user.id}>
            <TableCell>
                {user.id}
            </TableCell>
            <TableCell>
              <TableCellLayout>
                {user.firstName}
              </TableCellLayout>
            </TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
                {user.role}
            </TableCell>
            <TableCell>
                <Button onClick={()=>handleEdit(user.id)}>Edit</Button>
                <Button onClick={()=>handleDelete(user.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Button onClick={handlePrevPage}>Prev</Button>
     <Button onClick={handleNextPage} >Next</Button>
    </Table>
    
    </>
   
  );
};

export default CustomTable;