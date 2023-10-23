import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrganisationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(firebaseId: string): Promise<{
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        email: string;
        address: string;
        imgUrl: string;
        handle: string;
    }[]>;
    findDropdown(): Promise<{
        name: string;
        handle: string;
    }[]>;
    findOne(handle: string): Promise<{
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        email: string;
        address: string;
        imgUrl: string;
        ipPolicy: string;
        handle: string;
    }>;
    findUsers(handle: string): Promise<{
        email: string;
        imgUrl: string;
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
            imgUrl: string;
            handle: string;
        }[];
    }[]>;
    update(firebaseId: string, updateOrganisationDto: UpdateOrganisationDto): Promise<{
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        email: string;
        address: string;
        imgUrl: string;
        ipPolicy: string;
        handle: string;
    }>;
}
