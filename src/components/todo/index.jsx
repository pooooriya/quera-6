import { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Input } from './style'
const TodoApp = ({ title }) => {
    const { register, handleSubmit, reset, formState: { isDirty, isValid, errors } } = useForm();
    // const [form, setForm] = useState({
    //     todo: ""
    // });

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
    // const handleInputOnChange = (e) => {
    //     // setForm({ ...form, [e.target.name]: e.target.value })
    //     setForm({ todo: e.target.value })
    // }

    // const handleAddTodo = () => {
    //     if (form.todo) {
    //         axios.post("http://localhost:3000/todos/", {
    //             id: new Date().getTime(),
    //             title: form?.todo
    //         }).then(res => {
    //             setTodo([...todo, res.data])
    //             setForm({ todo: "" })
    //         })
    //     }
    // }

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
                ) : (todo?.map((item) => (
                    <li key={item.id}>
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
                <Input {...register("todo", { required: true })} type="text" />
                {/* {errors.todo && <span>این فیلد ضروری است</span>} */}
                <input disabled={!isDirty && !isValid} type="submit" value="+" />
            </form>
        </div>
    )
}
export default TodoApp