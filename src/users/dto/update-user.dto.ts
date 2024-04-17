import { PartialType } from '@nestjs/swagger';
import { CreateUserDtoType } from './create-user.dto';
export class UpdateUserDtoType extends PartialType(CreateUserDtoType) {}
