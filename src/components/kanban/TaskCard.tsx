import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical, MessageCircleMore } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ColumnId } from "./KanbanBoard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
  attachement?: string[];
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("py-0 gap-0", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-1 py-3 space-between flex flex-row items-center border-b-2 border-secondary relative">
        <Badge variant={"outline"} className="font-semibold">
          {task?.id == "task1" ? "Bug" : "Task"}
        </Badge>
        {task.id == "task1" && (
          <span className="h-3 w-3 bg-amber-400 rounded-full"></span>
        )}
        {task.id == "task2" && (
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
        )}
        {task.id == "task3" && (
          <span className="h-3 w-3 bg-green-400 rounded-full"></span>
        )}

        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="py-1 px-0 ml-auto text-secondary-foreground/50 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
      </CardHeader>
      <CardContent
        onClick={() => alert(task.content)}
        className="px-2 pt-2 pb-6 text-left whitespace-pre-wrap"
      >
        {task.id === "task1" && (
          <img
            height="120px"
            width="100%"
            className="rounded-md"
            src={
              "https://api-prod-minimal-v700.pages.dev/assets/images/cover/cover-5.webp"
            }
            alt="attachement"
          />
        )}

        <div className="mt-3 break-words text-md text-slate-800">
          {task.content}
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-1">
            <MessageCircleMore className="h-6 w-6" />
            <div className="text-sm text-slate-700">6</div>
          </div>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale-0">
            <Avatar className="w-5 h-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-5 h-5">
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar className="w-5 h-5">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
