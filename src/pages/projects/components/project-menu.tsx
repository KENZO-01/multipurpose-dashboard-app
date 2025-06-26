import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cog, Ellipsis, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

const Projectmenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuItem className="text-blue-700 dark:text-blue-300">
            {/* <Settings className="text-blue-700 dark:text-blue-300" /> */}
            <Cog className="text-blue-700 dark:text-blue-300"  />
            Project Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-700 dark:text-red-400"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="text-red-700 dark:text-red-400" />
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDeleteProjectDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Projectmenu;

const ConfirmDeleteProjectDialog = ({ open, setOpen }: any) => {
  const [confirmText, setConfirText] = useState("");

  const handleClose = () => {
    setConfirText("");
    setOpen(false);
  };

  const handleConfirmDeletion = () => {
    setConfirText("")
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div>
              Please be advised that proceeding with this action will result in
              the permanent deletion of your project and all associated data
              from our servers. This includes the removal of any related issues
              and metadata.
            </div>
            <div>
              To confirm that you understand and wish to proceed with the
              deletion, please enter{" "}
              <span className="font-semibold">"Confirm"</span> in the input
              field below.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirText(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDeletion}
            disabled={confirmText !== "Confirm"}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
