import React, { useState } from 'react';

interface Work {
  name: string;
  id: number;
  checkIn: boolean;
}

export default function App() {
  const [toDoList, setToDoList] = useState<Work[]>([]); 
  const [work, setWork] = useState<string>('');
  const [done,setDone]=useState<Work[]>([])

  const input = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWork(e.target.value);
  };

  const add = () => {
    if (work !== '') {
      const newWork: Work = {
        name: work,
        id: toDoList.length + 1,
        checkIn: false
      }
      setToDoList([...toDoList, newWork]);
    }
    else{
      alert("khong duoc de trong input")
    }
  }

  const deleteItem = (id: number) => {
    const index = toDoList.findIndex(item => item.id === id);
    if (index !== -1) {
      const check = confirm("Bạn có chắc muốn xóa nó?");
      if (check) {
        const newList = [...toDoList];
        newList.splice(index, 1);
        setToDoList(newList);
      }
    }
  }

  const change = (id: number) => {
    const index = toDoList.findIndex(item => item.id === id);
    if (index !== -1) {
      const newValue = prompt("Nhập giá trị mới:");
      const newList = [...toDoList];
      if (newValue !== null) {
        newList[index].name = newValue;
        setToDoList(newList);
      }
      else{
        alert("khong duoc de trong input")
      }
    }
  }

  const toggleCheck = (id: number) => {
    const index = toDoList.findIndex(item => item.id === id);
    if (index !== -1) {
      const newList = [...toDoList];
      newList[index].checkIn = !newList[index].checkIn;
      setToDoList(newList);
      console.log(toDoList[index].checkIn);
    }
  }
  const showDone = () => {
    const doneList = toDoList.filter(item => item.checkIn);
    setDone(doneList);
  }
  
  const showNotDone = () => {
    const notDoneList = toDoList.filter(item => !item.checkIn);
    setDone(notDoneList);
  }
  

  return (
    <div>
        <div className='container'>
  <div className='input-container'>
    <input type="text" value={work} onChange={input} />
    <button className='add' onClick={add}>Add work</button>
    <button onClick={showDone}>Show done_work</button>
    <button onClick={showNotDone}>Show not done_work</button>
  </div>
  <div className='todo-list'>
    {toDoList.map((item) => (
      <div key={item.id} className={`todo-item ${!item.checkIn ? '' : 'completed'}`}>
        <input 
          type="checkbox" 
          checked={item.checkIn} 
          onChange={() => toggleCheck(item.id)} 
        />
        <span>{item.name}</span>
        <button onClick={() => change(item.id)}>Edit</button>
        <button onClick={() => deleteItem(item.id)}>Delete</button>
      </div>
    ))}
  </div>
  <div className='done-list'>
    <h2>Completed Tasks:</h2>
    {done.map((item) => (
      <div key={item.id} className={`todo-item ${!item.checkIn ? '' : 'completed'}`}>
        <input 
          type="checkbox" 
          checked={item.checkIn} 
          onChange={() => toggleCheck(item.id)} 
        />
        <span>{item.name}</span>
        <button onClick={() => change(item.id)}>Edit</button>
        <button onClick={() => deleteItem(item.id)}>Delete</button>
      </div>
    ))}
  </div>

</div>

    </div>
  )
}
