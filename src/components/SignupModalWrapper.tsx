
import React from "react";
import SignupModal from "./SignupModal";

interface SignupModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SignupModalWrapper: React.FC<SignupModalWrapperProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => (
  <SignupModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
);

export default SignupModalWrapper;
