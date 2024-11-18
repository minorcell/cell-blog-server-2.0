import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    @Get()
    async GetDashboard() {
        return await this.dashboardService.GetDashboard();
    }
}
