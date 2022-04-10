import axios from "axios"
import "./itemsFilter.style.scss"

export default function ItemsFilter({items,setItems,setEditItem}) {
  const filterByNuber = (option) => {
    const sortedList = items.sort((a,b)=>b[option]-a[option])
    setItems([...sortedList])
  }
  const filterByWord = (option) => {
    const sortedList = items.sort((a,b)=>{
        const upperA = a[option].toUpperCase()
        const upperB = b[option].toUpperCase()
        if (upperA < upperB) {
          return -1;
        }
        if (upperA > upperB) {
          return 1;
        }
        return 0;
    })
    setItems([...sortedList])
  }
  const editItem = (item) => {
    setEditItem(item)
  }
  const removeItem = (id) => {
    if(items.length === 1) localStorage.removeItem("items")
    axios.post("/delete",items.filter(i=>i.id === id)[0])
    setItems(items.filter(i=>i.id !== id))
  }
  return (
    <div>
      <div className="filter">
        <ul className="filter_list">
          <li className="name">Nazwa<button onClick={()=>filterByWord("name")}><img src="/images/a_z.svg"/></button></li>
          <li className="description">Opis <button onClick={()=>filterByWord("description")}><img src="/images/a_z.svg"/></button></li>
          <li className="category">Kategoria <button onClick={()=>filterByWord("category")}><img src="/images/a_z.svg"/></button></li>
          <li className="price">Cena <button onClick={()=>filterByNuber("price")}><img src="/images/arrow.svg"/></button></li>
        </ul>
        <div className="items_container">
        {items.map(item=>{
          return (
            <ul className="item" key={item.id}>
              <li className="name">{item.name}</li>
              <li className="description" >{item.description}</li>
              <li className="category" >{item.category}</li>
              <li className="price">
                {item.price}
                <div className="edit_delete">
                  <button onClick={()=>editItem(item)}><img src="/images/edit.svg"/></button>
                  <button onClick={()=>removeItem(item.id)}><img src="/images/red-x.svg"/></button>
                </div>
              </li>
            </ul>
          )
        })}
        </div>
      </div>
      <div className="filter">
        <ul className="filter_list sum">
          <li className="price">Suma cen / Suma pozycji</li>
          <li className="price" style={{textAlign:"center"}}>{items.reduce((sum,i)=>sum + parseInt(i.price),0)} / {items.length}</li>
        </ul>
      </div>
    </div>
  )
}
