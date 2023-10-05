import { OrganisationService } from './organisation.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
export declare class OrganisationController {
    private readonly organisationService;
    constructor(organisationService: OrganisationService);
    findAll(): Promise<any>;
    findOne(handle: string): any;
    findUsers(handle: string): Promise<any>;
    findProjects(handle: string): Promise<any>;
    update(id: string, updateOrganisationDto: UpdateOrganisationDto): string;
    remove(id: string): string;
}
