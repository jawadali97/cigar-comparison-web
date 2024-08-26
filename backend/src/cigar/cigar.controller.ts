import { Controller, Get, Query } from '@nestjs/common';
import { CigarsService } from './cigar.service';
import { Cigar } from './cigar.schema';

@Controller('cigar')
export class CigarController {

    constructor(private readonly cigarsService: CigarsService) { }

    @Get('search')
    async searchCigars(
        @Query('query') query: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20
    ): Promise<{ cigars: Cigar[], totalPages: number }> {
        return this.cigarsService.searchCigars(query, page, limit);
    }

    @Get('filters')
    async getFilters() {
        return this.cigarsService.getFilters();
    }

    @Get('suggestions')
    getSuggestions(@Query('query') query: string) {
        return this.cigarsService.getSuggestions(query);
    }
}
