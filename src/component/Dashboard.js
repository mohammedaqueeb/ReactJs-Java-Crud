import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { Card, CardContent, Grid, Icon } from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Dashboard() {
  const [domains, setDomain] = useState([]);
  const [version, setVersion] = useState([]);

  useEffect(() => {
    DomainCount();
    VersionCount();
  }, []);

  const DomainCount = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_PATH}domain/count`
    );
    setDomain(result.data);
  };

  const VersionCount = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_PATH}CtcVersion/count`
    );
    setVersion(result.data);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2} mb={1.5}>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Card>
              <CardContent>
                <Icon>
                  <DnsIcon sx={{ fontSize: 40 }} className="icons" />
                </Icon>
                <h3 className="card-title">All Domain</h3>
                <h1 className="card-count">{domains}</h1>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Card>
              <CardContent>
                <Icon>
                  <ContentCopyIcon sx={{ fontSize: 40 }} className="icons" />
                </Icon>
                <h3 className="card-title">All Product Version</h3>
                <h1 className="card-count">{version}</h1>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
