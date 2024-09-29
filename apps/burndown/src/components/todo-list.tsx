"use client"

import { ComponentProps, useState } from "react"
import { Input } from "@tasks-center/ui/components/ui/input"
import { Button } from "@tasks-center/ui/components/ui/button"
import { Checkbox } from "@tasks-center/ui/components/ui/checkbox"
import { FilePlus2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@tasks-center/ui/components/ui/card"
import { Task, useTasks } from "@/hooks/useTasks"
import { DatePicker } from "./date-picker"

interface TodoListProps extends ComponentProps<typeof Card> {
  title: string
}
export default function TodoList({title, ...props}: TodoListProps) {
  const { addTask, removeTask, toggleTask, tasksConfig: { tasks }, setTaskEndDate } = useTasks()

  const [newTodo, setNewTodo] = useState<Omit<Task, "id" | "completed">>({
    score: 1,
    text: "",
  })
  const addTodo = () => {
    const { text, score } = newTodo
    if (text.trim() !== "") {
      addTask({ text, score })
      setNewTodo({ score: 1, text: "" })
    }
  }

  return (
    <Card {...props}>
      <CardHeader className="text-2xl font-bold mb-4">
        <h1 className="mb-4">{title}</h1>
        <div className="flex mb-4 gap-2">
          <Input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            placeholder="Nova tarefa"
          />
          <Input
            type="number"
            value={newTodo.score}
            onChange={(e) => setNewTodo({ ...newTodo, score: Number(e.target.value) })}
            placeholder="Pontos da tarefa"
            className="w-20"
          />
          <Button onClick={addTodo} className="gap-2">
            <FilePlus2 size={16} />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map(task => (
            <Card key={task.id} className="flex items-center justify-between p-2 ">
              <div className="flex items-center">
                <Checkbox
                  id={`todo-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`todo-${task.id}`}
                  className={`${task.completed ? 'line-through text-gray-500' : ''}`}
                >
                  <span>{task.text}</span>
                  <span className="text-gray-500"> ({task.score})</span>
                </label>
              </div>
              <DatePicker 
                className="ml-auto"
                placeholder="Data de término"
                onSelectDate={date => setTaskEndDate(task.id, date.toISOString())}
                defaultDate={task.endDate ? new Date(task.endDate) : undefined}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTask(task.id)}
                aria-label="Remove todo"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}