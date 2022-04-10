import "./wrapper.style.scss"
import { useState } from "react";
import { useEffect } from "react";

import AddItem from "../addItem";
import ItemsFilter from "../ItemsFilter";

export default function Wrapper() {
  const [items,setItems] = useState([])
  const [editItem,setEditItem] = useState({})
  
  //Retrive items from localStorage
  useEffect(()=>{
    const itemsFromLS = localStorage.getItem("items")
    if(!itemsFromLS) return
    setItems(JSON.parse(itemsFromLS))
  },[])
  //Add items to localStorage
  useEffect(()=>{
    if(!items.length) return
    const itemsStr = JSON.stringify(items)
    localStorage.setItem("items",itemsStr)
  },[items])
  const minimalizeBuild = () => {
    const mainContainer = document.querySelector(".close_con")
    mainContainer.classList.toggle("close")
  }
  return (
    <section className="wrapper">
        <button className="hide_add" onClick={minimalizeBuild}>
            <img src="/images/minus_btn.svg" />
        </button>
        <AddItem setItems={setItems} editItem={editItem} setEditItem={setEditItem}/>
        <ItemsFilter items={items} setItems={setItems} setEditItem={setEditItem}/>
    </section>
  )
}
