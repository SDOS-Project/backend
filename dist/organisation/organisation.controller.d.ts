import { OrganisationService } from './organisation.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
export declare class OrganisationController {
    private readonly organisationService;
    constructor(organisationService: OrganisationService);
    findAll(firebaseId: string): Promise<{
        email: string;
        handle: string;
        imgUrl: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
    }[]>;
    findDropdown(): Promise<{
        handle: string;
        name: string;
    }[]>;
    findOne(handle: string): Promise<{
        email: string;
        handle: string;
        imgUrl: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
    findUsers(handle: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        handle: string;
    }[]>;
    findProjects(handle: string): Promise<{
        handle: string;
        name: string;
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        organisations: {
            handle: string;
            imgUrl: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        }[];
    }[]>;
    update(firebaseId: string, updateOrganisationDto: UpdateOrganisationDto): Promise<{
        email: string;
        handle: string;
        imgUrl: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
    remove(id: string): string;
}
