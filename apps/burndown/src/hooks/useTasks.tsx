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
  tasksConfig: {
    startDate: string
    endDate: string
    tasks: Task[]
  }
  addTask: ({ text, score }: Pick<Task, "text" | "score">) => void
  removeTask: (id: Task["id"]) => void
  toggleTask: (id: Task["id"]) => void
  setTaskEndDate: (id: Task["id"], endDate: Task["endDate"]) => void
  setStartDate: (startDate: string) => void
  setEndDate: (endDate: string) => void
})

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasksConfig, setTasksConfig] = useState<{
    startDate: string
    endDate: string
    tasks: Task[]
  }>({
    startDate: '',
    endDate: '',
    tasks: [],
  })

  const addTask = ({ text, score }: Pick<Task, "text" | "score">) => {
    setTasksConfig(({ tasks, ...state}) => {
      return {
        ...state,
        tasks: [...tasks, {
          id: crypto.randomUUID(),
          text,
          completed: false,
          score
        }]
      }
    })
  }

  const removeTask = (id: Task["id"]) => {
    setTasksConfig(state => {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== id)

      }
    })
  }

  const toggleTask = (id: Task["id"]) => {
    setTasksConfig(state => {
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === id ? { ...task, completed: !task.completed, endDate: !task.completed ? new Date().toISOString() : undefined } : task)
      }
    })
  }

  const setTaskEndDate = (id: Task["id"], endDate: Task["endDate"]) => {
    setTasksConfig(state => {
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === id ? { ...task, endDate, completed: true } : task)
      }
    })
  }

  const setStartDate = (startDate: string) => {
    localStorage.setItem("startDate", startDate)
    setTasksConfig(state => {
      return {
        ...state,
        startDate
      }
    })
  }

  const setEndDate = (endDate: string) => {
    localStorage.setItem("endDate", endDate)
    setTasksConfig(state => {
      return {
        ...state,
        endDate
      }
    })
  }

  useEffect(() => {
    if (!tasksConfig.tasks.length) {
      setTasksConfig({
        startDate: localStorage.getItem("startDate") || new Date().toISOString(),
        endDate: localStorage.getItem("endDate") || new Date().toISOString(),
        tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tasksConfig.tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasksConfig.tasks))
    }
  }, [tasksConfig])

  console.log(tasksConfig)

  return (
    <TasksContext.Provider value={{
      tasksConfig: tasksConfig,
      addTask,
      removeTask,
      toggleTask,
      setTaskEndDate,
      setStartDate,
      setEndDate
    }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => {
  return useContext(TasksContext)
}