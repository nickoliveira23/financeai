import {
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/app/_components/ui/alert-dialog";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteTransactionAction } from "../_actions/delete-transaction";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransactionAction({ transactionId });
      toast.success("Transação deletada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar transação");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja realmente deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionButton;
