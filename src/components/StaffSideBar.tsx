import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Article from '@mui/icons-material/Article'
import Description from '@mui/icons-material/Description'
import { AppProvider } from '@toolpad/core/AppProvider';
import AddIcon from '@mui/icons-material/Add'
import AppoinmentsIcon from '@mui/icons-material/Event'
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Navigation } from '@toolpad/core';
import MedicalRecordForm from '../pages/staff/AddMedicalRecord';
import logo from "../assets/react.svg"

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Patient Details',
  },
  {
    segment: 'records',
    title: 'Records',
    icon: <Article />,
    children: [
        {
            segment: 'addRecord',
            title: 'Add Record',
            icon: <AddIcon />,  
          },
      {
        segment: 'traffic',
        title: 'View Record',
        icon: <Description/>,
      },
    ],
  },
  {
    segment: 'appoinments',
    title: 'Appoinments',
    icon: <AppoinmentsIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    return (
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {pathname === '/records/addRecord' ? (
          <MedicalRecordForm /> 
        ) : (
          <Typography>Dashboard content for {pathname}</Typography>
        )}
      </Box>
    );
  }
  



export default function DashboardLayoutBasic() {
 

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path)); // Update the pathname to trigger a rerender
      },
    };
  }, [pathname]);

  

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src={logo} alt="MUI logo" />,
        title: 'Med-Care',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
