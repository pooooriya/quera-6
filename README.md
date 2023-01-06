## Component Lifecycles In ReactJs
 ### phase-1 Initialization
 ```
 #### مقادیر اولیه استیت را میگیرد
 const [state,setstate]=useState(10)
 #### ترتیب و اولویت هوک ها و استفاده درست از آن ها را چک میکند
 useEffect() useState() useMemo() useCallback()
 ```
 ### phase-2 Mounting
  ```
  #### رندر شدن کامپوننت
  ComponentWillMount() === UseEffect(()=>{},[])
  ```
### phase-3 Updating (ReRendering)
```
1.State Changes (Setter SetState)
2.Parent ReRendering => React.Memo();
```

### phase-4 unMount 
```
addEventListener() => RemoveEventListener()
Intervall =>SetInterval(()=>{},1000)=>clearInterval();
ComponentWillUnmount() => UseEffect(()=>{
    // useEffect Codes 
    // mounting
    var id = SetInterval()
    addEventListener()
    return => {
        clearInterval(id)
        //unmounting
        RemoveEventListener()
    }
},[])
```

## ConditinalRendering
```
import { useEffect, useState } from "react";

//conditionalRendering
function App() {
  const [isActive, SetIsActive] = useState(true);

  return isActive && (<div> ManActiveAm</div >)
}

export default App;
```


# Forms
### 1. Tredetional
```
import { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { useForm } from "react-hook-form"
const TodoApp = ({ title }) => {
     const [form, setForm] = useState({
         todo: ""
     });
    const [todo, setTodo] = useState();
    const getAllTodos = () => {
        axios.get("http://localhost:3000/todos")
            .then(res => setTodo(res.data));
    }
    const handleRemoveTodo = (id) => {
        axios.delete("http://localhost:3000/todos/" + id).then(() => {
            // copy state ra begir
            const copy = [...todo];
            //taqiirrr bede copy ra
            const newState = copy.filter(n => n.id !== id);
            // setstate kun
            setTodo(newState)
        })
    }
     const handleInputOnChange = (e) => {
          //1. setForm({ ...form, [e.target.name]: e.target.value })
         setForm({ todo: e.target.value })
     }

     const handleAddTodo = () => {
         if (form.todo) {
             axios.post("http://localhost:3000/todos/", {
                 id: new Date().getTime(),
                 title: form?.todo
             }).then(res => {
                 setTodo([...todo, res.data])
                 setForm({ todo: "" })
             })
         }
     }

    const handleFormSubmit = (data) => {
        axios.post("http://localhost:3000/todos/", {
            id: new Date().getTime(),
            title: data.todo
        }).then(res => {
            setTodo([...todo, res.data])
            //setForm({ todo: "" })
            reset()
        })
    }

    useEffect(() => {
        getAllTodos();
    }, [])

    return (
        <div className="todo">
            <h2 className="todo_headline">{title}</h2>
            <ul className='todo_container'>
                {todo?.length === 0 ? (
                    <h5>یادداشتی نوشته نشده است</h5>
                ) : (todo?.map(item => (
                    <li>
                        <span>
                            {item.title}
                        </span>
                        <span onClick={() => handleRemoveTodo(item.id)}>
                            {"\u00D7"}
                        </span>
                    </li>
                )))}


            </ul>
            <div className='todo_input'>
                <input name="todo" type="text" onChange={handleInputOnChange} />
                <input type="submit" value="+" onClick={handleAddTodo} />
            </div>
        </div>
    )
}
export default TodoApp
```

### 2. React Hook Form

```

import { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { useForm } from "react-hook-form"
const TodoApp = ({ title }) => {
    const { register, handleSubmit, reset, formState: { isDirty, isValid ,errors} } = useForm();
    const [todo, setTodo] = useState();
    const getAllTodos = () => {
        axios.get("http://localhost:3000/todos")
            .then(res => setTodo(res.data));
    }
    const handleRemoveTodo = (id) => {
        axios.delete("http://localhost:3000/todos/" + id).then(() => {
            // copy state ra begir
            const copy = [...todo];
            //taqiirrr bede copy ra
            const newState = copy.filter(n => n.id !== id);
            // setstate kun
            setTodo(newState)
        })
    }
 
    const handleFormSubmit = (data) => {
        axios.post("http://localhost:3000/todos/", {
            id: new Date().getTime(),
            title: data.todo
        }).then(res => {
            setTodo([...todo, res.data])
            //setForm({ todo: "" })
            reset()
        })
    }

    useEffect(() => {
        getAllTodos();
    }, [])

    return (
        <div className="todo">
            <h2 className="todo_headline">{title}</h2>
            <ul className='todo_container'>
                {todo?.length === 0 ? (
                    <h5>یادداشتی نوشته نشده است</h5>
                ) : (todo?.map(item => (
                    <li>
                        <span>
                            {item.title}
                        </span>
                        <span onClick={() => handleRemoveTodo(item.id)}>
                            {"\u00D7"}
                        </span>
                    </li>
                )))}
            </ul>
            <form className='todo_input' onSubmit={handleSubmit(handleFormSubmit)}>
                <input {...register("todo", { required: true })} type="text" />
                {errors.todo && <span>این فیلد ضروری است</span>}
                <input disabled={!isDirty && !isValid} type="submit" value="+" />
            </form>
        </div>
    )
}
export default TodoApp
```

### High Order Component 
Component => (Component) => Taqiresh => Component
```
import { Navigate } from "react-router-dom";

export const PrivateComponents = (Component) => (props) => {
    const token = localStorage.getItem("token");
    return token ? (<Component />) : <div>hello</div>
}
export default PrivateComponents
```