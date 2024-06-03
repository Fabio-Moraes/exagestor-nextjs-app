'use client';

import React from 'react';

import moment, { Moment } from 'moment';

import * as S from './styles';
import 'moment/locale/pt-br';

interface PropsTypes {
  value: string | moment.Moment;
  onChange: (value: Moment | string) => void;
  initialDaysSubtract?: number;
  range?: { max: Date | string | Moment; min: Date | string | Moment };
  active?: boolean;
}

export function SelectedDataCalendar(props: PropsTypes) {
  const { onChange, range, active, value /* initialDaysSubtract = 0 */ } = props;

  const isValidDate = (current: Date | string | Moment) => {
    if (range) {
      return (
        moment(current).startOf('day').isSameOrAfter(range.min, 'day') &&
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
        value={value}
        onChange={onChange}
        locale="pt"
        dateFormat="DD/MM/YYYY"
        timeFormat={false}
        isValidDate={isValidDate}
        inputProps={calendarInputProps}
      />
    </div>
  );
}
