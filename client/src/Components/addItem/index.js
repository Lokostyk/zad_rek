import "./addItem.style.scss"
import { nanoid } from "nanoid"
import axios from "axios"
import { useState,useEffect } from "react"

export default function AddItem({setItems,editItem,setEditItem}) {
  const defaultItem = {"name":"","description":"","category":"Inne","price":""}
  const [item,setItem] = useState(defaultItem)
  const [newCategoryList,setNewCategoryList] = useState([])
  const [newCategory,setNewCategory] = useState("")

  useEffect(()=>{
    if(editItem.id){
      setItem(editItem)
    }
  },[editItem])
  const handleChange = (e) => {
    setItem({...item,[e.target.dataset.type]:e.target.value})
  }
  const addItem = (e) => {
    e.preventDefault()
    //Checking if user is editing
    if(editItem.id){
      setItems((prevState)=>prevState.reduce((newArr,i)=>{
        if(i.id === editItem.id){
          newArr.push(item)
        }else {
          newArr.push(i)
        }
        return newArr
      },[]))
      axios.post("/edit",item)
      setEditItem({})
      setItem(defaultItem)
      return
    }
    const id = nanoid(15)
    const newItem = {"id":id,...item}

    setItems((prevState)=>[newItem,...prevState])
    axios.post("/save",newItem)
    setItem(defaultItem)
  }
  const addNewCategory = (e) => {
    e.preventDefault()
    setNewCategoryList([...newCategoryList,newCategory])
    setNewCategory("")
  }
  return (
    <div className="add_item">
        <div className="close_con">
          <h1>Stwórz nowe stanowisko</h1>
          <form onSubmit={addItem}>
            <input type="text" placeholder="Nazwa" data-type="name"
              value={item.name} onChange={handleChange} min={0} max={20} required/>
            <input type="text" placeholder="Opis" data-type="description"
              value={item.description} onChange={handleChange} min={0} max={30} required/>
            <label forhtml="category">Wybierz kategorię:</label>
            <select id="category" data-type="category" value={item.category} onChange={handleChange}>
              <option value="Podzespoły Komputera">Podzespoły Komputera</option>
              <option value="Urządzenia Peryferyjne">Urządzenia Peryferyjne</option>
              <option value="Oprogramowanie">Oprogramowanie</option>
              <option value="Inne">Inne</option>
              {newCategoryList.map(cat=>(
                <option value={`${cat}`}>{cat}</option>
              ))}
            </select>
            <input type="number" placeholder="Cena" data-type="price"
              value={item.price} onChange={handleChange} min={0} max={100000} required/>
            <input type="submit" value={`${editItem.id?"Zapisz":"Dodaj"}`}/>
          </form>
          <h2 className="new_category">Dodaj nową kategorię</h2>
          <form onSubmit={addNewCategory}>
            <input placeholder="Nowa kategoria" value={newCategory} onChange={(e)=>setNewCategory(e.target.value)}/>
            <input type="submit" value="Dodaj"/>
          </form>
        </div>
    </div>
  )
}
