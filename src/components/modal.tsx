import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Modal as BaseModal } from '@mui/base/Modal';

type Props = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode
}

export default function Modal(props: Props) {
  const { open, handleClose, children } = props;

  return (
    <div>
      <BaseModal
        open={open}
        onClose={handleClose}
        className="fixed inset-0 z-1300 flex items-center justify-center"
        slots={{
          backdrop: (props) => (
            <div
              {...props}
              className={clsx(
                { "base-Backdrop-open": open },
                "backdrop fixed inset-0 bg-black bg-opacity-50 z-[-1]"
              )}
            />
          ),
        }}
      >
        <div className="min-w-[400px] flex flex-col gap-8 overflow-hidden bg-white rounded-lg p-24 shadow-xl focus-visible:outline-none">
          {children}
        </div>
      </BaseModal>
    </div>
  );
}