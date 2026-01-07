
export const maintenanceService = {
    async getMaintenanceSettings() {
        return {
            enabled: false,
            mode: 'none',
            allowedIps: [],
            message: '',
            estimatedEndTime: null
        };
    },
    async updateMaintenanceSettings(settings: any) {
        return settings;
    }
};
