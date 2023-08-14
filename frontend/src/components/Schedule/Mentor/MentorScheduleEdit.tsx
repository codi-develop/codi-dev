import { SCHEDULE_TIME_TABLE } from "@/constants";
import { selectUser } from "@/features/user/userSlice";
import useDailySchedulesQuery, {
  useMonthlySchedulesQuery,
  useScheduleMutation,
} from "@/queries/scheduleQuery";
import { Schedule, ScheduleTime } from "@/types/schedule";

import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import formattedDate, { formattedMonth } from "@/utils/dateFormat";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MentorScheduleEdit = ({
  date,
  schedules,
  toggleEditState,
  refetchMonthlySchedule,
}: {
  date?: string;
  schedules?: Schedule;
  toggleEditState: () => void;
  refetchMonthlySchedule: () => void;
}) => {
  const [selecteds, setSelecteds] = useState<ScheduleTime[]>([]);
  const { mentorId } = useSelector(selectUser);

  useEffect(() => {
    setSelecteds(schedules?.times!);
  }, [date, schedules?.times]);
  const addSchedule = useScheduleMutation(mentorId!);
  const selected = (time: string) => {
    return selecteds?.find(({ time: selectedTime }) => selectedTime === time);
  };

  const handleClickTime = (time: string) => {
    console.log(
      selecteds?.find(({ time: selectedTime }) => selectedTime === time)
    );
    if (selecteds?.find(({ time: selectedTime }) => selectedTime === time)) {
      setSelecteds((prev) => prev.filter((prevTime) => prevTime.time !== time));
      return;
    }
    setSelecteds([...selecteds, { time: time, enabled: true }]);
  };

  const patchMentorSchedule = () => {
    toggleEditState();
    const times: ScheduleTime[] = selecteds.map(({ time }) => {
      return { time };
    });
    addSchedule.mutate({ date: date!, times: times! });
    if (!addSchedule.isError) {
      setTimeout(() => {
        refetchMonthlySchedule();
      }, 2000);
    }
  };

  return (
    <Card padding="45px">
      <FlexBox direction="column" rowGap="23px">
        <FlexBox justifyContent="flex-start" columnGap="20px">
          <Typography variant="div">시간 선택</Typography>
          <Button
            onClick={() => setSelecteds([])}
            variant="default"
            outline
            size="small"
            color={theme.colors.white}
          >
            전체 삭제
          </Button>
        </FlexBox>

        <FlexBox
          isWrap
          rowGap="15px"
          columnGap="15px"
          justifyContent="flex-start"
        >
          {SCHEDULE_TIME_TABLE.map((time, index) => (
            <Button
              onClick={() => handleClickTime(time)}
              color={selected(time) ? theme.colors.primary : theme.colors.white}
              variant="default"
              size="small"
              outline
              key={index}
              disabled={
                selected(time)?.time === time && !selected(time)?.enabled
              }
            >
              {time}
            </Button>
          ))}
        </FlexBox>
        <Button
          disabled={selecteds?.length === 0}
          onClick={patchMentorSchedule}
          size="small"
          variant="default"
        >
          변경내용저장
        </Button>
      </FlexBox>
    </Card>
  );
};

export default MentorScheduleEdit;
