import DashboardHeader from "./DashboardHeader";
import DashboardCard from "./DashboardCard";
import { Container, Box } from "@mui/material";

const DashboardBody = ({ dashboardCards }) => {
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
                <DashboardHeader />

                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mb: 4,
                        flexWrap: "nowrap",
                        overflowX: "auto"
                    }}
                >
                    {dashboardCards.map((card, index) => {
                        <DashboardCard card={card} index={index} />
                    })}
                </Box>

                
            </Container>
        </Box>
    )
}

export default DashboardBody