// Environment configuration for production
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
        'https://your-domain.onrender.com',
        'https://railoptima-platform.onrender.com'
      ]
    : true,
  credentials: true,
  optionsSuccessStatus: 200
};

// Production-specific middleware
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('.'));

// Serve main HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/simulation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'simulation.html'));
});

app.get('/mileage-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'mileage-dashboard.html'));
});

// ===========================================
// FITNESS CERTIFICATES API ENDPOINTS
// ===========================================

app.get('/api/fitness-certificates', (req, res) => {
    const certificates = generateFitnessCertificates();
    res.json(certificates);
});

// ===========================================
// JOB CARD STATUS API ENDPOINTS
// ===========================================

app.get('/api/job-cards', (req, res) => {
    const jobCards = generateJobCards();
    res.json(jobCards);
});

// ===========================================
// BRANDING EXPOSURE API ENDPOINTS
// ===========================================

app.get('/api/branding-exposure', (req, res) => {
    const brandingData = generateBrandingExposure();
    res.json(brandingData);
});

// ===========================================
// STABLING GEOMETRY API ENDPOINTS
// ===========================================

app.get('/api/stabling-geometry', (req, res) => {
    const stablingData = generateStablingData();
    res.json(stablingData);
});

// ===========================================
// MILEAGE DASHBOARD API ENDPOINTS
// ===========================================

app.get('/api/dashboard-data', (req, res) => {
    const dashboardData = generateDashboardData();
    res.json(dashboardData);
});

app.get('/api/trainsets', (req, res) => {
    const trainsets = [
        { id: 'T001', name: 'Trainset T001', total_mileage: 456789 },
        { id: 'T002', name: 'Trainset T002', total_mileage: 398234 },
        { id: 'T003', name: 'Trainset T003', total_mileage: 512456 },
        { id: 'T004', name: 'Trainset T004', total_mileage: 334567 },
        { id: 'T005', name: 'Trainset T005', total_mileage: 445678 }
    ];
    res.json(trainsets);
});

app.get('/api/components/:trainsetId', (req, res) => {
    const { trainsetId } = req.params;
    const components = generateComponentsForTrainset(trainsetId);
    res.json(components);
});

app.get('/api/historical-data', (req, res) => {
    const { trainset, component, period } = req.query;
    const historicalData = generateHistoricalData(trainset, component, period);
    res.json(historicalData);
});

app.post('/api/maintenance/schedule', (req, res) => {
    const { trainsetId, componentName, scheduledDate } = req.body;
    
    const result = {
        id: `maint_${Date.now()}`,
        trainset: trainsetId,
        component: componentName,
        scheduled_date: scheduledDate,
        status: 'scheduled',
        estimated_duration: Math.floor(Math.random() * 8 + 4) + ' hours',
        priority: Math.random() < 0.3 ? 'high' : 'normal'
    };
    
    res.json({ success: true, result });
});

// ===========================================
// CLEANING & DETAILING SLOTS API ENDPOINTS
// ===========================================

