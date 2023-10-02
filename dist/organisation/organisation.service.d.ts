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
    findUsers(handle: string): <T extends import(".prisma/client").Prisma.Organisation$usersArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.Organisation$usersArgs<import("@prisma/client/runtime/library").DefaultArgs>>) => import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$UserPayload<import("@prisma/client/runtime/library").DefaultArgs>, T>[]>;
    findProjects(handle: string): <T extends import(".prisma/client").Prisma.Organisation$projectsArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.Organisation$projectsArgs<import("@prisma/client/runtime/library").DefaultArgs>>) => import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$ProjectPayload<import("@prisma/client/runtime/library").DefaultArgs>, T>[]>;
    update(id: number, updateOrganisationDto: UpdateOrganisationDto): string;
    remove(id: number): string;
}
