import { BurndownChart } from "@/components/burndown-charts";
import TodoList from "@/components/todo-list";
import { TaskProvider } from "@/hooks/useTasks";

export default function Home() {
  return (
    <TaskProvider>
      <main className="grid grid-cols-1 md:grid-cols-[1fr_2fr] h-screen p-20 gap-8">
        <TodoList 
          title="Sprint de tarefas"
          className="w-full"
        />
        <BurndownChart className="w-full" />
      </main>
    </TaskProvider>
  );
}