app.get('/api/cleaning-slots', (req, res) => {
    const data = {
        kpi: {
            baysOccupied: Math.floor(Math.random() * 8) + 3,
            staffOnDuty: Math.floor(Math.random() * 15) + 8,
            scheduledToday: Math.floor(Math.random() * 12) + 6
        },
        slots: [
            { time: '06:00', trainId: 'T001', staff: 'Alice Kumar', type: 'Deep Clean', bay: 'Bay 1', duration: '3 hours', progress: 100 },
            { time: '07:30', trainId: 'T002', staff: 'Bob Singh', type: 'Basic Clean', bay: 'Bay 2', duration: '1.5 hours', progress: 75 },
            { time: '09:00', trainId: 'T003', staff: 'Carol Nair', type: 'Interior Detail', bay: 'Bay 3', duration: '2 hours', progress: 45 },
            { time: '10:30', trainId: 'T004', staff: 'David Raj', type: 'Exterior Wash', bay: 'Bay 4', duration: '1 hour', progress: 20 },
            { time: '12:00', trainId: 'T005', staff: 'Eva Menon', type: 'Deep Clean', bay: 'Bay 5', duration: '3 hours', progress: 0 },
            { time: '14:00', trainId: 'T001', staff: 'Frank Peter', type: 'Basic Clean', bay: 'Bay 1', duration: '1.5 hours', progress: 0 },
            { time: '15:30', trainId: 'T002', staff: 'Grace Jose', type: 'Interior Detail', bay: 'Bay 2', duration: '2 hours', progress: 0 },
            { time: '17:00', trainId: 'T003', staff: 'Henry Thomas', type: 'Exterior Wash', bay: 'Bay 3', duration: '1 hour', progress: 0 }
        ],
        bays: [
            { id: 1, status: 'occupied', trainId: 'T001', staff: 'Alice Kumar', cleaningType: 'Deep Clean', progress: 100, timeRemaining: '0 min' },
            { id: 2, status: 'occupied', trainId: 'T002', staff: 'Bob Singh', cleaningType: 'Basic Clean', progress: 75, timeRemaining: '20 min' },
            { id: 3, status: 'occupied', trainId: 'T003', staff: 'Carol Nair', cleaningType: 'Interior Detail', progress: 45, timeRemaining: '65 min' },
            { id: 4, status: 'overdue', trainId: 'T004', staff: 'David Raj', cleaningType: 'Exterior Wash', progress: 85, timeRemaining: 'OVERDUE' },
            { id: 5, status: 'available', trainId: null, staff: null, cleaningType: null, progress: 0, timeRemaining: null },
            { id: 6, status: 'available', trainId: null, staff: null, cleaningType: null, progress: 0, timeRemaining: null },
            { id: 7, status: 'maintenance', trainId: null, staff: 'Maintenance Team', cleaningType: 'Bay Maintenance', progress: 60, timeRemaining: '30 min' },
            { id: 8, status: 'available', trainId: null, staff: null, cleaningType: null, progress: 0, timeRemaining: null }
        ],
        staff: [
            { id: 1, name: 'Alice Kumar', shift: '06:00-14:00', contact: '+91-9876543210', currentBay: 1, expertise: 'Deep Cleaning' },
            { id: 2, name: 'Bob Singh', shift: '07:00-15:00', contact: '+91-9876543211', currentBay: 2, expertise: 'Basic Cleaning' },
            { id: 3, name: 'Carol Nair', shift: '08:00-16:00', contact: '+91-9876543212', currentBay: 3, expertise: 'Interior Detailing' },
            { id: 4, name: 'David Raj', shift: '09:00-17:00', contact: '+91-9876543213', currentBay: 4, expertise: 'Exterior Washing' },
            { id: 5, name: 'Eva Menon', shift: '10:00-18:00', contact: '+91-9876543214', currentBay: null, expertise: 'Deep Cleaning' },
            { id: 6, name: 'Frank Peter', shift: '11:00-19:00', contact: '+91-9876543215', currentBay: null, expertise: 'Basic Cleaning' },
            { id: 7, name: 'Grace Jose', shift: '12:00-20:00', contact: '+91-9876543216', currentBay: null, expertise: 'Interior Detailing' },
            { id: 8, name: 'Henry Thomas', shift: '13:00-21:00', contact: '+91-9876543217', currentBay: null, expertise: 'Exterior Washing' }
        ],
        cleaningTypes: [
            { name: 'Basic Clean', duration: '1.5 hours', description: 'Standard cleaning and sanitization' },
            { name: 'Deep Clean', duration: '3 hours', description: 'Thorough cleaning including seats, floors, and air vents' },
            { name: 'Interior Detail', duration: '2 hours', description: 'Detailed interior cleaning and maintenance' },
            { name: 'Exterior Wash', duration: '1 hour', description: 'External cleaning and polishing' }
        ]
    };
    res.json(data);
});

app.get('/api/cleaning-staff', (req, res) => {
    const staff = [
        { id: 1, name: 'Alice Kumar', shift: '06:00-14:00', currentBay: 1, status: 'active' },
        { id: 2, name: 'Bob Singh', shift: '07:00-15:00', currentBay: 2, status: 'active' },
        { id: 3, name: 'Carol Nair', shift: '08:00-16:00', currentBay: 3, status: 'active' },
        { id: 4, name: 'David Raj', shift: '09:00-17:00', currentBay: null, status: 'break' },
        { id: 5, name: 'Eva Menon', shift: '10:00-18:00', currentBay: null, status: 'available' }
    ];
    res.json(staff);
});

