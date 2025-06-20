import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { type Task, TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ellipsis, GripVertical } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    padding: '20px 16px 16px 16px'
  };

  const variants = cva(
    "h-full min-w-[336px] max-w-[336px] bg-primary-foreground flex flex-col flex-shrink-0 gap-0",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-0 mb-3 font-semibold  text-left flex flex-row justify-between items-center">
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          {tasks?.length}
        </Badge>
        <div className="flex-grow text-[14px]"> {column.title}</div>
        <BoardColumnMenu />
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="-ml-2 p-1 text-primary/50 h-auto cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripVertical />
        </Button>
      </CardHeader>
      <ScrollArea
        className="h-[72vh]"
        scrollBarClassName="h-0 w-0"
      >
        <CardContent className="flex flex-grow flex-col gap-4 p-0">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

function BoardColumnMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-ml-2 p-1 text-primary/50 h-auto relative">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Rename</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Clear</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex flex-grow-1 flex-shrink-1 flex-basis-auto lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-center flex-row snap-x snap-mandatory">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
