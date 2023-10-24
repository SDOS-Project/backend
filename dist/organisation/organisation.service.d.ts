import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrganisationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(firebaseId: string): Promise<{
        name: string;
        email: string;
        handle: string;
        imgUrl: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
    }[]>;
    findDropdown(): Promise<{
        name: string;
        handle: string;
    }[]>;
    findOne(handle: string): Promise<{
        name: string;
        email: string;
        handle: string;
        imgUrl: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
    findUsers(handle: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        handle: string;
        imgUrl: string;
    }[]>;
    findProjects(handle: string): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        organisations: {
            name: string;
            handle: string;
            imgUrl: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        }[];
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
    }[]>;
    update(firebaseId: string, updateOrganisationDto: UpdateOrganisationDto): Promise<{
        name: string;
        email: string;
        handle: string;
        imgUrl: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
}
