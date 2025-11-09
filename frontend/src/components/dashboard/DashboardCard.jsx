import { Card, CardContent, Button, CardActions, Typography } from "@mui/material";

const DashboardCard = ({ card, index }) => {
    return (
        <Card
              key={index}
              sx={{
                minWidth: 0,
                flex: "1 1 0",
                height: "350px",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    bgcolor: card.color,
                    pt: 4,
                  }}
                >
                  {card.icon}
                  <Typography variant="h5" component="h2" sx={{ mt: 2, fontWeight: "bold" }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    component={Link}
                    to={card.link}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Access
                  </Button>
                </CardActions>
              </Card>
    )
}

export default DashboardCard