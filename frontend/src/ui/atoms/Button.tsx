import styled from '@emotion/styled';
import { ReactNode } from 'react';
import theme, { device } from '../theme';
import { ButtonProps, ButtonVariant, ThemeFontSize } from '../../types/ui';
import {
  selectAccessibilityOption,
  selectFont,
} from '@/features/accessibility/accessibilitySlice';
import { useSelector } from 'react-redux';

const Button = styled.button(
  ({
    variant,
    width,
    color,
    size,
    fontSize,
    children,
    outline,
    hoverDisabled,
    ...rest
  }: ButtonProps) => {
    const { size: globalFontSize } = useSelector(selectFont);
    const { impreciseMovement } = useSelector(selectAccessibilityOption);

    return {
      width: width ?? 'fit-content',
      maxWidth: width ?? 'fit-content',
      minWidth: '39px',
      backgroundColor: color ?? theme.colors.primary.normal,
      borderRadius: borderRadius(variant),
      height: `${height(variant, width, size) + (impreciseMovement.isActivated ? 2 : 0)}px`,
      color: fontColor(color),
      fontWeight: fontWeight(size),
      border: outline
        ? `1px solid ${theme.colors.gray.main}`
        : '2px solid transparent',
      padding: padding(variant, impreciseMovement.isActivated),
      fontSize: fontSize
        ? `${theme.fonts.size[fontSize] + globalFontSize}px`
        : `${theme.fonts.size.sm + globalFontSize}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      ':disabled': {
        backgroundColor: theme.colors.white,
        color: theme.colors.gray.light,
        borderColor: theme.colors.gray.light,
        cursor: 'default',
      },
      ':hover:enabled': !hoverDisabled ? hover(size) : {},
      [device('mobile')]: {
        fontSize: theme.fonts.size.xs,
        padding: variant === 'round' ? '0px' : '0px 12px',
      },
      lineHeight: 1,
      ...rest,
    };
  },
);

const padding = (
  variant: ButtonVariant,
  isOptionActivated: boolean,
): string => {
  if (variant === 'round') {
    return `${0 + (isOptionActivated ? 2 : 0)}px ${0 + (isOptionActivated ? 8 : 0)}px`;
  }

  return `${0 + (isOptionActivated ? 2 : 0)}px ${20 + (isOptionActivated ? 8 : 0)}px`;
};

const borderRadius = (variant: ButtonVariant) => {
  switch (variant) {
    case 'default':
      return '100px';
    case 'round':
      return '100%';
    case 'square':
      return '10px';
  }
};

const height = (variant: ButtonVariant, width?: string, size?: string) => {
  if (size === 'small') {
    return 39;
  }
  if (size === 'big') {
    return 70;
  }
  switch (variant) {
    case 'default':
      return 50;
    case 'square':
      return 50;
    case 'round':
      return parseInt(width!);
    default:
      return 39;
  }
};

const fontWeight = (size?: string) => {
  if (size === 'small') return theme.fonts.weight.regular;
  return theme.fonts.weight.extraBold;
};

const hover = (size?: string) => {
  if (size === 'small')
    return {
      border: `2px solid ${theme.colors.primary.normal}`,
      fontWeight: theme.fonts.weight.bold,
      backgroundColor: theme.colors.white,
      color: theme.colors.primary.normal,
    };
  return {
    border: `2px solid ${theme.colors.primary.normal}`,
    fontWeight: theme.fonts.weight.regular,
    backgroundColor: theme.colors.white,
    color: theme.colors.primary.normal,
  };
};

const fontColor = (color?: string) => {
  switch (color) {
    case theme.colors.white:
      return theme.colors.gray.dark;
    case theme.colors.secondary.normal:
      return theme.colors.white;
    case theme.colors.background:
      return theme.colors.primary.normal;
    case theme.colors.assist.normal:
      return theme.colors.text.strong;
    default:
      return theme.colors.white;
  }
};

export default Button;