app.post('/api/cleaning/update-progress', (req, res) => {
    const { bayId, progress, trainId } = req.body;
    
    const result = {
        bayId,
        progress,
        trainId,
        updated: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + (100 - progress) * 60000).toISOString()
    };
    
    res.json({ success: true, result });
});

// ===========================================
// HELPER FUNCTIONS FOR DATA GENERATION
// ===========================================

function generateFitnessCertificates() {
    const trainsets = ['T001', 'T002', 'T003', 'T004', 'T005'];
    const certificateTypes = ['Safety Certificate', 'Brake Test', 'Power System', 'Door System', 'HVAC Certification'];
    
    const certificates = [];
    
    trainsets.forEach(trainset => {
        certificateTypes.forEach(certType => {
            const issueDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
            const expiryDate = new Date(issueDate.getTime() + (365 * 24 * 60 * 60 * 1000));
            const daysToExpiry = Math.floor((expiryDate - new Date()) / (24 * 60 * 60 * 1000));
            
            let status = 'valid';
            if (daysToExpiry <= 30) status = 'warning';
            if (daysToExpiry <= 7) status = 'critical';
            if (daysToExpiry < 0) status = 'expired';
            
            certificates.push({
                id: `${trainset}-${certType.replace(/\s+/g, '-').toLowerCase()}`,
                trainset,
                type: certType,
                issueDate: issueDate.toISOString().split('T')[0],
                expiryDate: expiryDate.toISOString().split('T')[0],
                daysToExpiry,
                status,
                authority: 'KMRL Safety Department',
                certificateNumber: `KMRL-${trainset}-${Date.now().toString().slice(-6)}`
            });
        });
    });
    
    return {
        total: certificates.length,
        summary: {
            valid: certificates.filter(c => c.status === 'valid').length,
            warning: certificates.filter(c => c.status === 'warning').length,
            critical: certificates.filter(c => c.status === 'critical').length,
            expired: certificates.filter(c => c.status === 'expired').length
        },
        certificates
    };
}

