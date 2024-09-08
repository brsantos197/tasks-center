'use client'
import { useEffect, useState, createContext, ReactNode, useContext } from "react"

export interface Task {
  id: string
  text: string
  completed: boolean
  score: number
  endDate?: string
}


const TasksContext = createContext({} as {
  tasks: Task[]
  addTask: ({ text, score }: Pick<Task, "text" | "score">) => void
  removeTask: (id: Task["id"]) => void
  toggleTask: (id: Task["id"]) => void
  setEndDate: (id: Task["id"], endDate: Task["endDate"]) => void
})

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = ({ text, score }: Pick<Task, "text" | "score">) => {
    setTasks(state => [...state, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      score
    }])
  }

  const removeTask = (id: Task["id"]) => {
    setTasks(state => state.filter(task => task.id !== id))
  }

  const toggleTask = (id: Task["id"]) => {
    setTasks(state => state.map(task => task.id === id ? { ...task, completed: !task.completed, endDate: !task.completed ? new Date().toISOString() : undefined } : task))
  }

  const setEndDate = (id: Task["id"], endDate: Task["endDate"]) => {
    setTasks(state => state.map(task => task.id === id ? { ...task, endDate, completed: true } : task))
  }

  useEffect(() => {
    if (!tasks.length) {
      setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"))
    }
  }, [])

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  return (
    <TasksContext.Provider value={{
      tasks,
      addTask,
      removeTask,
      toggleTask,
      setEndDate
    }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => {
  return useContext(TasksContext)
}