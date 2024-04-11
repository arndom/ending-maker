import * as React from 'react';
import { Input, InputProps } from '@mui/base/Input';

type Props = Omit<InputProps, "slotProps">

export default function AppInput(props: Props) {

  return (
    // @ts-ignore
    <Input
      {...props}
      slotProps={{
        input: {
          className:
          "w-80 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0",
        },
      }}
    />
  );
}