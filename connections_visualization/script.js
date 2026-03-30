// Chart Common Options
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#f8fafc'
            }
        }
    }
};

// Data extracted from Python Analysis
const growthData = {
    "2024-08": 1,
    "2024-09": 5,
    "2024-10": 1,
    "2024-11": 2,
    "2024-12": 15,
    "2025-01": 3,
    "2025-02": 14,
    "2025-03": 3,
    "2025-04": 4,
    "2025-05": 5,
    "2025-06": 6,
    "2025-07": 3,
    "2025-08": 7,
    "2025-09": 3,
    "2025-10": 10,
    "2025-11": 2,
    "2025-12": 10,
    "2026-01": 9,
    "2026-02": 22
};

const companiesData = {
    "Grainger": 6,
    "University of Illinois Urbana-Champaign": 5,
    "Gies College of Business - University of Illinois Urbana-Champaign": 4,
    "ALPFA Inc - Association of Latino Professionals For America": 3,
    "EY": 2,
    "Beta Alpha Psi - Alpha Chapter": 2,
    "Phi Chi Theta- Zeta Gamma Chapter": 2,
    "Illinois Data Science Club": 1,
    "American Marketing Association": 1,
    "University of Illinois Catering Department": 1
};

const rolesData = {
    "Finance & Accounting": 21,
    "Management & Ops": 19,
    "Student & Academic": 24,
    "Engineering & Tech": 7,
    "Marketing & Sales": 6,
    "Other": 44
};

const myRolesData = {
  "Management & Ops": 1,
  "Other": 3,
  "Engineering & Tech": 1
};

const skillsData = {
  "Statistical Data Analysis": 2,
  "Guest Service Management": 1,
  "Marketing": 1,
  "Digital Marketing": 1
};

// 1. Growth Line Chart
const ctxGrowth = document.getElementById('growthChart').getContext('2d');
new Chart(ctxGrowth, {
    type: 'line',
    data: {
        labels: Object.keys(growthData),
        datasets: [{
            label: 'New Connections',
            data: Object.values(growthData),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#3b82f6',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    },
    options: {
        ...commonOptions,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// 2. Top Companies Bar Chart
const ctxCompanies = document.getElementById('companiesChart').getContext('2d');
new Chart(ctxCompanies, {
    type: 'bar',
    data: {
        labels: Object.keys(companiesData),
        datasets: [{
            label: 'Connections',
            data: Object.values(companiesData),
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(99, 102, 241, 0.8)',
                'rgba(14, 165, 233, 0.8)',
                'rgba(20, 184, 166, 0.8)',
                'rgba(132, 204, 22, 0.8)'
            ],
            borderRadius: 6
        }]
    },
    options: {
        ...commonOptions,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            x: {
                grid: { display: false },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    }
});

// 3. Roles Doughnut Chart
const ctxRoles = document.getElementById('rolesChart').getContext('2d');
new Chart(ctxRoles, {
    type: 'doughnut',
    data: {
        labels: Object.keys(rolesData),
        datasets: [{
            label: 'Network Composition',
            data: Object.values(rolesData),
            backgroundColor: [
                '#3b82f6', // Finance
                '#8b5cf6', // Ops
                '#10b981', // Student
                '#f59e0b', // Tech
                '#ec4899', // Marketing
                '#64748b'  // Other
            ],
            borderWidth: 2,
            borderColor: '#0f172a',
            hoverOffset: 4
        }, {
            label: 'My Positions',
            data: [
                myRolesData["Finance & Accounting"] || 0,
                myRolesData["Management & Ops"] || 0,
                myRolesData["Student & Academic"] || 0,
                myRolesData["Engineering & Tech"] || 0,
                myRolesData["Marketing & Sales"] || 0,
                myRolesData["Other"] || 0
            ],
            backgroundColor: [
                'rgba(59, 130, 246, 0.5)',
                'rgba(139, 92, 246, 0.5)',
                'rgba(16, 185, 129, 0.5)',
                'rgba(245, 158, 11, 0.5)',
                'rgba(236, 72, 153, 0.5)',
                'rgba(100, 116, 139, 0.5)'
            ],
            borderWidth: 2,
            borderColor: '#0f172a',
            hoverOffset: 4
        }]
    },
    options: {
        ...commonOptions,
        cutout: '50%',
        plugins: {
            legend: {
                position: 'right'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.raw;
                    }
                }
            }
        }
    }
});

// 4. Skills Overlap Bar Chart
const ctxSkills = document.getElementById('skillsChart');
if (ctxSkills) {
    new Chart(ctxSkills.getContext('2d'), {
        type: 'bar',
        data: {
            labels: Object.keys(skillsData),
            datasets: [{
                label: 'Connections with related roles',
                data: Object.values(skillsData),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 4
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}
