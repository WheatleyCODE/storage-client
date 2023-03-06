import { MdRepeat, MdRepeatOne } from 'react-icons/md';
import { RepeatType } from 'types';

export const RepeatIcons = {
  [RepeatType.NONE]: {
    Icon: MdRepeat,
    color: 'default',
  },
  [RepeatType.ALBUM]: {
    Icon: MdRepeat,
    color: 'yellow',
  },
  [RepeatType.TRACK]: {
    Icon: MdRepeatOne,
    color: 'yellow',
  },
};

export const repeatSteps = [RepeatType.NONE, RepeatType.ALBUM, RepeatType.TRACK];
