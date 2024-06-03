'use client';

import React, { useState } from 'react';

import moment, { Moment } from 'moment';

import * as S from './styles';
import 'moment/locale/pt-br';

interface PropsTypes {
  value?: (date: Date) => void;
  defaultData?: Date | string | Moment;
  range?: { max: Date | string | Moment; min: Date | string | Moment };
  active?: boolean;
}

export function SelectedDataCalendar(props: PropsTypes) {
  const { value, range, active, defaultData } = props;

  const [selectedDate, setSelectedDate] = useState<Date | string | Moment>(
    defaultData ?? moment()
  );

  const handleDateChange = (date: string | Moment) => {
    const dateMoment = moment(date);
    value && value(new Date(dateMoment.startOf('day').format('YYYY-MM-DD')));
    setSelectedDate(date);
  };

  const isValidDate = (current: Date | string | Moment) => {
    if (range) {
      return (
        moment(current).startOf('day').isAfter(range.min, 'day') &&
        moment(current).startOf('day').isBefore(range.max, 'day')
      );
    }

    return moment(current).isSameOrAfter(moment().startOf('day'), 'day');
  };

  const calendarInputProps = {
    readOnly: true,
    style: { cursor: 'default' },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => e.target.blur()
  };

  return (
    <div>
      <S.StyledDateTime
        $active={active}
        value={selectedDate}
        onChange={handleDateChange}
        locale="pt"
        dateFormat="DD/MM/YYYY"
        timeFormat={false}
        isValidDate={isValidDate}
        inputProps={calendarInputProps}
      />
    </div>
  );
}
