import React, { useState, PropsWithChildren } from 'react';
import Modal from 'react-modal';

const Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    height: 'auto',
    marginRight: '-50%',
    background: 'rgb(255,250,250)',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
  },
};

interface ConfirmProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalReact: React.FC<PropsWithChildren<ConfirmProps>> = ({ open, setOpen, children }) => (
  <Modal
    isOpen={open}
    style={Styles}
  >
    {children}
  </Modal>
);

export default ModalReact;
