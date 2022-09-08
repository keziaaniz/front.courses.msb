import React, { PropsWithChildren } from 'react';
import { Offcanvas } from 'reactstrap';

interface ConfirmProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const OffCanva: React.FC<PropsWithChildren<ConfirmProps>> = ({ open, setOpen, children }) => (

  <Offcanvas
    scrollable
    isOpen={open}
    className="offcanvas offcanvas-start"
    tabindex="-1"
  >
    {children}
  </Offcanvas>

);

export default OffCanva;
