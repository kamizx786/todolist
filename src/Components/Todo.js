import React, { useEffect } from 'react'
import "./style.css";
import { useState } from 'react';
const GetLocaldata=()=>{
    const list=localStorage.getItem("mytodolist");
    if(list)
    {
        return JSON.parse(list);
    }
    else {
        return [];
    }
};
const Todo = () => {
const [newinput,setnewinput]=useState("");
const [newItem,setnewItem]=useState(GetLocaldata());
const [editItem,setEditItem]=useState("");
const [toggleButton,setToggleButton]=useState(false);
const Additem=()=>{
if(!newinput)
{
    alert("Please Add Something");
}
else if(newinput && toggleButton)
{
    setnewItem(newItem.map((curlElem)=>{
   if(curlElem.id===editItem)
   {
    return {...curlElem,name:newinput}
   }
   else 
   {return curlElem;}
    }));
    setEditItem("");
    setnewinput([]);
    setToggleButton(false);
}
else
{
    const myNewInput={
        id:new Date().getTime().toString(),
        name: newinput,
    };
    setnewItem([...newItem,myNewInput]);
    setnewinput("");
}
};
const Edititem=(ID)=>{
const editeditem= newItem.find((curlElem)=>{
   return curlElem.id===ID;
});
setEditItem(ID);
setnewinput(editeditem.name);
setToggleButton(true);
}
const Deleteitem=(ID)=>{
const Updateditem =newItem.filter((curlElem)=>{
    return curlElem.id !==ID;
})
setnewItem(Updateditem);
};
const Removeall=()=>{
    setnewItem([]);
}
useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(newItem));
    },[newItem]);
  return (
    <>
    <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={newinput}
              onChange={(event)=>setnewinput(event.target.value)}
            />    
            {toggleButton? <i className="fa fa-edit add-btn" onClick={Additem}></i> :
            <i className="fa fa-plus add-btn" onClick={Additem}></i>  }    
               
          </div>
          {/* show our items  */}
          <div className="showItems">
            {
                newItem.map((curlElem,index)=>{
                return(
                    <div className="eachItem" key={index}>
                    <h3>{curlElem.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                       onClick={()=>Edititem(curlElem.id)}
                       ></i>
                      <i
                        className="far fa-trash-alt add-btn"
                        onClick={()=>Deleteitem(curlElem.id)}
                       ></i>
                    </div>
                  </div>
                );
                })
            }
            
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={Removeall}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
