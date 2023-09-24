import Image from 'next/image';
import { FC, MouseEventHandler } from 'react';

interface ButtonProps {
  title: string;
  type: 'button' | 'submit';
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  type,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  bgColor,
  textColor,
}) => {
  return (
    <button
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full ${
        textColor || 'text-white'
      } ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'} `}
      type={type}
      disabled={isSubmitting}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
