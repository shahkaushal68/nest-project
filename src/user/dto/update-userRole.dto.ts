import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";

export class UpdateUserRoleDto {
   @IsArray()
   @ArrayNotEmpty({ message: 'Role IDs should not be empty' })
   @IsInt({ each: true, message: 'Role IDs should be integers' })
    roleIds: number[];
    // Add any other properties you want to update in the user entity
}
