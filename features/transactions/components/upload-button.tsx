import { useCSVReader } from 'react-papaparse';
import { CiImport } from 'react-icons/ci';

import { Button } from '@/components/ui/button';

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <CiImport className="size-4 mr-1" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
