import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type ConfirmPromise = {
  resolve: (value: boolean) => void;
};

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<ConfirmPromise | null>(null);
  const confirm = (): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
};