function generateJobCards() {
    const departments = ['Mechanical', 'Electrical', 'Signaling', 'Civil', 'Rolling Stock'];
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    const statuses = ['Open', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];
    
    const jobCards = [];
    const totalCards = 45;
    
    for (let i = 1; i <= totalCards; i++) {
        const createdDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        const department = departments[Math.floor(Math.random() * departments.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        jobCards.push({
            id: `JC-${String(i).padStart(4, '0')}`,
            title: `${department} Maintenance Task ${i}`,
            department,
            priority,
            status,
            assignedTo: `Technician ${Math.floor(Math.random() * 20) + 1}`,
            trainset: `T00${(i % 5) + 1}`,
            createdDate: createdDate.toISOString().split('T')[0],
            dueDate: new Date(createdDate.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: `Routine ${department.toLowerCase()} maintenance and inspection task`,
            estimatedHours: Math.floor(Math.random() * 8) + 1
        });
    }
    
    return {
        total: jobCards.length,
        summary: {
            byStatus: statuses.reduce((acc, status) => {
                acc[status.toLowerCase().replace(' ', '_')] = jobCards.filter(jc => jc.status === status).length;
                return acc;
            }, {}),
            byDepartment: departments.reduce((acc, dept) => {
                acc[dept.toLowerCase()] = jobCards.filter(jc => jc.department === dept).length;
                return acc;
            }, {}),
            byPriority: priorities.reduce((acc, priority) => {
                acc[priority.toLowerCase()] = jobCards.filter(jc => jc.priority === priority).length;
                return acc;
            }, {})
        },
        jobCards
    };
}

function generateBrandingExposure() {
    const trainsets = ['T001', 'T002', 'T003', 'T004', 'T005'];
    const brandingPartners = [
        { name: 'Coca-Cola', contract: 'CC-2025-001', dailyTarget: 15000 },
        { name: 'Samsung', contract: 'SM-2025-002', dailyTarget: 12000 },
        { name: 'Amazon', contract: 'AZ-2025-003', dailyTarget: 18000 },
        { name: 'Flipkart', contract: 'FK-2025-004', dailyTarget: 10000 }
    ];
    
    const exposureData = [];
    
    brandingPartners.forEach(partner => {
        trainsets.forEach(trainset => {
            const actualExposure = Math.floor(partner.dailyTarget * (0.7 + Math.random() * 0.6));
            const percentage = Math.round((actualExposure / partner.dailyTarget) * 100);
            
            let status = 'meeting';
            if (percentage < 80) status = 'below';
            if (percentage >= 110) status = 'exceeding';
            
            exposureData.push({
                trainset,
                partner: partner.name,
                contract: partner.contract,
                targetExposure: partner.dailyTarget,
                actualExposure,
                percentage,
                status,
                revenue: Math.floor(actualExposure * 0.05),
                lastUpdated: new Date().toISOString()
            });
        });
    });
    
    const totalTarget = brandingPartners.reduce((sum, p) => sum + (p.dailyTarget * trainsets.length), 0);
    const totalActual = exposureData.reduce((sum, e) => sum + e.actualExposure, 0);
    
    return {
        summary: {
            totalTarget,
            totalActual,
            overallPercentage: Math.round((totalActual / totalTarget) * 100),
            revenue: exposureData.reduce((sum, e) => sum + e.revenue, 0),
            contractsCount: brandingPartners.length,
            activeTrainsets: trainsets.length
        },
        alerts: exposureData.filter(e => e.status === 'below').length,
        exposureData
    };
}

function generateStablingData() {
    const trainsets = ['T001', 'T002', 'T003', 'T004', 'T005'];
    const tracks = ['Track-1', 'Track-2', 'Track-3', 'Track-4', 'Maintenance-Bay', 'Washing-Bay'];
    
    const positions = [];
    const movements = [];
    
    trainsets.forEach((trainset, index) => {
        const track = tracks[index % tracks.length];
        const position = {
            trainset,
            track,
            x: Math.random() * 100,
            y: Math.random() * 100,
            z: 0,
            rotation: Math.random() * 360,
            status: ['parked', 'moving', 'maintenance'][Math.floor(Math.random() * 3)],
            lastMoved: new Date(Date.now() - Math.random() * 3600000).toISOString()
        };
        positions.push(position);
        
        for (let i = 0; i < 5; i++) {
            movements.push({
                trainset,
                fromTrack: tracks[Math.floor(Math.random() * tracks.length)],
                toTrack: tracks[Math.floor(Math.random() * tracks.length)],
                timestamp: new Date(Date.now() - (i + 1) * 3600000).toISOString(),
                reason: ['Maintenance', 'Cleaning', 'Service', 'Repositioning'][Math.floor(Math.random() * 4)],
                duration: Math.floor(Math.random() * 30) + 5
            });
        }
    });
    
    return {
        yard: {
            name: 'Aluva Depot',
            capacity: tracks.length,
            occupied: positions.filter(p => p.status === 'parked').length,
            utilization: Math.round((positions.filter(p => p.status === 'parked').length / tracks.length) * 100)
        },
        tracks: tracks.map(track => ({
            name: track,
            capacity: 1,
            occupied: positions.some(p => p.track === track && p.status === 'parked'),
            type: track.includes('Maintenance') ? 'maintenance' : track.includes('Washing') ? 'cleaning' : 'storage'
        })),
        positions,
        recentMovements: movements.slice(0, 10),
        kpis: {
            averageShuntingTime: Math.floor(Math.random() * 15) + 10,
            dailyMovements: Math.floor(Math.random() * 50) + 30,
            efficiencyScore: Math.floor(Math.random() * 20) + 80
        }
    };
}

function generateDashboardData() {
    const components = ['Bogie', 'HVAC', 'Brakes'];
    const trainsets = ['T001', 'T002', 'T003', 'T004', 'T005'];
    
    const data = {
        trainsets: [],
        historical_data: [],
        summary: {
            total_trainsets: trainsets.length,
            total_components: trainsets.length * components.length,
            avg_mileage: 0,
            health_distribution: { good: 0, warning: 0, critical: 0 }
        }
    };
    
    let totalMileage = 0;
    
    trainsets.forEach(trainsetId => {
        const trainset = {
            id: trainsetId,
            name: `Trainset ${trainsetId}`,
            total_mileage: 0,
            components: []
        };
        
        components.forEach(componentName => {
            const totalKm = Math.floor(Math.random() * 150000) + 50000;
            const wearPercentage = Math.random() * 80 + 10;
            
            let healthStatus, healthColor;
            if (wearPercentage < 40) {
                healthStatus = 'Good';
                healthColor = 'green';
                data.summary.health_distribution.good++;
            } else if (wearPercentage < 70) {
                healthStatus = 'Warning';
                healthColor = 'yellow';
                data.summary.health_distribution.warning++;
            } else {
                healthStatus = 'Critical';
                healthColor = 'red';
                data.summary.health_distribution.critical++;
            }
            
            const daysUntilMaintenance = Math.floor((100 - wearPercentage) * 2);
            const maintenanceDate = new Date();
            maintenanceDate.setDate(maintenanceDate.getDate() + daysUntilMaintenance);
            
            const lastMaintenanceDate = new Date();
            lastMaintenanceDate.setDate(lastMaintenanceDate.getDate() - Math.floor(Math.random() * 120 + 30));
            
            const component = {
                name: componentName,
                total_km: totalKm,
                wear_percentage: Math.round(wearPercentage * 10) / 10,
                health_status: healthStatus,
                health_color: healthColor,
                maintenance_due: maintenanceDate.toISOString().split('T')[0],
                last_maintenance: lastMaintenanceDate.toISOString().split('T')[0],
                efficiency_score: Math.round((100 - wearPercentage) * 10) / 10
            };
            
            trainset.components.push(component);
            trainset.total_mileage += totalKm;
            totalMileage += totalKm;
        });
        
        data.trainsets.push(trainset);
    });
    
    data.summary.avg_mileage = Math.round(totalMileage / (trainsets.length * components.length));
    data.historical_data = generateHistoricalTrendData(trainsets, components);
    
    return data;
}

function generateComponentsForTrainset(trainsetId) {
    const components = ['Bogie', 'HVAC', 'Brakes'];
    return components.map(name => ({
        name,
        total_km: Math.floor(Math.random() * 150000) + 50000,
        wear_percentage: Math.round((Math.random() * 80 + 10) * 10) / 10,
        health_status: Math.random() < 0.3 ? 'Critical' : Math.random() < 0.6 ? 'Warning' : 'Good'
    }));
}

function generateHistoricalData(trainsetFilter, componentFilter, period) {
    const historicalData = [];
    const components = ['Bogie', 'HVAC', 'Brakes'];
    const trainsets = ['T001', 'T002', 'T003', 'T004', 'T005'];
    
    const months = period === 'weekly' ? 1 : period === 'yearly' ? 12 : 6;
    
    for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = date.toISOString().substr(0, 7);
        
        trainsets.forEach(trainsetId => {
            if (trainsetFilter !== 'all' && trainsetId !== trainsetFilter) return;
            
            components.forEach(componentName => {
                if (componentFilter !== 'all' && componentName !== componentFilter) return;
                
                historicalData.push({
                    date: monthStr,
                    trainset: trainsetId,
                    component: componentName,
                    km_usage: Math.floor(Math.random() * 5000) + 3000,
                    wear_increase: Math.round((Math.random() * 6 + 2) * 10) / 10
                });
            });
        });
    }
    
    return historicalData;
}

function generateHistoricalTrendData(trainsets, components) {
    const historicalData = [];
    
    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = date.toISOString().substr(0, 7);
        
        trainsets.forEach(trainsetId => {
            components.forEach(componentName => {
                historicalData.push({
                    date: monthStr,
                    trainset: trainsetId,
                    component: componentName,
                    km_usage: Math.floor(Math.random() * 5000) + 3000,
                    wear_increase: Math.round((Math.random() * 6 + 2) * 10) / 10
                });
            });
        });
    }
    
    return historicalData;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`🚆 RailOptima Server running on port ${PORT}`);
    console.log(`📊 Dashboard available at: http://localhost:${PORT}`);
    console.log(`🔧 Mileage Dashboard: http://localhost:${PORT}/mileage-dashboard.html`);
    console.log(`🧽 Cleaning API: http://localhost:${PORT}/api/cleaning-slots`);
    console.log(`📈 Mileage API: http://localhost:${PORT}/api/dashboard-data`);
    console.log(`🎯 Fitness Certificates: http://localhost:${PORT}/api/fitness-certificates`);
    console.log(`📋 Job Cards: http://localhost:${PORT}/api/job-cards`);
    console.log(`📺 Branding Exposure: http://localhost:${PORT}/api/branding-exposure`);
    console.log(`🏗️ Stabling Geometry: http://localhost:${PORT}/api/stabling-geometry`);
});

module.exports = app;