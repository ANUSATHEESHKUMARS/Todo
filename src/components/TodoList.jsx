import TodoItem from './TodoItems';
import styles from './todolist.module.css'

export default function TodoList({todos , setTodos}){
    const sortedTodos = todos.slice().sort((a ,b)=>Number(a.done)-Number(b.done))
    if(todos.length == 0){
        return(
            <div className={styles.list}>
                <div className={styles.noTasks}>
                    <span className={styles.noTasksIcon}>📝</span>
                    <p>No tasks yet. Add a new task to get started!...</p>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.list}>
            {sortedTodos.map((item)=>(
                <TodoItem
                key={item.name}
                item={item}
                todos={todos}
                setTodos={setTodos}/>
            ))}
        </div>
    )
}