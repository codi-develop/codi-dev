import { ReactNode, RefObject, forwardRef } from 'react';
import styled from '@emotion/styled';
import OpenDropdown from '@icons/common/expand-open.svg';
import theme, { device } from '@/ui/theme';
import { DropdownProps } from '@/types/ui';
import Button from './Button';
import { useDropdown } from '@/hooks/dropdown/useDropdown';
import useClickOutOfInput from '@/hooks/dropdown/useClickOutOfInput';
import useResetCategory from '@/hooks/dropdown/useResetCategory';

function Dropdown({
  id,
  width,
  title,
  type,
  categories,
  invalid,
  selectedCategory,
  children,
  setSelectedCategory,
  isReset,
  ...rest
}: DropdownProps) {
  const { open, setOpen, ref, setCategory, setDropdownContentPosition } =
    useDropdown(selectedCategory, setSelectedCategory, id);

  const { resetContainedCategories } = useResetCategory(
    categories,
    selectedCategory,
    setSelectedCategory,
    isReset,
  );

  useClickOutOfInput(id!, setOpen);

  return (
    <DropdownContainer width={width} {...rest}>
      {type === 'menu' ? (
        <div id={id} onClick={() => setOpen((prev) => !prev)}>
          {children}
        </div>
      ) : (
        <DropdownButton
          id={id}
          invalid={invalid}
          width="100%"
          color={theme.colors.white}
          onClick={setDropdownContentPosition}
          variant="square"
          type="button"
          hoverDisabled
        >
          <Truncate>{selectedCategory || title}</Truncate>

          <OpenDropdown />
        </DropdownButton>
      )}
      {open && (
        <DropdownContentContainer
          ref={ref! as RefObject<HTMLUListElement>}
          categories={isReset ? resetContainedCategories : categories}
          setCategory={setCategory}
        />
      )}
    </DropdownContainer>
  );
}

const Truncate = styled.div({
  width: '90%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});

interface DropdownContentProps {
  categories: string[] | number[];
  setCategory?: Function;
}

export const DropdownContentContainer = forwardRef<
  HTMLUListElement,
  DropdownContentProps
>(({ categories, setCategory }, ref) => {
  return (
    <DropdownContent ref={ref} width="100%">
      {categories.map((category, index) => (
        <div key={`${index}-${category}`}>
          <DropdownItem onClick={() => setCategory!(category)}>
            {category}
          </DropdownItem>
          {index < categories.length - 1 && <Divider />}
        </div>
      ))}
    </DropdownContent>
  );
});

export const DropdownContainer = styled.div(
  ({ width, children, ...rest }: { width?: string; children: ReactNode }) => {
    return {
      width,
      minWidth: 'fit-content',
      position: 'relative',
      ...rest,

      [device('tablet')]: {
        minWidth: 'auto',
      },
    };
  },
);

export const DropdownButton = styled(Button)(
  ({ invalid }: { invalid: boolean | undefined }) => ({
    justifyContent: 'space-between',
    border: '1px solid',
    borderColor:
      invalid === true && invalid !== undefined
        ? theme.colors.error
        : theme.colors.gray.main,
  }),
);

const DropdownContent = styled.ul(
  ({ width, left }: { width?: string; left?: boolean }) => ({
    width: width ?? '100%',
    minWidth: 'fit-content',
    maxHeight: '250px',
    // height: "250px",
    overflow: 'auto',
    position: 'absolute',
    zIndex: 1,
    top: '70px',

    right: left ? '0px' : '0px',

    marginBottom: '20px',
    backgroundColor: theme.colors.white,
    borderRadius: '10px',
    listStyle: 'none',
    border: `1px solid ${theme.colors.gray.main}`,
    overscrollBehavior: 'none',
  }),
);

const DropdownItem = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  width: 100%;
  min-width: 130px;
  color: ${theme.colors.text.strong};
  font-size: ${theme.fonts.size.sm}px;
  font-weight: ${theme.fonts.weight.regular};
  background-color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  :hover {
    background-color: ${theme.colors.background};
  }
  :focus {
    background-color: ${theme.colors.primary.normal};
    color: ${theme.colors.white};
  }
`;

export const Divider = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background-color: ${theme.colors.background};
`;
export default Dropdown;
