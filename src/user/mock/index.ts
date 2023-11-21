import { Discipline } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

export const mockUpdateUserDto: UpdateUserDto = {
  firstName: 'John',
  lastName: 'Doe',
  discipline: Discipline.AerospaceEngineering,
  areasOfInterest: ['Area 1', 'Area 2'],
};
