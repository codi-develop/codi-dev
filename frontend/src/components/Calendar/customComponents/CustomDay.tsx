import { useRef } from 'react';
import { Button, DayProps, useDayRender } from 'react-day-picker';
import InvisibleLabel from '@/ui/atoms/InvisibleLabel';
import { accessibleFormattedDate, formattedDate } from '@/utils/dateFormat';

export function CustomDay(props: DayProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, ref);
  const id = props.date.toUTCString();

  dayRender.buttonProps.style = {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  };
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dayRender.buttonProps?.onClick?.(e);
  };
  if (dayRender.isHidden) {
    return <></>;
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }

  return (
    <>
      <InvisibleLabel htmlFor={id} text={accessibleFormattedDate(props.date)} />
      <Button
        id={id}
        {...dayRender.buttonProps}
        ref={ref}
        onClick={handleClick}
      />
    </>
  );
}
