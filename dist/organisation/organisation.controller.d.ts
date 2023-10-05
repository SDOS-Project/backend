import { OrganisationService } from './organisation.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
export declare class OrganisationController {
    private readonly organisationService;
    constructor(organisationService: OrganisationService);
    findAll(firebaseId: string): Promise<{
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        email: string;
        address: string;
        logoUrl: string;
        handle: string;
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
    update(id: string, updateOrganisationDto: UpdateOrganisationDto): string;
    remove(id: string): string;
}
