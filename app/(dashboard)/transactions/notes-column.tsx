import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

type Props = {
  notes?: string;
};
export const NotesColumn = ({ notes }: Props) => {
  return (
    <>
      {notes ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">Note..</Button>
          </HoverCardTrigger>
          <HoverCardContent className=" w-80 max-w-xs p-4 flex items-center justify-center ">
            <div className="whitespace-normal break-words">
              {' '}
              <p>
                <span className="font-semibold text-md"> Note: </span>
                {notes}
              </p>{' '}
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : null}
    </>
  );
};
