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
    remove(id: string): string;
}
