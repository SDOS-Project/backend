import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrganisationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(firebaseId: string): Promise<{
        name: string;
        email: string;
        handle: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        logoUrl: string;
    }[]>;
    findDropdown(): Promise<{
        name: string;
        handle: string;
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
        firstName: string;
        lastName: string;
        email: string;
        handle: string;
    }[]>;
    findProjects(handle: string): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        organisations: {
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.OrganisationType;
            logoUrl: string;
        }[];
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
    }[]>;
    update(id: number, updateOrganisationDto: UpdateOrganisationDto): string;
    remove(id: number): string;
}
