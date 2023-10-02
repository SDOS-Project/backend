import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): string;
    findOne(handle: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        organisationId: string;
        createdAt: Date;
        updatedAt: Date;
        handle: string;
        firebaseId: string;
    }>;
    getConfig(firebaseId: string): Promise<string>;
    findFaculty(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        organisationId: string;
        createdAt: Date;
        updatedAt: Date;
        handle: string;
        firebaseId: string;
    }[]>;
    findEmployees(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        organisationId: string;
        createdAt: Date;
        updatedAt: Date;
        handle: string;
        firebaseId: string;
    }[]>;
    findProjects(handle: string): <T extends import(".prisma/client").Prisma.User$projectsArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.User$projectsArgs<import("@prisma/client/runtime/library").DefaultArgs>>) => import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$ProjectPayload<import("@prisma/client/runtime/library").DefaultArgs>, T>[]>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
