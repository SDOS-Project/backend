import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): string;
    findRecommendations(firebaseId: string): Promise<any>;
    findFaculty(): Promise<any>;
    findEmployees(): Promise<any>;
    findOne(handle: string): Promise<any>;
    findProjects(handle: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
