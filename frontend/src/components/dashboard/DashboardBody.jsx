import DashboardHeader from "./DashboardHeader";
import DashboardCard from "./DashboardCard";
import { Container, Box } from "@mui/material";
import { removeToken, verifyToken } from "../../utils/auth";
import { 
    People as PeopleIcon,
    Report as ReportIcon,
    Description as DescriptionIcon,
    Home as HomeIcon,
    Assignment as CertificateIcon
} from "@mui/icons-material";
import UserContainer from "./UserContainer";
import { isAdmin } from "../../utils/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardBody = () => {
    const admin = isAdmin();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        removeToken();
        navigate("/", { replace: true })
    }

    useEffect(() => {
     const isExpired = verifyToken(); 
     
     if (isExpired)
        navigate("/", { replace: true });
    }, []);

    const dashboardCards = [
        {
        title: "Residents",
        description: "Manage resident information",
        icon: <PeopleIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
        link: "/residents",
        color: "#e3f2fd",
        },
        {
        title: "Households",
        description: "View and manage household data",
        icon: <HomeIcon sx={{ fontSize: 60, color: "#2e7d32" }} />,
        link: "/households",
        color: "#e8f5e9",
        },
        {
        title: "Incidents",
        description: "Record and track incidents",
        icon: <ReportIcon sx={{ fontSize: 60, color: "#d32f2f" }} />,
        link: "/incidents",
        color: "#ffebee",
        },
        {
        title: "Documents",
        description: "Manage barangay documents",
        icon: <DescriptionIcon sx={{ fontSize: 60, color: "#ed6c02" }} />,
        link: "/documents",
        color: "#fff3e0",
        },
        {
        title: "Certificates",
        description: "Generate and manage certificates",
        icon: <CertificateIcon sx={{ fontSize: 60, color: "#9c27b0" }} />,
        link: "/certificate",
        color: "#f3e5f5",
        },
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh", 
                bgcolor: "#f5f5f5", 
                pb: 4 
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    pt: 4
                }}
            >
                <DashboardHeader handleLogout={handleLogout} />

                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mb: 4,
                        flexWrap: "nowrap",
                        overflowX: "auto"
                    }}
                >
                    {dashboardCards.map((card, index) => (
                        <DashboardCard card={card} key={index} />
                    ))}
                </Box>

                {admin && <UserContainer />}
            </Container>
        </Box>
    )
}

export default DashboardBody