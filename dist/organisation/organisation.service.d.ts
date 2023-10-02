import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrganisationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        email: string;
        password: string;
        address: string;
        logoUrl: string;
        ipPolicy: string;
        handle: string;
        firebaseId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(handle: string): import(".prisma/client").Prisma.Prisma__OrganisationClient<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        email: string;
        password: string;
        address: string;
        logoUrl: string;
        ipPolicy: string;
        handle: string;
        firebaseId: string;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findUsers(handle: string): Promise<{
        email: string;
        handle: string;
        firstName: string;
        lastName: string;
    }[]>;
    findProjects(handle: string): Promise<{
        name: string;
        handle: string;
        users: {
            email: string;
            handle: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        }[];
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        organisations: {
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
            logoUrl: string;
            handle: string;
        }[];
    }[]>;
    update(id: number, updateOrganisationDto: UpdateOrganisationDto): string;
    remove(id: number): string;
}
